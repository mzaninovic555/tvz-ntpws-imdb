import api from '../../common/api/api.ts';
import {GenericItemResponse} from '../../common/response/GenericItemResponse.ts';

export async function getMoviesSearch(page = 0): Promise<GenericItemResponse[]> {
  const params = new URLSearchParams([
    ['page', page.toString()]
  ]);

  const response = await api.get<GenericItemResponse[]>(`/movies`, {params});
  return response?.data;
}

export async function getShowsSearch(page = 0): Promise<GenericItemResponse[]> {
  const params = new URLSearchParams([
    ['page', page.toString()]
  ]);
  const response = await api.get<GenericItemResponse[]>(`/shows`, {params});
  return response?.data;
}
