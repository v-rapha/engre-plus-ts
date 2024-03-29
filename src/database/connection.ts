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

console.log('ENTITIES_PATH', entitiesPath);
console.log('MIGRATIONS_PATH', migrationsPath);
console.log('POSTGRESQL: ' , config.get('App.database'))
console.log('PORT: ' + config.get('App.port'))
console.log('KEY: ' + config.get('App.auth.key'))

const connectionManager = getConnectionManager();
export const connection = connectionManager.create({
  type: 'postgres',
  url: config.get('App.database.postgresUrl'),
  entities: [entitiesPath],
  migrations: [migrationsPath],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  cli: {
    migrationsDir: 'src/database/migrations',
  },
});
