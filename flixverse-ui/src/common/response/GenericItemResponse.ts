import ItemType from '../enums/ItemType.ts';

export type GenericItemResponse = {
  id: number,
  name: string,
  poster: string,
  itemType: ItemType
};
