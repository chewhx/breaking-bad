/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const database = process.env.DATABASE || '';
const user = process.env.USER || '';
const password = process.env.PASSWORD || '';
const host = process.env.HOST || '';
const port = Number(process.env.PORT) || 3306;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			database,
			user,
			password,
			host,
			port,
		},
		migrations: {
			tableName: 'migrations',
			directory: 'migrations',
		},
		seeds: {
			directory: '_data/seeds',
		},
	},
	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
