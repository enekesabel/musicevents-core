import {ISerializable} from '../ISerializable';
import {ArtistOptions} from './ArtistOptions';

export interface IArtist extends ISerializable<ArtistOptions> {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly imageUrl: string;
  readonly facebookPageUrl: string;
  readonly favourite: boolean;
}
