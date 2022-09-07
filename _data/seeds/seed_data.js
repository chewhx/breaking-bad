/* eslint-disable @typescript-eslint/no-var-requires */
const characters = require('../dump/characters.json');
const episodes = require('../dump/episodes.json');
const quotes = require('../dump/quotes.json');
const deaths = require('../dump/deaths.json');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('characters').del();
	await knex('episodes').del();
	await knex('deaths').del();
	await knex('quotes').del();
	await knex('characters').insert(
		characters.map((e) => ({
			...e,
			appearances: JSON.stringify(e.appearances),
			occupation: JSON.stringify(e.occupation),
		}))
	);
	await knex('episodes').insert(
		episodes.map((e) => ({
			...e,
			characters: JSON.stringify(e.characters),
		}))
	);
	await knex('deaths').insert(deaths);
	await knex('quotes').insert(quotes);
};
