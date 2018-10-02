import {Artist, ArtistOptions, IArtist} from '../model/Artist';
import {DummyRepositoryBase} from './DummyRepositoryBase';
import {IArtistRepository} from './IArtistRepository';
import {EventOptions} from '../model/Event';
import {IArtistApi} from '../api/IArtistApi';
import {IWebStorage} from './IWebStorage';

export class DummyArtistRepository
  extends DummyRepositoryBase<ArtistOptions, IArtist>
  implements IArtistRepository {
  protected type: string = 'artist';
  private artistApi: IArtistApi;

  constructor(webStorage: IWebStorage, eventApi: IArtistApi) {
    super(webStorage);
    this.artistApi = eventApi;
  }

  async markFavourite(id: string): Promise<void> {
    this.update(id, {id, favourite: true});
  }

  async unmarkFavourite(id: string): Promise<void> {
    this.update(id, {id, favourite: false});
  }

  protected checkCriteria(artistName: string, item: IArtist): boolean {
    return item.name === artistName;
  }

  protected getInstance(options: ArtistOptions): IArtist {
    return new Artist(options);
  }

  protected async remoteSearch(criteria: string): Promise<EventOptions[]> {
    return await this.artistApi.searchArtist(criteria);
  }

}
