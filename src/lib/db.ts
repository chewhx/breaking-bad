import knex from 'knex';

export default knex({
	client: 'better-sqlite3',
	connection: {
		filename: process.cwd() + '/db.sqlite',
	},
});

export enum Tables {
	characters = 'characters',
	episodes = 'episodes',
	deaths = 'deaths',
	quotes = 'quotes',
}
