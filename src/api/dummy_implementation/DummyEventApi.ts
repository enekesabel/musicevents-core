import {DummyApiBase} from './DummyApiBase';
import {Event, EventOptions, IEvent} from '../../model';
import {IEventApi} from '../IEventApi';
import {IRemoteEventApi} from './IRemoteEventApi';

export class DummyEventApi
  extends DummyApiBase<EventOptions, IEvent>
  implements IEventApi {
  protected type: string = 'event';
  private eventApi: IRemoteEventApi;

  constructor(webStorage: Storage, eventApi: IRemoteEventApi) {
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
