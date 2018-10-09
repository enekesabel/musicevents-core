import {ArtistOptions, ArtistSearchOptions} from '../../model';

export interface IRemoteArtistApi {
  getArtist(name: string): Promise<ArtistOptions>;

  searchArtist(name: string): Promise<ArtistSearchOptions[]>;
}
