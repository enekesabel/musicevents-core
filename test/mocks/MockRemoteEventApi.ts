import {EventOptions} from '../../src/model/index';
import {IRemoteEventApi} from '../../src/api/dummy_implementation/IRemoteEventApi';

// tslint:disable-next-line
export const MOCK_REMOTE_EVENT_API: IRemoteEventApi = {
  getArtistEvents(artistName: string): Promise<EventOptions[]> {
    return undefined;
  },
};

export const DUMMY_EVENTS: EventOptions[] = [];
for (let i = 0; i < 10; i++) {
  DUMMY_EVENTS.push({
    id: i.toString(),
    artistId: `dummy_artist_id_${i}`,
    datetime: `dummy_datetime_${i}`,
    url: `dummy_url_${i}`,
    favourite: false,
    locationName: `dummy_location_name_${i}`,
    city: `dummy__city_${i}`,
  });
}
