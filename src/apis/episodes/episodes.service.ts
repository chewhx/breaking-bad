import { NotFoundError } from '../../common/NotFoundError';
import db, { Tables } from '../../lib/db';

export async function findAll() {
	const episodes = await db(Tables.episodes).select('*');

	return episodes.map((episode) => ({
		...episode,
		characters: JSON.parse(episode.characters),
	}));
}

export async function findById(id: number) {
	const [episode] = await db(Tables.episodes).select('*').where('id', '=', id);

	if (!episode) {
		throw new NotFoundError('Episode not found');
	}

	return {
		...episode,
		characters: JSON.parse(episode.characters),
	};
}

export async function findRandom() {
	const ids = await db(Tables.episodes).select('id');
	const { id: selectedId } = ids[Math.floor(Math.random() * ids.length)];

	return await findById(selectedId);
}
