import 'module-alias/register';
import server from './app';

server.listen(3000, () => console.log('Started on 3000'));