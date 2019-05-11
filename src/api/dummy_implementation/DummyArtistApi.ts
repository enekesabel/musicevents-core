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

  private async getAndSaveArtists(artists: ArtistSearchOptions[]): Promise<ArtistSearchOptions[]> {
    const promises = artists.map(async (artist) => {
      try {
        const response = await this.artistApi.getArtist(artist.name);

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

    const responses: (ArtistOptions | null)[] = await Promise.all(promises);
    const foundOnes: ArtistOptions[] = responses.filter(r => !!r);

    return foundOnes.map(a => ({
      name: a.name,
    }));
  }

  async search(artistName: string): Promise<ArtistSearchOptions[]> {
    const alreadyFoundArtists = (await this.find(artistName)).map(a => ({name: a.name}));
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
