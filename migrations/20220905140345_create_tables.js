const characters = 'characters';
const episodes = 'episodes';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable(characters, (table) => {
			table.increments('id');
			table.string('name', 255);
			table.string('birthdate', 255);
			table.json('occupation');
			table.string('image_url', 2047);
			table.string('status', 255);
			table.string('nickname', 255);
			table.json('appearance');
			table.string('portrayed', 255);
			table.string('category', 255);
			table.json('better_call_saul_appearance');
		})
		.createTable(episodes, (table) => {
			table.increments('id');
			table.string('episode_id', 255);
			table.string('title', 255);
			table.string('season', 255);
			table.string('air_date', 255);
			table.json('characters', 255);
			table.string('episode', 255);
			table.string('series', 255);
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable(characters).dropTable(episodes);
};
