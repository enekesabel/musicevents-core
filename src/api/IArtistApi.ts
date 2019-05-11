import {IArtist} from '../model';
import {IApi} from './IApi';

export interface IArtistApi extends IApi<IArtist, string> {

  markFavourite(id: string): Promise<void>;

  unmarkFavourite(id: string): Promise<void>;

  find(artistName: string): Promise<IArtist[]>;

  search(artistName: string): Promise<IArtist[]>;
}
