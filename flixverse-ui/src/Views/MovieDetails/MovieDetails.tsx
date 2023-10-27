import {useEffect, useState} from 'react';
import {getMovieDetails} from './MovieDetailsApi.ts';
import {useParams} from 'react-router-dom';
import {CrewType, MovieDetailsType} from './MovieDetailsType.ts';
import {TmdbConst} from '../../common/TmdbConst.ts';
import './movieDetails.css';
import {Tag} from 'primereact/tag';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Card} from 'primereact/card';
import {Carousel} from 'primereact/carousel';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType>();

  const params = useParams();

  useEffect(() => void fetchMovieDetails(), []);

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

  const castTemplate = (cast: CrewType) => (
    <Card className=''>
      {cast?.profilePath && <img height={400} className='' src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${cast.profilePath}`} alt={cast.name}/>}
      <h6>{cast.name}</h6>
    </Card>
  );

  // {movieDetails?.genres.map((x) => <h2>{x.name}</h2>)}
  return (<>
    {!movieDetails && <ProgressSpinner />}
    {movieDetails &&
      <main>
        <section className='cover-container flex justify-content-center align-items-center'
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                             url(${TmdbConst.TMDB_IMAGE_PREFIX_URL}${movieDetails?.backdropPath})`,
          backgroundSize: 'cover'}}>
          <div className='container grid justify-content-center align-items-center'>
            <div className='md:col-2 sm:col-12 poster-container mr-3'>
              <img src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${movieDetails?.posterPath}`} alt={`${movieDetails?.title}`}/>
            </div>
            <div className='md:col-8 sm:col-12 flex flex-column'>
              <div className='flex flex-column'>
                <div className='flex align-items-center'>
                  <h1 className='mr-2 my-1'>
                    {movieDetails?.title} {movieDetails?.releaseDate ? `(${new Date(movieDetails.releaseDate).getFullYear()})` : ''}
                  </h1>
                  {movieDetails?.isAdult ? <Tag severity='danger'>18+</Tag> : ''}
                </div>
                <div className='flex align-items-center'>
                  {movieDetails?.certification &&
                    <>
                      <h5 className='border-1 age-rating'>{movieDetails.certification}</h5>
                      <i className='divider-icon pi pi-circle-on'/>
                    </>}
                  {movieDetails?.releaseDate && <h5>{new Date(movieDetails?.releaseDate).toLocaleDateString()}</h5>}
                  <i className='divider-icon pi pi-circle-on'/>
                  {movieDetails.genres.map((genre, i) =>
                    <h5 key={genre.id}>{genre.name}{ i < movieDetails.genres.length - 1 ? ', ' : ''}</h5>)}
                  {movieDetails.runtime != -1 &&
                    <>
                      <i className='divider-icon pi pi-circle-on'/>
                      <h5>{`${movieDetails.runtime}min`}</h5>
                    </>}
                </div>
              </div>
              {movieDetails.overview &&
                <div className='text-left mt-4'>
                  <h4 className='tagline'>{movieDetails.tagline}</h4>
                  <h3 className='my-0'>Overview</h3>
                  <p className='text-justify mt-2'>{movieDetails?.overview}</p>
                </div>}
              {movieDetails.crew &&
                <div className='flex mt-3'>
                  {movieDetails.crew.map((crew) =>
                    <div className='flex flex-column mr-4' key={crew.id}>
                      <h4 className='my-0'>{crew.name}</h4>
                      <h5 className='font-italic font-light'>{crew.job}</h5>
                    </div>)}
                </div>}
            </div>
          </div>
        </section>
        <section className='container border-bottom-1'>
          <Carousel value={movieDetails.cast} itemTemplate={castTemplate} numVisible={4} numScroll={1}/>
        </section>
      </main>}
  </>
  );
};

export default MovieDetails;
