import {IRemoteEventApi} from './IRemoteEventApi';
import {EventOptions} from '../../model/event';
import {AxiosInstance} from 'axios';
import {API_KEY, BANDSINTOWN_URL} from './config';

export class RemoteEventApi implements IRemoteEventApi {

  constructor(private axiosInstance: AxiosInstance) {
  }

  async getArtistEvents(artistName: string): Promise<EventOptions[]> {
    const response = await this.axiosInstance.get(`${BANDSINTOWN_URL}/artists/${artistName}/events`, {
      params: {
        app_id: API_KEY,
      },
    });

    const events: any [] = response.data;

    return events.map(event => ({
      favourite: false,
      id: event.id,
      artistId: event.artist_id,
      city: event.venue.city,
      datetime: event.datetime,
      locationName: event.venue.name,
      lineup: event.lineup,
    }));
  }
}
