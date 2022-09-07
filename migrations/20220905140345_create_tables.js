const characters = 'characters';
const episodes = 'episodes';
const deaths = 'deaths';
const quotes = 'quotes';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable(characters, (table) => {
			table.increments('id');
			table.string('name', 255);
			table.string('portrayed', 255);
			table.string('image_url', 2047);
			table.string('full_name', 255);
			table.string('birth_date', 255);
			table.json('occupation');
			table.string('episodes_count', 255);
			table.string('series', 255);
			table.json('appearances');
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
		})
		.createTable(deaths, (table) => {
			table.increments('id');
			table.string('death', 255);
			table.string('cause', 255);
			table.string('responsible', 255);
			table.string('last_words', 255);
			table.string('season', 255);
			table.string('series', 255);
		})
		.createTable(quotes, (table) => {
			table.increments('id');
			table.text('quote');
			table.string('author', 255);
			table.string('series', 255);
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTable(characters)
		.dropTable(episodes)
		.dropTable(quotes)
		.dropTable(deaths);
};
