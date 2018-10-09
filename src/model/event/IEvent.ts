import {ISerializable} from '../ISerializable';
import {EventOptions} from './EventOptions';

export interface IEvent extends ISerializable<EventOptions> {
  readonly id: string;
  readonly artistId: string;
  readonly datetime: string;
  readonly description: string;
  readonly favourite: boolean;
  readonly locationName: string;
  readonly city: string;
}
