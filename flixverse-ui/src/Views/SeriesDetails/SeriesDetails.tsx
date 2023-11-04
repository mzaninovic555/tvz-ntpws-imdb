import {FormEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ProgressSpinner} from 'primereact/progressspinner';
import {TmdbConst} from '../../common/TmdbConst.ts';
import CastCarousel from '../../Components/CastCarousel.tsx';
import '../../common/css/itemDetails.css';
import {SeriesDetailsType} from './SeriesDetailsType.ts';
import {addShowToWatchlist, getSeriesDetails} from './SeriesDetailsApi.ts';
import {Button} from 'primereact/button';
import useAuth from '../../common/context/AuthContext.ts';
import useToast from '../../common/context/ToastContext.ts';
import {BasicResponse} from '../../common/response/BasicResponse.ts';
import {createNewToast} from '../../common/messages/toastUtils.ts';
import {AxiosError} from 'axios';
import {ReviewRequest} from '../../Components/Review/ReviewRequest.ts';
import ItemType from '../../common/enums/ItemType.ts';
import {addNewReview} from '../../Components/Review/ReviewApi.ts';
import {Dialog} from 'primereact/dialog';
import {Rating, RatingChangeEvent} from 'primereact/rating';
import {InputTextarea} from 'primereact/inputtextarea';
import Review from '../../Components/Review/Review.tsx';

const SeriesDetails = () => {
  const [seriesDetails, setSeriesDetails] = useState<SeriesDetailsType>();
  const [isWatchlistAdded, setIsWatchlistAdded] = useState(true);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [newReviewGrade, setNewReviewGrade] = useState<number>();
  const [newReviewText, setNewReviewText] = useState<string>();

  const [reviewRef, setReviewRef] = useState(0);

  const auth = useAuth();
  const toast = useToast();

  const params = useParams();

  useEffect(() => void fetchSeriesDetails(), [reviewRef]);

  const fetchSeriesDetails = async () => {
    const seriesId = params.seriesId;
    if (!seriesId) {
      console.error('Missing show id');
      throw new Error('Missing show id');
    }

    const res = await getSeriesDetails(seriesId).catch(); // TODO: kad me bude
    if (!res) {
      return;
    }

    setSeriesDetails(res);
  };

  const addToWatchlist = async () => {
    const res = await addShowToWatchlist(seriesDetails!.id).catch(handleError);

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
      itemId: seriesDetails!.id,
      itemType: ItemType.Show,
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
    {!seriesDetails && <ProgressSpinner />}
    {seriesDetails &&
      <main>
        <Dialog header="Create new review" visible={reviewModalVisible} className='w-4'
          onHide={() => setReviewModalVisible(false)}>
          <form onSubmit={(e) => createNewReview(e)}>
            <Rating value={newReviewGrade} required className='mb-2'
              onChange={(e : RatingChangeEvent) => setNewReviewGrade(e.value as number)} cancel={false} />
            <InputTextarea className='mb-2 w-12' rows={5} cols={40} value={newReviewText} required
              onChange={(e) => setNewReviewText(e.target.value)} />
            <Button type={'submit'} label='Create review' />
          </form>
        </Dialog>
        <section className='cover-container flex justify-content-center align-items-center'
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                       url(${TmdbConst.TMDB_IMAGE_PREFIX_URL}${seriesDetails?.backdropPath})`,
          backgroundSize: 'cover'}}>
          <div className='container grid justify-content-center align-items-center'>
            <div className='md:col-2 sm:col-12 poster-container mr-3'>
              <img src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${seriesDetails?.posterPath}`} alt={`${seriesDetails?.title}`} className='shadow-8'/>
            </div>
            <div className='sm:mt-5 md:col-8 sm:col-12 flex flex-column'>
              <div className='flex flex-column'>
                <div className='flex align-items-center mb-3'>
                  <h1 className='mr-2 my-1'>
                    {seriesDetails?.title} {seriesDetails?.startReleaseDate ? `(${new Date(seriesDetails.startReleaseDate).getFullYear()}` : ''}
                    {seriesDetails?.endReleaseDate && seriesDetails.status == 'Ended' ?
                      ` - ${new Date(seriesDetails.endReleaseDate).getFullYear()})` :
                      ' - )'}
                  </h1>
                  {auth.authInfo.authenticated && !seriesDetails.isAddedToWatchlist && isWatchlistAdded &&
                      <>
                        <Button icon="pi pi-bookmark" size='small' rounded severity="secondary" aria-label="Bookmark"
                          className='mr-2' onClick={addToWatchlist}/>
                      </>}
                  {auth.authInfo.authenticated && !seriesDetails.isUserReviewed &&
                      <Button icon="pi pi-pencil" size='small' rounded severity="help" aria-label="Bookmark"
                        onClick={() => setReviewModalVisible(true)}/>
                  }
                </div>
                <div className='flex align-items-center'>
                  {seriesDetails?.certification &&
                    <>
                      <h5 className='border-1 age-rating'>{seriesDetails.certification}</h5>
                      <i className='divider-icon pi pi-circle-on'/>
                    </>
                  }
                  {seriesDetails?.startReleaseDate && <h5>{new Date(seriesDetails?.startReleaseDate).toLocaleDateString()}</h5>}
                  <i className='divider-icon pi pi-circle-on'/>
                  {seriesDetails.genres.map((genre, i) =>
                    <h5 key={genre.name + i}>{genre.name}{ i < seriesDetails.genres.length - 1 ? ', ' : ''}</h5>)}
                  <i className='divider-icon pi pi-circle-on'/>
                  {seriesDetails?.numberOfSeasons && <h5>{seriesDetails.numberOfSeasons} seasons</h5>}
                  {seriesDetails.streamProviders && seriesDetails.streamProviders.length &&
                      <>
                        <i className='divider-icon pi pi-circle-on'/>
                        <h5>Streaming on: </h5>
                        <h5>{
                          seriesDetails.streamProviders.map((provider, i) =>
                            i == seriesDetails.streamProviders.length - 1 ? provider.providerName : provider.providerName + ', '
                          )}</h5>
                      </>
                  }
                </div>
              </div>
              {seriesDetails.overview &&
                <div className='text-left mt-4'>
                  <h4 className='tagline'>{seriesDetails.tagline}</h4>
                  <h3 className='my-0'>Overview</h3>
                  <p className='text-justify mt-2 item-overview'>{seriesDetails?.overview}</p>
                </div>
              }
              {seriesDetails.crew &&
                <div className='flex mt-3'>
                  {seriesDetails.crew.map((crew) =>
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
        <CastCarousel cast={seriesDetails.cast} />
        <Review key={reviewRef} itemId={seriesDetails.id} itemType={ItemType.Show} />
      </main>
    }
  </>
  );
};

export default SeriesDetails;
