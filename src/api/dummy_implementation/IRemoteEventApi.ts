import {EventOptions} from '../../model/Event';

export interface IRemoteEventApi {
  getArtistEvents(artistName: string): Promise<EventOptions[]>;
}
