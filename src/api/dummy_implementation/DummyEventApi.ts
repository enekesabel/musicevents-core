import {DummyApiBase} from './DummyApiBase';
import {Event, EventOptions, IArtist, IEvent} from '../../model';
import {IEventApi} from '../IEventApi';
import {IRemoteEventApi} from './IRemoteEventApi';

export class DummyEventApi
  extends DummyApiBase<EventOptions, IEvent, IArtist>
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

  protected checkCriteria(artist: IArtist, item: IEvent): boolean {
    return item.artistId === artist.id;
  }

  protected getInstance(options: EventOptions): IEvent {
    return new Event(options);
  }

  protected async remoteFind(artist: IArtist): Promise<EventOptions[]> {
    return await this.eventApi.getArtistEvents(artist.name);
  }

}
