import {IEvent} from '../model/Event';
import {IRepository} from './IRepository';

export interface IEventRepository extends IRepository<IEvent> {

  markFavourite(id: string): Promise<void>;

  unmarkFavourite(id: string): Promise<void>;

  find(artistName: string): Promise<IEvent[]>;
}
