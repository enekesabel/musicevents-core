import {IArtist} from '../model/Artist';
import {IApi} from './IApi';

export interface IArtistApi extends IApi<IArtist> {

  markFavourite(id: string): Promise<void>;

  unmarkFavourite(id: string): Promise<void>;

  find(artistName: string): Promise<IArtist[]>;
}