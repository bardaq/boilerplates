const shared = require('@monorepo/shared');

describe('Server tests', () => {
    it('Should invoke a func from the shared package', () => {
        const {sharedFunc} = shared;
        expect(typeof sharedFunc).toBe('function');
    })
})