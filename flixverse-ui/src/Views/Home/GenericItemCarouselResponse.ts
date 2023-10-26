import ItemType from '../../common/enums/ItemType.ts';

export type GenericItemCarouselResponse = {
  id: number,
  name: string,
  poster: string,
  itemType: ItemType
};
