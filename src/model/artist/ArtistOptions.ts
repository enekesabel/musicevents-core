import {ArtistSearchOptions} from './ArtistSearchOptions';

export type ArtistOptions = {
  id: string;
} & Partial<ArtistSearchOptions & {
  imageUrl: string;
  facebookPageUrl: string;
  favourite: boolean;
}>;
