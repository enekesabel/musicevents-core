import chai, {expect} from 'chai';
import {createNewMockStorage, fillMockStorage} from './mocks/MockWebStorage';
import {MOCK_ARTIST_OPTIONS, MOCK_REMOTE_ARTIST_API} from './mocks/MockRemoteArtistApi';
import {DummyArtistApi, IArtistApi} from '../src/api/index';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('DummyArtistApi', () => {

  let artistRepository: IArtistApi;
  let mockWebStorage: Storage;

  beforeEach(() => {
    mockWebStorage = createNewMockStorage();
    artistRepository = new DummyArtistApi(mockWebStorage, MOCK_REMOTE_ARTIST_API);
  });

  describe('Finding artists', () => {

    it('Should throw an error if an entry is not found', async () => {
      const idToFind = 'idontexist';

      await expect(artistRepository.get(idToFind)).to.have.been.rejected;
    });

    it('Should return the entry directly from the storage if, we use get', async () => {
      const dummyId = '0';
      const dummyEntry = {
        id: `artist_${dummyId}`,
      };

      fillMockStorage(mockWebStorage, [dummyEntry]);

      const getItemSpy = sinon.spy(mockWebStorage, 'getItem');

      const result = await artistRepository.get(dummyId);

      expect(getItemSpy).to.have.been.calledOnce;
    });

    it('Should fetch the remote api every time we use find', async () => {
      const searchQuery = 'tist';
      const searchArtistSpy = sinon.spy(MOCK_REMOTE_ARTIST_API, 'searchArtist');

      await artistRepository.find(searchQuery);
      expect(searchArtistSpy).to.have.been.calledOnceWith(searchQuery);
    });

    it('Should find artists based on a part of a name', async () => {
      const searchQuery = 'tist';

      const expectedResult = MOCK_ARTIST_OPTIONS.filter((a) => {
        return a.name.indexOf(searchQuery) !== -1;
      });

      const result = await artistRepository.find(searchQuery);

      expect(result).to.include.members(expectedResult);
      expect(result).to.be.lengthOf(expectedResult.length);
    });

    it('Should correctly filter the artists', async () => {
      const searchQuery = MOCK_ARTIST_OPTIONS[0].name;
      const searchArtistSpy = sinon.spy(MOCK_REMOTE_ARTIST_API, 'searchArtist');
      const expectedResult = [MOCK_ARTIST_OPTIONS[0]];

      const result = await artistRepository.find(searchQuery);

      expect(searchArtistSpy).to.have.been.calledOnceWith(searchQuery);

      expect(result).to.include.members(expectedResult);
      expect(result).to.be.lengthOf(expectedResult.length);
    });
  });

});
