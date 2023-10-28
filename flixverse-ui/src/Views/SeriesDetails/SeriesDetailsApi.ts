import api from '../../common/api/api.ts';
import {SeriesDetailsType} from './SeriesDetailsType.ts';

export async function getSeriesDetails(seriesId: string): Promise<SeriesDetailsType> {
  const response = await api.get<SeriesDetailsType>(`/series/${seriesId}`);
  return response?.data;
}
