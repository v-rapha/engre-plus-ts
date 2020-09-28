import { getConnectionManager } from 'typeorm';
import config from 'config';

// eslint-disable-next-line
// const ormconfig = require('../../ormconfig.js');

const connectionManager = getConnectionManager();
export const connection = connectionManager.create({
  type: 'postgres',
  url: config.get('App.database.postgresUrl'),
  entities: [
    config.get('App.typeorm_path.entities') || 'src/database/models/*.ts',
  ],
  migrations: [
    config.get('App.typeorm_path.migrations') || 'src/database/migrations/*.ts',
  ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
});
