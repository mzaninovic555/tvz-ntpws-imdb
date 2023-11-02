import {FormEvent, useEffect, useState} from 'react';
import {addMovieToWatchlist, getMovieDetails} from './MovieDetailsApi.ts';
import {useParams} from 'react-router-dom';
import {MovieDetailsType} from './MovieDetailsType.ts';
import {TmdbConst} from '../../common/TmdbConst.ts';
import '../../common/css/itemDetails.css';
import {ProgressSpinner} from 'primereact/progressspinner';
import CastCarousel from '../../Components/CastCarousel.tsx';
import {Button} from 'primereact/button';
import useAuth from '../../common/context/AuthContext.ts';
import useToast from '../../common/context/ToastContext.ts';
import {AxiosError} from 'axios';
import {BasicResponse} from '../../common/response/BasicResponse.ts';
import {createNewToast} from '../../common/messages/toastUtils.ts';
import Review from '../../Components/Review/Review.tsx';
import ItemType from '../../common/enums/ItemType.ts';
import {Dialog} from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {Rating, RatingChangeEvent} from 'primereact/rating';
import {ReviewRequest} from '../../Components/Review/ReviewRequest.ts';
import {addNewReview} from '../../Components/Review/ReviewApi.ts';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType>();
  const [isWatchlistAdded, setIsWatchlistAdded] = useState(true);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [newReviewGrade, setNewReviewGrade] = useState<number>();
  const [newReviewText, setNewReviewText] = useState<string>();

  const [reviewRef, setReviewRef] = useState(0);

  const auth = useAuth();
  const toast = useToast();

  const params = useParams();

  useEffect(() => void fetchMovieDetails(), [reviewRef]);

  const fetchMovieDetails = async () => {
    const movieId = params.movieId;
    if (!movieId) {
      console.error('Missing movie id');
      throw new Error('Missing movie id');
    }

    const res = await getMovieDetails(movieId).catch(); // TODO: kad me bude
    if (!res) {
      return;
    }

    setMovieDetails(res);
  };

  const addToWatchlist = async () => {
    const res = await addMovieToWatchlist(movieDetails!.id).catch(handleError);

    if (!res) {
      return;
    }
    setIsWatchlistAdded(false);
    toast.toast?.current?.show(createNewToast(res.message ?? '', 'success', true));
  };

  const createNewReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviewModalVisible(false);

    if (!newReviewText || !newReviewGrade) {
      return;
    }
    const request: ReviewRequest = {
      itemId: movieDetails!.id,
      itemType: ItemType.Movie,
      text: newReviewText,
      grade: newReviewGrade
    };

    const res = await addNewReview(request).catch(handleError);
    if (!res) {
      return;
    }
    toast.toast?.current?.show(createNewToast(res.message || 'Added review', 'success', true));
    setReviewRef((prevState) => prevState + 1);
  };

  const handleError = (error: AxiosError<BasicResponse>) => {
    const msgs = error.response?.data.message || '';
    toast.toast?.current?.show(createNewToast(msgs, 'error', true));
  };

  return (<>
    {!movieDetails && <ProgressSpinner />}
    {movieDetails &&
      <main>
        <Dialog header="Create new review" visible={reviewModalVisible} style={{width: '30vw'}}
          onHide={() => setReviewModalVisible(false)}>
          <form onSubmit={(e) => createNewReview(e)}>
            <Rating value={newReviewGrade} required className='mb-2'
              onChange={(e : RatingChangeEvent) => setNewReviewGrade(e.value)} cancel={false} />
            <InputTextarea className='mb-2' rows={5} cols={40} value={newReviewText} required
              onChange={(e) => setNewReviewText(e.target.value)} />
            <Button type={'submit'} label='Create review' />
          </form>
        </Dialog>
        <section className='cover-container flex justify-content-center align-items-center'
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                             url(${TmdbConst.TMDB_IMAGE_PREFIX_URL}${movieDetails?.backdropPath})`,
          backgroundSize: 'cover'}}>
          <div className='container grid justify-content-center align-items-center'>
            <div className='md:col-2 sm:col-12 poster-container mr-3'>
              <img src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${movieDetails?.posterPath}`} alt={`${movieDetails?.title}`} className='shadow-8'/>
            </div>
            <div className='md:col-8 sm:col-12 flex flex-column'>
              <div className='flex flex-column'>
                <div className='flex align-items-center'>
                  <h1 className='mr-2 my-1'>
                    {movieDetails?.title} {movieDetails?.releaseDate ? `(${new Date(movieDetails.releaseDate).getFullYear()})` : ''}
                  </h1>
                  {auth.authInfo.authenticated && !movieDetails.isAddedToWatchlist && isWatchlistAdded &&
                    <>
                      <Button icon="pi pi-bookmark" size='small' rounded severity="secondary" aria-label="Bookmark"
                        className='mr-2' onClick={addToWatchlist}/>
                    </>}
                  {auth.authInfo.authenticated && !movieDetails.isUserReviewed &&
                    <Button icon="pi pi-pencil" size='small' rounded severity="help" aria-label="Bookmark"
                      onClick={() => setReviewModalVisible(true)}/>
                  }
                </div>
                <div className='flex align-items-center'>
                  {movieDetails?.certification &&
                    <>
                      <h5 className='border-1 age-rating'>{movieDetails.certification}</h5>
                      <i className='divider-icon pi pi-circle-on'/>
                    </>
                  }
                  {movieDetails?.releaseDate && <h5>{new Date(movieDetails?.releaseDate).toLocaleDateString()}</h5>}
                  <i className='divider-icon pi pi-circle-on'/>
                  {movieDetails.genres.map((genre, i) =>
                    <h5 key={genre.name + i}>{genre.name}{ i < movieDetails.genres.length - 1 ? ', ' : ''}</h5>)}
                  {movieDetails.runtime != -1 &&
                    <>
                      <i className='divider-icon pi pi-circle-on'/>
                      <h5>{`${movieDetails.runtime}min`}</h5>
                    </>
                  }
                  {movieDetails.streamProviders && movieDetails.streamProviders.length &&
                    <>
                      <i className='divider-icon pi pi-circle-on'/>
                      <h5>Streaming on: </h5>
                      <h5>{
                        movieDetails.streamProviders.map((provider, i) =>
                          i == movieDetails.streamProviders.length - 1 ? provider.providerName : provider.providerName + ', '
                        )}</h5>
                    </>
                  }
                </div>
              </div>
              {movieDetails.overview &&
                <div className='text-left mt-4'>
                  <h4 className='tagline'>{movieDetails.tagline}</h4>
                  <h3 className='my-0'>Overview</h3>
                  <p className='text-justify mt-2'>{movieDetails?.overview}</p>
                </div>
              }
              {movieDetails.crew &&
                <div className='flex mt-3'>
                  {movieDetails.crew.map((crew) =>
                    <div key={crew.name + crew.id + crew.job} className='flex flex-column mr-4'>
                      <h4 className='my-0'>{crew.name}</h4>
                      <h5 className='font-italic font-light'>{crew.job}</h5>
                    </div>)
                  }
                </div>
              }
            </div>
          </div>
        </section>
        <CastCarousel cast={movieDetails.cast} />
        <Review key={reviewRef} itemId={movieDetails.id} itemType={ItemType.Movie} />
      </main>
    }
  </>
  );
};

export default MovieDetails;
