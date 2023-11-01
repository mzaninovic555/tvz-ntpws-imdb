import {useEffect, useState} from 'react';
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

const SeriesDetails = () => {
  const [seriesDetails, setSeriesDetails] = useState<SeriesDetailsType>();
  const [isWatchlistAdded, setIsWatchlistAdded] = useState(true);
  const auth = useAuth();
  const toast = useToast();

  const params = useParams();

  useEffect(() => void fetchSeriesDetails(), []);

  const fetchSeriesDetails = async () => {
    const seriesId = params.seriesId;
    if (!seriesId) {
      console.error('Missing series id');
      throw new Error('Missing series id');
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

  const handleError = (error: AxiosError<BasicResponse>) => {
    const msgs = error.response?.data.message || '';
    toast.toast?.current?.show(createNewToast(msgs, 'error', true));
  };

  return (<>
    {!seriesDetails && <ProgressSpinner />}
    {seriesDetails &&
      <main>
        <section className='cover-container flex justify-content-center align-items-center'
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                       url(${TmdbConst.TMDB_IMAGE_PREFIX_URL}${seriesDetails?.backdropPath})`,
          backgroundSize: 'cover'}}>
          <div className='container grid justify-content-center align-items-center'>
            <div className='md:col-2 sm:col-12 poster-container mr-3'>
              <img src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${seriesDetails?.posterPath}`} alt={`${seriesDetails?.title}`}/>
            </div>
            <div className='sm:mt-5 md:col-8 sm:col-12 flex flex-column'>
              <div className='flex flex-column'>
                <div className='flex align-items-center'>
                  <h1 className='mr-2 my-1'>
                    {seriesDetails?.title} {seriesDetails?.startReleaseDate ? `(${new Date(seriesDetails.startReleaseDate).getFullYear()}` : ''}
                    {seriesDetails?.endReleaseDate && seriesDetails.status == 'Ended' ?
                      ` - ${new Date(seriesDetails.endReleaseDate).getFullYear()})` :
                      ' - )'}
                  </h1>
                  {auth.authInfo.authenticated && !seriesDetails.isAddedToWatchlist && isWatchlistAdded &&
                      <Button icon="pi pi-bookmark" size='small' rounded severity="secondary" aria-label="Bookmark"
                        onClick={addToWatchlist}/>}
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
                    <h5>{genre.name}{ i < seriesDetails.genres.length - 1 ? ', ' : ''}</h5>)}
                  <i className='divider-icon pi pi-circle-on'/>
                  {seriesDetails?.numberOfSeasons && <h5>{seriesDetails.numberOfSeasons} seasons</h5>}
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
                    <div className='flex flex-column mr-4'>
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
      </main>
    }
  </>
  );
};

export default SeriesDetails;
