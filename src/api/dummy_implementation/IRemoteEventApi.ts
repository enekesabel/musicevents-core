import {EventOptions} from '../../model';

export interface IRemoteEventApi {
  getArtistEvents(artistName: string): Promise<EventOptions[]>;
}
