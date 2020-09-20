import { getConnectionManager } from 'typeorm';

const connectionManager = getConnectionManager();
export const connection = connectionManager.create(
  // eslint-disable-next-line
  require('../../ormconfig.js')
);
