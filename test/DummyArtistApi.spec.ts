import chai, {expect} from 'chai';
import {createNewMockStorage, fillMockStorage, getAllEntry, getParsedItem} from './mocks/MockWebStorage';
import {DummyArtistApi, IArtistApi} from '../src/api';
import sinon, {SinonSpy} from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import {Artist, ArtistOptions} from '../src/model';
import {MOCK_REMOTE_ARTIST_API} from './mocks/MockRemoteArtistApi';
import {MOCK_ARTIST_OPTIONS} from './mocks/MockOptions';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const artistApiPrefix = 'artist_'; // DummyArtistApi prepends 'artist_' to id

describe('DummyArtistApi', () => {

  let artistApi: IArtistApi;
  let mockWebStorage: Storage;
  let searchArtistSpy: SinonSpy;
  let getItemSpy: SinonSpy;

  beforeEach(() => {
    mockWebStorage = createNewMockStorage();
    artistApi = new DummyArtistApi(mockWebStorage, MOCK_REMOTE_ARTIST_API);

    searchArtistSpy = sinon.spy(MOCK_REMOTE_ARTIST_API, 'searchArtist');
    getItemSpy = sinon.spy(mockWebStorage, 'getItem');
  });

  afterEach(() => {
    searchArtistSpy.restore();
    getItemSpy.restore();
  });

  describe('Manipulating store', () => {
    it('Should return the entry directly from the storage if, we use get', async () => {
      const dummyId = '0';
      const dummyEntry = {
        key: artistApiPrefix + dummyId,
        value: {
          id: dummyId,
        },
      };

      fillMockStorage(mockWebStorage, [dummyEntry]);

      await artistApi.get(dummyId);

      expect(getItemSpy).to.have.been.calledOnce;
      expect(searchArtistSpy).to.not.have.been.called;
    });

    it('Should return the results from storage when we use find', async () => {
      const searchQuery = 'tist';

      fillMockStorageWithArtistOptions(mockWebStorage, MOCK_ARTIST_OPTIONS);

      await artistApi.find(searchQuery);
      expect(getItemSpy).to.have.been.called;
    });

    it('Should fill the mock storage with new data, if it fetched new artist from the ArtistApi', async () => {

      // this query should match all dummy artist entry
      // so all should be put in storage
      const searchQuery = 'tist';

      await artistApi.search(searchQuery);

      const storageEntries = getAllEntry(mockWebStorage);

      // timeout needed for promises to run
      // usually we wouldn't wait for this
      setTimeout(() => {
        expect(storageEntries).to.include.deep.members(MOCK_ARTIST_OPTIONS);
        expect(storageEntries).to.be.lengthOf(MOCK_ARTIST_OPTIONS.length);
      }, 200);

    });

    it("Shouldn't manipulate those entries which were already in store when fetching new data", async () => {

      // filling store with modified dummy artist 0 and 1
      const modifiedDummyArtist0 = {
        ...MOCK_ARTIST_OPTIONS[0],
        name: `${MOCK_ARTIST_OPTIONS[0].name}_somethingnew`,
      };
      const modifiedDummyArtist1 = {
        ...MOCK_ARTIST_OPTIONS[1],
        name: `${MOCK_ARTIST_OPTIONS[1].name}_somethingnew`,
      };

      const modifiedArtistEntries = [{
        key: artistApiPrefix + modifiedDummyArtist0.id,
        value: modifiedDummyArtist0,
      }, {
        key: artistApiPrefix + modifiedDummyArtist1.id,
        value: modifiedDummyArtist1,
      }];

      fillMockStorage(mockWebStorage, modifiedArtistEntries);

      // this query should match all dummy artist entry
      // so all should be put in storage
      const searchQuery = 'tist';

      await artistApi.search(searchQuery);

      const storageEntries = getAllEntry(mockWebStorage);

      expect(storageEntries).to.include.deep.members([modifiedDummyArtist0, modifiedDummyArtist1]);
      expect(getParsedItem(mockWebStorage, modifiedArtistEntries[0].key)).to.be.deep.equal(modifiedDummyArtist0);
      expect(getParsedItem(mockWebStorage, modifiedArtistEntries[1].key)).to.be.deep.equal(modifiedDummyArtist1);
    });
  });

  describe('Finding artists', () => {

    it('Should throw an error if an entry is not found', async () => {
      const idToFind = 'idontexist';

      await expect(artistApi.get(idToFind)).to.have.been.rejected;
    });

    it('Should be able to find multiple artists a part of a name', async () => {
      const searchQuery = 'tist';

      fillMockStorageWithArtistOptions(mockWebStorage, MOCK_ARTIST_OPTIONS);

      const expectedResult = MOCK_ARTIST_OPTIONS.filter((a) => {
        return a.name.indexOf(searchQuery) !== -1;
      }).map(artistOption => new Artist(artistOption));

      const result = await artistApi.find(searchQuery);

      expect(result).to.include.deep.members(expectedResult);
      expect(result).to.be.lengthOf(expectedResult.length);
    });

    it('Should be able to find a single artist', async () => {
      fillMockStorageWithArtistOptions(mockWebStorage, MOCK_ARTIST_OPTIONS);

      const searchQuery = MOCK_ARTIST_OPTIONS[0].name;
      const expectedResult = [new Artist(MOCK_ARTIST_OPTIONS[0])];

      const result = await artistApi.find(searchQuery);

      expect(result).to.include.deep.members(expectedResult);
      expect(result).to.be.lengthOf(expectedResult.length);
    });
  });

  describe('Updating artist', () => {

    beforeEach(() => {
      fillMockStorageWithArtistOptions(mockWebStorage, MOCK_ARTIST_OPTIONS);
    });

    it('Should be able to mark an artist as favourite', async () => {

      const idToMark = MOCK_ARTIST_OPTIONS[0].id;

      await artistApi.markFavourite(idToMark);

      const result = await artistApi.get(idToMark);

      expect(result.favourite).to.be.true;
    });

    it('Should be able to unmark an already favourite artist', async () => {

      const idToMark = MOCK_ARTIST_OPTIONS[0].id;

      await artistApi.markFavourite(idToMark);
      await artistApi.unmarkFavourite(idToMark);

      const result = await artistApi.get(idToMark);

      expect(result.favourite).to.be.false;
    });

  });

});

const fillMockStorageWithArtistOptions = (storage: Storage, artistOptions: ArtistOptions[]) => {
  const entries = artistOptions.map((option) => {
    return {
      key: artistApiPrefix + option.id,
      value: option,
    };
  });

  fillMockStorage(storage, entries);
};
