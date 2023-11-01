import ItemType from '../../common/enums/ItemType.ts';

export type ReviewRequest = {
  itemId: number,
  itemType: ItemType,
  text: string,
  grade: number
}
