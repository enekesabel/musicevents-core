import {DummyRepositoryBase} from './DummyRepositoryBase';
import {Event, EventOptions, IEvent} from '../model/Event';
import {IEventRepository} from './IEventRepository';
import {IEventApi} from '../api/IEventApi';
import {IWebStorage} from './IWebStorage';

export class DummyEventRepository
  extends DummyRepositoryBase<EventOptions, IEvent>
  implements IEventRepository {
  protected type: string = 'event';
  private eventApi: IEventApi;

  constructor(webStorage: IWebStorage, eventApi: IEventApi) {
    super(webStorage);
    this.eventApi = eventApi;
  }

  async markFavourite(id: string): Promise<void> {
    this.update(id, {id, favourite: true});
  }

  async unmarkFavourite(id: string): Promise<void> {
    this.update(id, {id, favourite: false});
  }

  protected checkCriteria(artistId: string, item: IEvent): boolean {
    return item.artistId === artistId;
  }

  protected getInstance(options: EventOptions): IEvent {
    return new Event(options);
  }

  protected async remoteSearch(criteria: string): Promise<EventOptions[]> {
    return await this.eventApi.getArtistEvents(criteria);
  }

}
