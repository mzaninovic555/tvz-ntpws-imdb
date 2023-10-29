import {BaseDetailsType} from '../../common/BaseDetailsType.ts';

export type SeriesDetailsType = BaseDetailsType & {
  startReleaseDate?: Date,
  endReleaseDate?: Date,
  numberOfSeasons?: number
};
