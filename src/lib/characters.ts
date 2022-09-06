import db from './db';

type ICharactersQuery = {
	id: string;
	name: string;
	birthday: string;
	occupation: string[];
	img: string;
	status: string;
	nickname: string;
	appearance: number[];
	portrayed: string;
	category: string;
	better_call_saul_appearance: number[];
};

export async function getCharacters(query?: Partial<ICharactersQuery>) {
	let charactersQuery = db('characters').select('*');

	// if (query) {
	//   console.log(Object.keys(query), [Object.values(query)]);
	//   charactersQuery = charactersQuery.whereIn(Object.keys(query), [
	//     Object.values(query),
	//   ]);
	// }

	const characters = await charactersQuery;

	await db.destroy();

	return characters;
}

export async function getCharacterById(id: number) {
	const [character] = await db('characters').select('*').where('id', '=', id);
	await db.destroy();
	return character;
}

export async function getRandomCharacter() {
	const ids = await db('characters').select('id');
	const { id: selectedId } = ids[Math.floor(Math.random() * ids.length)];

	return await getCharacterById(selectedId);
}

export async function getCharacterByOccupation(occupation: string[]) {
	const characters = await db('characters')
		.select('*')
		.whereJsonObject('occupation', occupation);

	await db.destroy();
	return characters;
}
