import {IArtist} from '../model/Artist';
import {IRepository} from './IRepository';

export interface IArtistRepository extends IRepository<IArtist> {

  markFavourite(id: string): Promise<void>;

  unmarkFavourite(id: string): Promise<void>;

  find(artistName: string): Promise<IArtist[]>;
}
