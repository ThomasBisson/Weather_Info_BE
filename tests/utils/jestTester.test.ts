import { describe, expect, test } from '@jest/globals';

import { sum } from '../../src/utils/jestTester';

describe('Jest shoud succeed', () => {
	test('adds 1 + 2 to equals 3', () => {
		expect(sum(1, 2)).toBe(3);
	});

	test('adds 1 + 2 to not equals 4', () => {
		expect(sum(1, 2)).not.toBe(4);
	});
});
