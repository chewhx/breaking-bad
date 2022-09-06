/* eslint-disable @typescript-eslint/no-var-requires */
const characters = require('../dump/characters.json');
const episodes = require('../dump/episodes.json');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('characters').del();
	await knex('episodes').del();
	await knex('characters').insert(
		characters.map(
			({ occupation, appearance, better_call_saul_appearance, ...rest }) => ({
				...rest,
				occupation: JSON.stringify(occupation),
				appearance: JSON.stringify(appearance),
				better_call_saul_appearance: JSON.stringify(
					better_call_saul_appearance
				),
			})
		)
	);
	await knex('episodes').insert(
		episodes.map((e) => ({ ...e, characters: JSON.stringify(e.characters) }))
	);
};
