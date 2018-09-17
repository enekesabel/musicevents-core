export type ArtistOptions = Partial<IArtist>;

export interface IArtist {
	id: string;
	name: string;
	url: string;
	imageUrl: string;
	facebookPageUrl: string;
	favourite: boolean;
}

export class Artist implements IArtist {
	id: string = null;
	facebookPageUrl: string = null;
	favourite: boolean = false;
	imageUrl: string = null;
	name: string = null;
	url: string = null;

	constructor(options: ArtistOptions) {
		if (!options) {
			return;
		}
		this.id = options.id || null;
		this.facebookPageUrl = options.facebookPageUrl || null;
		this.favourite = options.favourite || false;
		this.imageUrl = options.imageUrl || null;
		this.name = options.name || null;
		this.url = options.url || null;
	}
}
