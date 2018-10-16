import {EventOptions} from '../../src/model';
import {IRemoteEventApi} from '../../src/api/dummy_implementation/IRemoteEventApi';
import {MOCK_EVENT_OPTIONS} from './MockOptions';

// tslint:disable-next-line
export const MOCK_REMOTE_EVENT_API: IRemoteEventApi = {
  async getArtistEvents(artistName: string): Promise<EventOptions[]> {
    return MOCK_EVENT_OPTIONS.filter((event) => {
      return event.artistName === artistName;
    });
  },
};
