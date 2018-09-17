import {add} from '../src';
import {expect} from 'chai';

describe('test', () => {

	it('shoudl add ', () => {
		expect(add(1, 2)).to.be.equal(3);
	});
});
