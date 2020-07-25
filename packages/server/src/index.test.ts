import { sharedFunc } from '@monorepo/shared';

describe('Server tests', () => {
    it('Should invoke a func from the shared package', () => {
        expect(typeof sharedFunc).toBe('function');
    })
})