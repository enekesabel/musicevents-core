export const DUMMY_ARTIST_EVENTS_RESPONSE = [
  {
    id: '1007296174',
    artist_id: '330488',
    url: 'https://www.bandsintown.com/e/1007296174?app_id=3d9e023097347bcbbbf01b689024369c&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event',
    on_sale_datetime: '',
    datetime: '2018-10-20T19:00:00',
    description: '',
    venue: {
      country: 'United States',
      city: 'Frisco',
      latitude: '33.1543339',
      name: 'Toyota Stadium',
      region: 'TX',
      longitude: '-96.83517189999998',
    },
    lineup: [
      'Imagine Dragons',
    ],
    offers: [
      {
        type: 'Tickets',
        url: 'https://www.bandsintown.com/t/1007296174?app_id=3d9e023097347bcbbbf01b689024369c&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket',
        status: 'available',
      },
    ],
  },
];

export const DUMMY_ARTIST_RESPONSE = {
  id: '330488',
  name: 'Imagine Dragons',
  url: 'https://www.bandsintown.com/a/330488?came_from=267&app_id=3d9e023097347bcbbbf01b689024369c',
  image_url: 'https://s3.amazonaws.com/bit-photos/large/8483867.jpeg',
  thumb_url: 'https://s3.amazonaws.com/bit-photos/thumb/8483867.jpeg',
  facebook_page_url: 'https://www.facebook.com/ImagineDragons',
  mbid: '',
  tracker_count: 3547911,
  upcoming_event_count: 277,
};

export const DUMMY_ARTIST_SEARCH_RESPONSE = {
  results: {
    'opensearch:Query': {
      '#text': '',
      role: 'request',
      searchTerms: 'imagine',
      startPage: '1',
    },
    'opensearch:totalResults': '7060',
    'opensearch:startIndex': '0',
    'opensearch:itemsPerPage': '30',
    artistmatches: {
      artist: [{
        name: 'Imagine Dragons',
        listeners: '1591905',
        mbid: '012151a8-0f9a-44c9-997f-ebd68b5389f9',
        url: 'https://www.last.fm/music/Imagine+Dragons',
        streamable: '0',
        image: [{
          '#text': 'https://lastfm-img2.akamaized.net/i/u/34s/1eb801e05f94c5981da3b3f546cc9cd6.png',
          size: 'small',
        }, {
          '#text': 'https://lastfm-img2.akamaized.net/i/u/64s/1eb801e05f94c5981da3b3f546cc9cd6.png',
          size: 'medium',
        }, {
          '#text': 'https://lastfm-img2.akamaized.net/i/u/174s/1eb801e05f94c5981da3b3f546cc9cd6.png',
          size: 'large',
        }, {
          '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/1eb801e05f94c5981da3b3f546cc9cd6.png',
          size: 'extralarge',
        }, {
          '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/1eb801e05f94c5981da3b3f546cc9cd6.png',
          size: 'mega',
        }],
      }, {
        name: 'Imagined Herbal Flows',
        listeners: '32859',
        mbid: '',
        url: 'https://www.last.fm/music/Imagined+Herbal+Flows',
        streamable: '0',
        image: [{
          '#text': 'https://lastfm-img2.akamaized.net/i/u/34s/808636b22898dbf39eacdb880c2d8077.png',
          size: 'small',
        }, {
          '#text': 'https://lastfm-img2.akamaized.net/i/u/64s/808636b22898dbf39eacdb880c2d8077.png',
          size: 'medium',
        }, {
          '#text': 'https://lastfm-img2.akamaized.net/i/u/174s/808636b22898dbf39eacdb880c2d8077.png',
          size: 'large',
        }, {
          '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/808636b22898dbf39eacdb880c2d8077.png',
          size: 'extralarge',
        }, {
          '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/808636b22898dbf39eacdb880c2d8077.png',
          size: 'mega',
        }],
      }],
    },
    '@attr': {for: 'imagine'},
  },
};
