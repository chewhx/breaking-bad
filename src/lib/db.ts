import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DATABASE || '';
const user = process.env.DBUSER || '';
const password = process.env.DBPASSWORD || '';
const host = process.env.DBHOST || '';
const port = Number(process.env.DBPORT) || 3306;

export default knex({
	client: 'mysql2',
	connection: {
		database,
		user,
		password,
		host,
		port,
	},
});
