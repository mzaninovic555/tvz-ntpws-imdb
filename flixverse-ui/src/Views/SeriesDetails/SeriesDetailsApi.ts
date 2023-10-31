import api from '../../common/api/api.ts';
import {SeriesDetailsType} from './SeriesDetailsType.ts';
import {BasicResponse} from '../../common/response/BasicResponse.ts';

export async function getSeriesDetails(seriesId: string): Promise<SeriesDetailsType> {
  const response = await api.get<SeriesDetailsType>(`/series/${seriesId}`);
  return response?.data;
}

export async function addShowToWatchlist(seriesId: number): Promise<BasicResponse> {
  const response = await api.post<BasicResponse>(`/show/add-to-watchlist`, {itemId: seriesId});
  return response?.data;
}
