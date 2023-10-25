import api from '../../common/api/api.ts';
import {MoviePopular} from './MoviePopular.ts';

export async function getPopularMovies(): Promise<MoviePopular[]> {
  const response = await api.get<MoviePopular[]>('/api/popular-movies');
  return response?.data;
}
