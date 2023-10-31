import api from '../../common/api/api.ts';
import {UserWatchlistItem} from './UserWatchlist.ts';

export async function getWatchlist(page: number): Promise<UserWatchlistItem[]> {
  const url = new URLSearchParams();
  url.set('page', page.toString());

  const response = await api.get<UserWatchlistItem[]>(`/watchlist?${url.toString()}`);
  return response?.data;
}
