import {EventOptions} from '../model/Event';

export interface IEventApi {
  getArtistEvents(artistName: string): Promise<EventOptions[]>;
}
