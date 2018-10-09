import chai, {expect} from 'chai';
import {createNewMockStorage, fillMockStorage} from './mocks/MockWebStorage';
import {DummyEventApi, IEventApi} from '../src/api';
import sinon, {SinonSpy} from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import {Event, EventOptions} from '../src/model';
import {MOCK_REMOTE_EVENT_API} from './mocks/MockRemoteEventApi';
import {MOCK_ARTIST_OPTIONS, MOCK_EVENT_OPTIONS} from './mocks/MockOptions';

chai.use(sinonChai);
chai.use(chaiAsPromised);

const eventApiPrefix = 'event_'; // DummyEventApi prepends 'event_' to id

describe('DummyEventApi', () => {

  let eventApi: IEventApi;
  let mockWebStorage: Storage;
  let getArtistEventsSpy: SinonSpy;
  let getItemSpy: SinonSpy;

  beforeEach(() => {
    mockWebStorage = createNewMockStorage();
    eventApi = new DummyEventApi(mockWebStorage, MOCK_REMOTE_EVENT_API);

    getArtistEventsSpy = sinon.spy(MOCK_REMOTE_EVENT_API, 'getArtistEvents');
    getItemSpy = sinon.spy(mockWebStorage, 'getItem');
  });

  afterEach(() => {
    getArtistEventsSpy.restore();
    getItemSpy.restore();
  });

  describe('Manipulating store', () => {

    it('Should fetch the remote api every time we use find', async () => {
      const searchQuery = 'tist';

      await eventApi.find(searchQuery);
      expect(getArtistEventsSpy).to.have.been.calledOnceWith(searchQuery);
    });
  });

  describe('Finding events', () => {

    beforeEach(() => {
      fillMockStorageWithEventOptions(mockWebStorage, MOCK_EVENT_OPTIONS);
    });

    it('Should throw an error if an entry is not found', async () => {
      const idToFind = 'idontexist';

      await expect(eventApi.get(idToFind)).to.have.been.rejected;
    });

    it('Should be able to find multiple events of an artist based on id', async () => {
      const searchQuery = MOCK_ARTIST_OPTIONS[0].id;

      const expectedResult = MOCK_EVENT_OPTIONS.filter((a) => {
        return a.artistName.indexOf(searchQuery) !== -1;
      }).map(eventOption => new Event(eventOption));

      const result = await eventApi.find(searchQuery);

      expect(result).to.include.deep.members(expectedResult);
      expect(result).to.be.lengthOf(expectedResult.length);
    });

    it('Should be able to find a single event', async () => {
      const searchQuery = MOCK_EVENT_OPTIONS[0].id;
      const expectedResult = [new Event(MOCK_EVENT_OPTIONS[0])];

      const result = await eventApi.find(searchQuery);

      expect(result).to.include.deep.members(expectedResult);
      expect(result).to.be.lengthOf(expectedResult.length);
    });
  });

  describe('Updating event', () => {

    beforeEach(() => {
      fillMockStorageWithEventOptions(mockWebStorage, MOCK_EVENT_OPTIONS);
    });

    it('Should be able to mark an event as favourite', async () => {

      const idToMark = MOCK_EVENT_OPTIONS[0].id;

      await eventApi.markFavourite(idToMark);

      const result = await eventApi.get(idToMark);

      expect(result.favourite).to.be.true;
    });

    it('Should be able to unmark an already favourite event', async () => {

      const idToMark = MOCK_EVENT_OPTIONS[0].id;

      await eventApi.markFavourite(idToMark);
      await eventApi.unmarkFavourite(idToMark);

      const result = await eventApi.get(idToMark);

      expect(result.favourite).to.be.false;
    });

  });

});

const fillMockStorageWithEventOptions = (storage: Storage, eventOptions: EventOptions[]) => {
  const entries = eventOptions.map((option) => {
    return {
      key: eventApiPrefix + option.id,
      value: option,
    };
  });

  fillMockStorage(storage, entries);
};
