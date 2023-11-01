import api from '../../common/api/api.ts';
import {GenericItemResponse} from '../../common/response/GenericItemResponse.ts';
import {SearchFilter} from './BaseSearch.tsx';
import {Genre} from '../Common/Genre.ts';
import ItemType from '../../common/enums/ItemType.ts';

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

export async function getFiltered(type: ItemType, page = 0, filterValues: SearchFilter): Promise<GenericItemResponse[]> {
  const url = setQueryParams(page, filterValues);
  const genreParams = getGenresParams(filterValues.genres);

  const prefix = type == ItemType.Movie ? 'movies/' : 'shows/';
  const response = await api.get<GenericItemResponse[]>(`/${prefix}?${url.toString()}${genreParams}`);
  return response?.data;
}

export async function getBySearchTerm(type: ItemType, page = 0, searchTerm: string): Promise<GenericItemResponse[]> {
  const url = new URLSearchParams();
  url.set('searchTerm', searchTerm);
  url.set('page', page.toString());

  const prefix = type == ItemType.Movie ? 'movies/' : 'tv-shows/';
  const response = await api.get<GenericItemResponse[]>(`/${prefix}search-by-title?${url.toString()}`);
  return response?.data;
}
