import api from '../../common/api/api.ts';
import ItemType from '../../common/enums/ItemType.ts';
import {ReviewResponse} from './ReviewResponse.ts';
import {ReviewRequest} from './ReviewRequest.ts';
import {BasicResponse} from '../../common/response/BasicResponse.ts';

export async function getReviewsForItem(page: number, itemId: number, itemType: ItemType): Promise<ReviewResponse[]> {
  const url = new URLSearchParams();
  url.set('page', page.toString());
  url.set('itemId', itemId.toString());
  url.set('type', itemType.toString());

  const response = await api.get<ReviewResponse[]>(`/reviews?${url.toString()}`);
  return response?.data;
}

export async function addNewReview(request: ReviewRequest): Promise<BasicResponse> {
  const response = await api.post<BasicResponse>(`/reviews`, {...request});
  return response?.data;
}

export async function getReviewAverageForItem(itemId: number, itemType: ItemType): Promise<number> {
  const url = new URLSearchParams();
  url.set('itemId', itemId.toString());
  url.set('type', itemType.toString());

  const response = await api.get<number>(`/reviews/score?${url.toString()}`);
  return response?.data;
}

export async function updateReview(request: ReviewRequest): Promise<BasicResponse> {
  const response = await api.put<BasicResponse>(`/reviews`, {...request});
  return response?.data;
}

export async function deleteReview(request: ReviewRequest): Promise<BasicResponse> {
  const response = await api.delete<BasicResponse>(`/reviews`, {data: {...request}});
  return response?.data;
}
