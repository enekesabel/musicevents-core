import {IArtist} from './IArtist';
import {ArtistOptions} from './ArtistOptions';

export class Artist implements IArtist {
  readonly id: string;
  readonly facebookPageUrl: string;
  readonly favourite: boolean;
  readonly imageUrl: string;
  readonly name: string;
  readonly url: string;

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

  serialize(): ArtistOptions {
    return {
      url: this.url,
      favourite: this.favourite,
      name: this.name,
      facebookPageUrl: this.facebookPageUrl,
      id: this.id,
      imageUrl: this.imageUrl,
    };
  }
}
