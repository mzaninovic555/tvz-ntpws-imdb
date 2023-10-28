import api from '../../common/api/api.ts';
import {GenericItemResponse} from '../../common/response/GenericItemResponse.ts';

export async function getPopularMovies(): Promise<GenericItemResponse[]> {
  const response = await api.get<GenericItemResponse[]>('/api/popular-movies');
  return response?.data;
}

export async function getPopularShows(): Promise<GenericItemResponse[]> {
  const response = await api.get<GenericItemResponse[]>('/api/popular-shows');
  return response?.data;
}

export async function getPopularActors(): Promise<GenericItemResponse[]> {
  const response = await api.get<GenericItemResponse[]>('/api/popular-actors');
  return response?.data;
}
