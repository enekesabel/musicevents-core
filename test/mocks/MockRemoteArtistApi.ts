import {ArtistOptions} from '../../src/model';
import {IRemoteArtistApi} from '../../src/api/dummy_implementation/IRemoteArtistApi';
import {ArtistSearchOptions} from '../../src/model/artist';
import {MOCK_ARTIST_OPTIONS} from './MockOptions';

// tslint:disable-next-line
export const MOCK_REMOTE_ARTIST_API: IRemoteArtistApi = {
  async getArtist(name: string): Promise<ArtistOptions> {
    return MOCK_ARTIST_OPTIONS.find(a => a.name === name);
  },
  async searchArtist(name: string): Promise<ArtistSearchOptions[]> {
    return MOCK_ARTIST_OPTIONS.filter((a) => {
      return a.name.indexOf(name) !== -1;
    }).map(a => ({name: a.name}));
  },
};
