import { sharedFunc } from './index';

describe('Shared package tests', () => {
    it('Should sum/concat two argument', () => {
        expect(typeof sharedFunc).toBe('function');
        const res = shared.sharedFunc(1, 2);
        expect(res).toBe(3);
    })
})