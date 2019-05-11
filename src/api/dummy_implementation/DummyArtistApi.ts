import {Artist, ArtistOptions, ArtistSearchOptions, IArtist} from '../../model';
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

  private async getAndSaveArtists(artists: ArtistSearchOptions[]): Promise<IArtist[]> {
    const promises = artists.map(async (artist) => {
      try {
        const response = this.getInstance(await this.artistApi.getArtist(artist.name));
        try {
          const found = await this.get(response.id);
          if (found) {
            return null;
          }
        } catch (e) {

        }

        this.put(response);
        return response;
      } catch (e) {
        return null;
      }
    });

    const responses: (IArtist | null)[] = await Promise.all(promises);
    return responses.filter(r => !!r);
  }

  async search(artistName: string): Promise<IArtist[]> {
    const alreadyFoundArtists = await this.find(artistName);
    const alreadyFoundNames = alreadyFoundArtists.map(a => a.name);
    const artists: ArtistSearchOptions[] = await this.artistApi.searchArtist(artistName);

    const newEntries = artists.filter(a => alreadyFoundNames.indexOf(a.name) === -1);
    const existingNewEntries = await this.getAndSaveArtists(newEntries);

    return [...existingNewEntries, ...alreadyFoundArtists];
  }

  async markFavourite(id: string): Promise<void> {
    this.update(id, {id, favourite: true});
  }

  async unmarkFavourite(id: string): Promise<void> {
    this.update(id, {id, favourite: false});
  }

  protected checkCriteria(query: string, item: IArtist): boolean {
    return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  }

  protected getInstance(options: ArtistOptions): IArtist {
    return new Artist(options);
  }

  protected async remoteFind(criteria: string): Promise<ArtistOptions[]> {
    return [];
  }

}
