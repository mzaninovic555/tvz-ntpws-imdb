import ItemType from '../../common/enums/ItemType.ts';
import {WatchlistStatus} from './WatchlistStatus.ts';

export type WatchlistItem = {
  id: number,
  itemId: number,
  type: ItemType,
  status: WatchlistStatus,
  poster?: string
}
