export interface IEvent {
	id: string;
	artistId: string;
	datetime: string;
	url: string;
	description: string;
	favourite: boolean;
	locationName: string;
	city: string;
}

export type EventOptions = Partial<IEvent>;

export class Event implements IEvent {
	artistId: string = null;
	city: string = null;
	datetime: string = null;
	description: string = null;
	id: string = null;
	favourite: boolean = null;
	locationName: string = null;
	url: string = null;

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
		this.url = options.url || null;
	}

}
