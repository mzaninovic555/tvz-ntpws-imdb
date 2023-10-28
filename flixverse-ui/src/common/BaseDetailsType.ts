import {Genre} from '../Views/Common/Genre.ts';
import {CrewType} from '../Views/Common/CrewType.ts';

export type BaseDetailsType = {
  id: number,
  title: string,
  genres: [Genre],
  overview: string,
  status: string,
  backdropPath: string,
  posterPath: string,
  certification?: string,
  tagline: string,
  crew?: CrewType[],
  cast?: CrewType[]
};
