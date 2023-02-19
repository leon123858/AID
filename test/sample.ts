import { expect } from 'chai';
import { add } from '../src/testFunc';

describe('sample test', function () {
	it('Should test inside function', () => {
		expect(add(5, 9)).equal(14);
	});
});
