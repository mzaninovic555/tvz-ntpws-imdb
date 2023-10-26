import {useEffect, useState} from 'react';
import {getMovieDetails} from './MovieDetailsApi.ts';
import {useParams} from 'react-router-dom';
import {MovieDetailsType} from './MovieDetailsType.ts';
import {Card} from 'primereact/card';
import {TmdbConst} from '../../common/TmdbConst.ts';

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

  return (
    <Card className='container'>
      <div>
        <img src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${movieDetails?.backdropPath}`} alt={`${movieDetails?.title} poster`} />
        <img src={`${TmdbConst.TMDB_IMAGE_PREFIX_URL}${movieDetails?.posterPath}`} alt={`${movieDetails?.title} poster`} />
      </div>
    </Card>
  );
};

export default MovieDetails;
