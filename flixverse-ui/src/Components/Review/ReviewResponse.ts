import ItemType from '../../common/enums/ItemType.ts';

export type ReviewResponse = {
  id: number,
  itemId: number,
  itemType: ItemType,
  text: string,
  grade: number,
  userId: number,
  authorUsername: string
}
