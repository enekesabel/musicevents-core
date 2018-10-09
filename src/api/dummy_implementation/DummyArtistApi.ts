import {Artist, ArtistOptions, IArtist} from '../../model';
import {DummyApiBase} from './DummyApiBase';
import {IArtistApi} from '../IArtistApi';
import {IRemoteArtistApi} from './IRemoteArtistApi';
import {ArtistSearchOptions} from '../../model/artist';

export class DummyArtistApi
  extends DummyApiBase<ArtistOptions, IArtist>
  implements IArtistApi {
  protected type: string = 'artist';
  private artistApi: IRemoteArtistApi;

  constructor(webStorage: Storage, artistApi: IRemoteArtistApi) {
    super(webStorage);
    this.artistApi = artistApi;
  }

  private getAndSaveArtists(artists: ArtistSearchOptions[]) {
    // not nice but ok for now
    // trying to fetch & save artists which appeared in search
    // doesn't matter if some request fails, so no need for Promise.all
    artists.forEach(async (artist) => {
      const result = await this.artistApi.getArtist(artist.name);
      this.put(result);
    });
  }

  async search(artistName: string): Promise<ArtistSearchOptions[]> {
    const artists: ArtistSearchOptions[] = await this.artistApi.searchArtist(artistName);
    this.getAndSaveArtists(artists);
    return artists;
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

  protected async remoteFind(criteria: string): Promise<ArtistOptions[]> {
    return [];
  }

}
