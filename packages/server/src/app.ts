import { sharedFunc } from '@monorepo/shared';
import expess from 'express';

import { a } from './anotherModule';
import { entity } from '@entities';

const app = expess();

app.get('/', (req, res) => {
    console.log(a);
    const something = sharedFunc(1, 2);
    res.send('Hello World! ' + something);
})

const server = app;

export default server;
