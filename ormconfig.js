const config = require('config');

module.exports = {
  type: "postgres",
  url: config.get('App.database.postgresUrl'),
  entities: [
    "src/database/models/*.ts"
  ],
  migrations: [
    "src/database/migrations/*.ts"
  ],
  cli: {
    migrationsDir: "src/database/migrations"
  }
}