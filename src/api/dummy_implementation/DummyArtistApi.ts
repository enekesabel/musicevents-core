import {Artist, ArtistOptions, IArtist} from '../../model';
import {DummyApiBase} from './DummyApiBase';
import {IArtistApi} from '../IArtistApi';
import {IRemoteArtistApi} from './IRemoteArtistApi';

export class DummyArtistApi
  extends DummyApiBase<ArtistOptions, IArtist>
  implements IArtistApi {
  protected type: string = 'artist';
  private artistApi: IRemoteArtistApi;

  constructor(webStorage: Storage, artistApi: IRemoteArtistApi) {
    super(webStorage);
    this.artistApi = artistApi;
  }

  async markFavourite(id: string): Promise<void> {
    this.update(id, {id, favourite: true});
  }

  async unmarkFavourite(id: string): Promise<void> {
    this.update(id, {id, favourite: false});
  }

  protected checkCriteria(query: string, item: IArtist): boolean {
    return item.name.indexOf(query) !== -1;
  }

  protected getInstance(options: ArtistOptions): IArtist {
    return new Artist(options);
  }

  protected async remoteSearch(criteria: string): Promise<ArtistOptions[]> {
    return await this.artistApi.searchArtist(criteria);
  }

}
