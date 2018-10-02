import {IEvent} from '../model/Event';
import {IApi} from './IApi';

export interface IEventApi extends IApi<IEvent> {

  markFavourite(id: string): Promise<void>;

  unmarkFavourite(id: string): Promise<void>;

  find(artistName: string): Promise<IEvent[]>;
}
