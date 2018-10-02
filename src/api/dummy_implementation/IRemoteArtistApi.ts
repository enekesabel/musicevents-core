import {ArtistOptions} from '../../model/Artist';

export interface IRemoteArtistApi {
  getArtist(id: string): Promise<ArtistOptions>;

  searchArtist(name: string): Promise<ArtistOptions[]>;
}
