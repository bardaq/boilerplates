import { sharedFunc } from '@monorepo/shared';

describe('Client tests', () => {
    it('Should invoke a func from the shared package', () => {
        expect(typeof sharedFunc).toBe('function');
    })
})