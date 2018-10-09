import {ArtistOptions, EventOptions} from '../../src/model';

export const MOCK_ARTIST_OPTIONS: ArtistOptions[] = [];
export const MOCK_EVENT_OPTIONS: (EventOptions & { artistName: string })[] = [];

for (let i = 0; i < 10; i++) {
  MOCK_ARTIST_OPTIONS.push({
    id: i.toString(),
    favourite: false,
    name: `Artist ${i}`,
    url: `dummy_url_${i}`,
    imageUrl: `dummy_img_url_${i}`,
    facebookPageUrl: `dummy_facebook_url_${i}`,
  });

  MOCK_EVENT_OPTIONS.push({
    id: i.toString(),
    artistName: `Artist ${i}`,
    artistId: i.toString(),
    datetime: `dummy_datetime_${i}`,
    url: `dummy_url_${i}`,
    favourite: false,
    locationName: `dummy_location_name_${i}`,
    city: `dummy__city_${i}`,
  });
}
