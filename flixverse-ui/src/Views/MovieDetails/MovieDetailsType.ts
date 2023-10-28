import {WatchProviderItem} from '../Common/WatchProviderItem.ts';
import {BaseDetailsType} from '../../common/BaseDetailsType.ts';

export type MovieDetailsType = BaseDetailsType & {
  releaseDate?: Date,
  runtime: number,
  streamProviders?: [WatchProviderItem],
};
