import api from '../../common/api/api.ts';
import {UserWatchlistItem} from './UserWatchlist.ts';
import {BasicResponse} from '../../common/response/BasicResponse.ts';

export async function getWatchlist(page: number): Promise<UserWatchlistItem[]> {
  const url = new URLSearchParams();
  url.set('page', page.toString());

  const response = await api.get<UserWatchlistItem[]>(`/watchlist?${url.toString()}`);
  return response?.data;
}

export async function getCompleted(page: number): Promise<UserWatchlistItem[]> {
  const url = new URLSearchParams();
  url.set('page', page.toString());

  const response = await api.get<UserWatchlistItem[]>(`/watchlist/completed?${url.toString()}`);
  return response?.data;
}

export async function setEntryAsCompleted(itemId: number): Promise<BasicResponse> {
  const response = await api.post<BasicResponse>(`/watchlist/set-complete`, {itemId});
  return response?.data;
}

export async function removeEntryFromWatchlist(itemId: number): Promise<BasicResponse> {
  const response = await api.post<BasicResponse>(`/watchlist/remove`, {itemId});
  return response?.data;
}

export async function setEntryInWatching(itemId: number): Promise<BasicResponse> {
  const response = await api.post<BasicResponse>(`/watchlist/set-watching`, {itemId});
  return response?.data;
}
