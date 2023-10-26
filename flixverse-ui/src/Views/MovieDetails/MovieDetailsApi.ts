import api from '../../common/api/api.ts';
import {MovieDetailsType} from './MovieDetailsType.ts';

export async function getMovieDetails(movieId: string): Promise<MovieDetailsType> {
  const response = await api.get<MovieDetailsType>(`/movie/${movieId}`);
  return response?.data;
}
