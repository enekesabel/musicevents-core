import {ArtistSearchOptions} from './ArtistSearchOptions';

export type ArtistOptions = {
  id: string;
} & Partial<ArtistSearchOptions & {
  url: string;
  imageUrl: string;
  facebookPageUrl: string;
  favourite: boolean;
}>;
