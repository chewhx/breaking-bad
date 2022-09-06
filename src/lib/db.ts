import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DATABASE || '';
const user = process.env.USER || '';
const password = process.env.PASSWORD || '';
const host = process.env.HOST || '';
const port = Number(process.env.PORT) || 3306;

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
