import { sharedFunc } from '@monorepo/shared';
import expess from 'express';

const app = expess();

app.get('/', (req, res) => {
    const something = sharedFunc(1, 2);
    res.send('Hello World! ' + something);
})

app.listen(3000, () => console.log('Started on 3000'))