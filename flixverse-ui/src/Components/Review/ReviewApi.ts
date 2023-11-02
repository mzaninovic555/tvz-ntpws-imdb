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
