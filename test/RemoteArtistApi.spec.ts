import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import {IRemoteArtistApi} from '../src/api/dummy_implementation/IRemoteArtistApi';
import {RemoteArtistApi} from '../src/api/dummy_implementation/RemoteArtistApi';
import axios, {AxiosInstance} from 'axios';
import sinon, {SinonStub} from 'sinon';
import {DUMMY_ARTIST_RESPONSE, DUMMY_ARTIST_SEARCH_RESPONSE} from './mocks/DummyRemoteResponses';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('RemoteArtistApi', () => {

  const artistOptionKeys = ['id', 'name', 'url', 'imageUrl', 'facebookPageUrl', 'favourite'];
  const axiosInstance: AxiosInstance = axios;
  let remoteArtistApi: IRemoteArtistApi;
  let axiosStub: SinonStub;

  beforeEach(() => {
    remoteArtistApi = new RemoteArtistApi(axiosInstance);
  });

  describe('Getting a specific artist', () => {

    beforeEach(() => {
      axiosStub = sinon.stub(axiosInstance, 'get').callsFake(() => {
        return new Promise((resolve, reject) => {
          resolve({data: DUMMY_ARTIST_RESPONSE});
        });
      });
    });

    afterEach(() => {
      axiosStub.reset();
      axiosStub.restore();
    });

    it('Should return an ArtistResponse object', async () => {
      const result = await remoteArtistApi.getArtist('name');

      expect(axiosStub).to.be.calledOnce;
      expect(result).to.have.all.keys(artistOptionKeys);
    });

  });

  describe('Searching artists by name', () => {

    beforeEach(() => {
      axiosStub = sinon.stub(axiosInstance, 'get').callsFake(() => {
        return new Promise((resolve, reject) => {
          resolve({data: DUMMY_ARTIST_SEARCH_RESPONSE});
        });
      });
    });

    afterEach(() => {
      axiosStub.reset();
      axiosStub.restore();
    });

    it('Should return a list of ArtistSearchOptions when searching artists', async () => {

      const result = await remoteArtistApi.searchArtist('name');

      expect(axiosStub).to.be.calledOnce;
      expect(result).to.be.instanceof(Array);

      result.forEach((artistOption) => {
        expect(artistOption).to.have.keys('name');
      });

      expect(true).to.be.true;
    });

  });

});
