import { SetupServer } from './server';
import config from 'config';

(async (): Promise<void> => {
  console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
  const server = new SetupServer(config.get('App.port'));
  await server.init();
  server.start();
})();
