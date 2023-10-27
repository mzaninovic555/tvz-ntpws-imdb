import {Genre} from './Genre.ts';
import {WatchProviderItem} from './WatchProviderItem.ts';

export type MovieDetailsType = {
  id: number,
  title: string,
  isAdult: boolean,
  genres: [Genre],
  overview: string,
  releaseDate?: Date,
  runtime: number,
  status: string,
  streamProviders?: [WatchProviderItem],
  backdropPath: string,
  posterPath: string,
  certification?: string,
  tagline: string,
  crew: CrewType[]
};

export type CrewType = {
  id: number,
  name: string,
  job: string
}
