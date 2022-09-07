/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	development: {
		client: 'better-sqlite3',
		connection: {
			filename: './db.sqlite',
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
		client: 'better-sqlite3',
		connection: {
			filename: './db.sqlite',
		},
		migrations: {
			tableName: 'migrations',
			directory: 'migrations',
		},
		seeds: {
			directory: '_data/seeds',
		},
	},
};
