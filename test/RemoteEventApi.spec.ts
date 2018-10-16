import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import axios, {AxiosInstance} from 'axios';
import sinon, {SinonStub} from 'sinon';
import {DUMMY_ARTIST_EVENTS_RESPONSE} from './mocks/DummyRemoteResponses';
import {IRemoteEventApi} from '../src/api/dummy_implementation/IRemoteEventApi';
import {RemoteEventApi} from '../src/api/dummy_implementation/RemoteEventApi';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('RemoteEventApi', () => {

  const eventOptionKeys = ['id', 'favourite', 'artistId', 'city', 'datetime', 'locationName'];
  const axiosInstance: AxiosInstance = axios;
  let remoteEventApi: IRemoteEventApi;
  let axiosStub: SinonStub;

  beforeEach(() => {
    remoteEventApi = new RemoteEventApi(axiosInstance);
  });

  describe('Searching events of an artists by name', () => {

    beforeEach(() => {
      axiosStub = sinon.stub(axiosInstance, 'get').callsFake(() => {
        return new Promise((resolve, reject) => {
          resolve({data: DUMMY_ARTIST_EVENTS_RESPONSE});
        });
      });
    });

    afterEach(() => {
      axiosStub.reset();
      axiosStub.restore();
    });

    it('Should return a list of ArtistSearchOptions when searching artists', async () => {

      const result = await remoteEventApi.getArtistEvents('name');

      expect(axiosStub).to.be.calledOnce;
      expect(result).to.be.instanceof(Array);

      result.forEach((artistOption) => {
        expect(artistOption).to.have.all.keys(eventOptionKeys);
      });

      expect(true).to.be.true;
    });

  });

});
