import ItemType from '../../common/enums/ItemType.ts';

export type WatchlistItem = {
  id: number,
  type: ItemType,
  poster?: string
}
