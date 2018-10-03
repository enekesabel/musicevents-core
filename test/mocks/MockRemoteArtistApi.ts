import {ArtistOptions} from '../../src/model';
import {IRemoteArtistApi} from '../../src/api/dummy_implementation/IRemoteArtistApi';

// tslint:disable-next-line
export const MOCK_REMOTE_ARTIST_API: IRemoteArtistApi = {
  async getArtist(id: string): Promise<ArtistOptions> {
    return MOCK_ARTIST_OPTIONS.find(a => a.id === id);
  },
  async searchArtist(name: string): Promise<ArtistOptions[]> {
    return MOCK_ARTIST_OPTIONS.filter((a) => {
      return a.name.indexOf(name) !== -1;
    });
  },
};

export const MOCK_ARTIST_OPTIONS: ArtistOptions[] = [];
for (let i = 0; i < 10; i++) {
  MOCK_ARTIST_OPTIONS.push({
    id: i.toString(),
    favourite: false,
    name: `Artist ${i}`,
    url: `dummy_url_${i}`,
    imageUrl: `dummy_img_url_${i}`,
    facebookPageUrl: `dummy_facebook_url_${i}`,
  });
}
