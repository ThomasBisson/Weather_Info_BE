import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import app from './../../src/app';

describe('Integration /test', () => {
    test('return status 200 and test ok', async () => {
        const res = await request(app)
            .get('/test');

        expect(res.statusCode).toBe(200);

        const resContent = JSON.parse(res.text);
        expect(resContent.response).toBe('Test OK !');
    });
});
