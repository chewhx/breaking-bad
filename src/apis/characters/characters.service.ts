import { NotFoundError } from '../../common/NotFoundError';
import db, { Tables } from '../../lib/db';

export async function findAll() {
	const characters = await db(Tables.characters).select('*');

	return characters.map((character) => ({
		...character,
		appearances: JSON.parse(character.appearances),
		occupation: JSON.parse(character.occupation),
	}));
}

export async function findById(id: number) {
	const [character] = await db(Tables.characters)
		.select('*')
		.where('id', '=', id);


	if (!character) {
		throw new NotFoundError('Character not found');
	}

	return {
		...character,
		appearances: JSON.parse(character.appearances),
		occupation: JSON.parse(character.occupation),
	};
}

export async function findRandom() {
	const ids = await db(Tables.characters).select('id');
	const { id: selectedId } = ids[Math.floor(Math.random() * ids.length)];

	return await findById(selectedId);
}

export async function getCharacterByOccupation(occupation: string[]) {
	const characters = await db(Tables.characters)
		.select('*')
		.whereJsonObject('occupation', occupation);


	return characters;
}
