import {IRemoteArtistApi} from './IRemoteArtistApi';
import {ArtistOptions, ArtistSearchOptions} from '../../model';
import {AxiosInstance} from 'axios';
import {API_KEY, BANDSINTOWN_URL, LAST_FM_URL} from './config';

export class RemoteArtistApi implements IRemoteArtistApi {

  constructor(private axiosInstance: AxiosInstance) {
  }

  async getArtist(name: string): Promise<ArtistOptions> {
    const response = await this.axiosInstance.get(`${BANDSINTOWN_URL}/${name}`, {
      params: {
        app_id: API_KEY,
      },
    });

    return {
      id: response.data.id,
      name: response.data.name,
      facebookPageUrl: response.data.facebook_page_url,
      imageUrl: response.data.image_url,
      url: response.data.url,
      favourite: false,
    };
  }

  async searchArtist(name: string): Promise<ArtistSearchOptions[]> {
    const response = await this.axiosInstance.get(LAST_FM_URL, {
      params: {
        method: 'artist.search',
        artist: name,
        api_key: API_KEY,
        format: 'json',
        limit: 5,
      },
    });

    const artists: any[] = response.data.results.artistmatches.artist;
    return artists.map(artist => ({
      name: artist.name,
    }));
  }

}
