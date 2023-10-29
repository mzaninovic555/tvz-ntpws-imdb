import api from './api.ts';
import {Genre} from '../../Views/Common/Genre.ts';

export async function getMovieGenres(): Promise<Genre[]> {
  const response = await api.get<Genre[]>('/api/genres/movie');
  return response?.data;
}

export async function getShowGenres(): Promise<Genre[]> {
  const response = await api.get<Genre[]>('/api/genres/show');
  return response?.data;
}
