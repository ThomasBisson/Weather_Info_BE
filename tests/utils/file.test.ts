import { describe, expect, test } from '@jest/globals';

import { readMockJsonFile } from '../../src/utils/file.util';

describe('Read mock json file', () => {
	test('read current weather of paris', () => {
		expect(readMockJsonFile('paris', 'current')).toMatchSnapshot();
	});

	test('read forecast weather of paris', () => {
		expect(readMockJsonFile('paris', 'forecast')).toMatchSnapshot();
	});

	test('read a not existing file', () => {
		expect(readMockJsonFile('paris', 'forecast')).toMatchSnapshot();
	});
});
