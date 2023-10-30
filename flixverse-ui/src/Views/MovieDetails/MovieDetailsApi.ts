import api from '../../common/api/api.ts';
import {MovieDetailsType} from './MovieDetailsType.ts';

export async function getMovieDetails(movieId: string): Promise<MovieDetailsType> {
  const response = await api.get<MovieDetailsType>(`/movie/${movieId}`);
  return response?.data;
}

export async function addMovieToWatchlist(movieId: number): Promise<string> {
  const response = await api.post<string>(`/movie/add-to-watchlist`, {movieId});
  return response?.data;
}
