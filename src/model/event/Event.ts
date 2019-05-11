import {IEvent} from './IEvent';
import {EventOptions} from './EventOptions';

export class Event implements IEvent {
  readonly artistId: string;
  readonly city: string;
  readonly datetime: string;
  readonly description: string;
  readonly id: string;
  readonly favourite: boolean;
  readonly locationName: string;
  readonly lineup: string[];

  constructor(options: EventOptions) {
    if (!options) {
      return;
    }
    this.artistId = options.artistId || null;
    this.city = options.city || null;
    this.datetime = options.datetime || null;
    this.description = options.description || null;
    this.id = options.id || null;
    this.favourite = options.favourite || false;
    this.locationName = options.locationName || null;
    this.lineup = options.lineup || [];
  }

  serialize(): EventOptions {
    return {
      id: this.id,
      favourite: this.favourite,
      locationName: this.locationName,
      description: this.description,
      datetime: this.datetime,
      city: this.city,
      artistId: this.artistId,
    };
  }

}
