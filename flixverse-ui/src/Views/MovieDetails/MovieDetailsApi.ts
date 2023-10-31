import api from '../../common/api/api.ts';
import {MovieDetailsType} from './MovieDetailsType.ts';
import {BasicResponse} from '../../common/response/BasicResponse.ts';

export async function getMovieDetails(movieId: string): Promise<MovieDetailsType> {
  const response = await api.get<MovieDetailsType>(`/movie/${movieId}`);
  return response?.data;
}

export async function addMovieToWatchlist(movieId: number): Promise<BasicResponse> {
  const response = await api.post<BasicResponse>(`/movie/add-to-watchlist`, {itemId: movieId});
  return response?.data;
}
