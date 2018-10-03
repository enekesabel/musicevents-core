import {ArtistOptions} from '../../model';

export interface IRemoteArtistApi {
  getArtist(id: string): Promise<ArtistOptions>;

  searchArtist(name: string): Promise<ArtistOptions[]>;
}
