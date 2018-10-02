import {ArtistOptions} from '../model/Artist';

export interface IArtistApi {
  getArtist(id: string): Promise<ArtistOptions>;

  searchArtist(name: string): Promise<ArtistOptions[]>;
}
