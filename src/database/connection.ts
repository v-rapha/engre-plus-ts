import { getConnectionManager } from 'typeorm';
import config from 'config';

// eslint-disable-next-line
// const ormconfig = require('../../ormconfig.js');
const entitiesPath: string = config.has('App.typeorm_path.entities')
  ? config.get('App.typeorm_path.entities')
  : 'src/models/*.ts';
const migrationsPath: string = config.has('App.typeorm_path.migrations')
  ? config.get('App.typeorm_path.migrations')
  : 'src/database/migrations/*.ts';

console.log(entitiesPath);
console.log(migrationsPath);
console.log('POSTGRESQL: ' + config.util.getEnv('App.database.postgresUrl'))

const connectionManager = getConnectionManager();
export const connection = connectionManager.create({
  type: 'postgres',
  url: config.get('App.database.postgresUrl'),
  entities: [entitiesPath],
  migrations: [migrationsPath],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
});
