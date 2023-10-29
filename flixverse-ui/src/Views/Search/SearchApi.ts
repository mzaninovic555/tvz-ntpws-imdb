import api from '../../common/api/api.ts';
import {GenericItemResponse} from '../../common/response/GenericItemResponse.ts';
import {SearchFilter} from './BaseSearch.tsx';
import {Genre} from '../Common/Genre.ts';

function setQueryParams(page: number, filterValues: SearchFilter): URLSearchParams {
  const url = new URLSearchParams();
  url.set('page', page.toString());
  url.set('fromDate', filterValues.releaseDateFrom?.toISOString() ?? '');
  url.set('toDate', filterValues.releaseDateTo?.toISOString() ?? '');
  return url;
}

function getGenresParams(genres: Genre[]) {
  if (!genres || genres.length === 0) {
    return '';
  }
  return genres.map((g) => `&genre=${g.id}`).join('');
}

export async function getMoviesSearch(page = 0, filterValues: SearchFilter): Promise<GenericItemResponse[]> {
  const url = setQueryParams(page, filterValues);
  const genreParams = getGenresParams(filterValues.genres);

  const response = await api.get<GenericItemResponse[]>(`/movies?${url.toString()}${genreParams}`);
  return response?.data;
}

export async function getShowsSearch(page = 0, filterValues: SearchFilter): Promise<GenericItemResponse[]> {
  const url = setQueryParams(page, filterValues);
  const genreParams = getGenresParams(filterValues.genres);

  const response = await api.get<GenericItemResponse[]>(`/shows?${url.toString()}${genreParams}`);
  return response?.data;
}
