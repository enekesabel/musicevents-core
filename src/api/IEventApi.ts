import {IArtist, IEvent} from '../model';
import {IApi} from './IApi';

export interface IEventApi extends IApi<IEvent, IArtist> {

  markFavourite(id: string): Promise<void>;

  unmarkFavourite(id: string): Promise<void>;

  find(artist: IArtist): Promise<IEvent[]>;
}
