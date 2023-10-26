import api from '../../common/api/api.ts';
import {GenericItemCarouselResponse} from './GenericItemCarouselResponse.ts';

export async function getPopularMovies(): Promise<GenericItemCarouselResponse[]> {
  const response = await api.get<GenericItemCarouselResponse[]>('/api/popular-movies');
  return response?.data;
}

export async function getPopularShows(): Promise<GenericItemCarouselResponse[]> {
  const response = await api.get<GenericItemCarouselResponse[]>('/api/popular-shows');
  return response?.data;
}

export async function getPopularActors(): Promise<GenericItemCarouselResponse[]> {
  const response = await api.get<GenericItemCarouselResponse[]>('/api/popular-actors');
  return response?.data;
}
