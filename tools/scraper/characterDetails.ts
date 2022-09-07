import { JSDOM } from 'jsdom';

export async function scrapeMainCharactersDetails(characters: string[][]) {
	return await Promise.all(
		characters.map(async (char) => {
			const [link, name, portrayed, episodes_count, ...appearances] = char;

			const jsdom = await JSDOM.fromURL(link);
			const doc = jsdom.window.document;

			const image_url =
				doc.querySelector('img.pi-image-thumbnail')?.getAttribute('src') ||
				null;

			const full_name =
				doc
					.querySelector("div[data-source='Full Name'] > div")
					?.textContent?.trim() || 'unknown';

			const occupation =
				doc
					.querySelector("div[data-source='Occupation'] > div")
					?.textContent?.trim() || 'unknown';

			const birth_date =
				doc
					.querySelector("div[data-source='Birthdate'] > div")
					?.textContent?.trim() || 'unknown';

			const character = {
				name,
				portrayed,
				image_url,
				full_name,
				birth_date,
				occupation,
				episodes_count,
				appearances: appearances
					.map((e: string, i: number) => {
						if (e.length) {
							if (i < 4) {
								return String(i + 1);
							}
							if (i === 4) {
								return '5a';
							}
							if (i === 5) {
								return '5b';
							}
						}
					})
					.filter((e: string | undefined) => e !== undefined),
			};

			return character;
		})
	);
}

export async function scrapeSupportingCharactersDetails(
	characters: string[][]
) {
	return await Promise.all(
		characters.map(async (char) => {
			const [link, name, portrayed, S1, S2, S3, S4, S5A, S5B, episodes_count] =
				char;

			const jsdom = await JSDOM.fromURL(link);
			const doc = jsdom.window.document;

			const image_url =
				doc.querySelector('img.pi-image-thumbnail')?.getAttribute('src') ||
				null;

			const full_name =
				doc
					.querySelector("div[data-source='Full Name'] > div")
					?.textContent?.trim() || 'unknown';

			const occupation =
				doc
					.querySelector("div[data-source='Occupation'] > div")
					?.textContent?.trim() || 'unknown';

			const birth_date =
				doc
					.querySelector("div[data-source='Birthdate'] > div")
					?.textContent?.trim() || 'unknown';

			const character = {
				name,
				portrayed,
				image_url,
				full_name,
				birth_date,
				occupation,
				episodes_count,
				appearances: [S1, S2, S3, S4, S5A, S5B]
					.map((e: string, i: number) => {
						if (e.length) {
							if (i < 4) {
								return String(i + 1);
							}
							if (i === 4) {
								return '5a';
							}
							if (i === 5) {
								return '5b';
							}
						}
					})
					.filter((e: string | undefined) => e !== undefined),
			};

			return character;
		})
	);
}

export async function scrapeMinorCharactersDetails(characters: string[][]) {
	return await Promise.all(
		characters.map(async (char) => {
			const [link, name, portrayed, episodes_count] = char;

			const jsdom = await JSDOM.fromURL(link);
			const doc = jsdom.window.document;

			const image_url =
				doc.querySelector('img.pi-image-thumbnail')?.getAttribute('src') ||
				null;

			const full_name =
				doc
					.querySelector("div[data-source='Full Name'] > div")
					?.textContent?.trim() || 'unknown';

			const occupation =
				doc
					.querySelector("div[data-source='Occupation'] > div")
					?.textContent?.trim() || 'unknown';

			const birth_date =
				doc
					.querySelector("div[data-source='Birthdate'] > div")
					?.textContent?.trim() || 'unknown';

			const character = {
				name,
				portrayed,
				image_url,
				full_name,
				birth_date,
				occupation,
				episodes_count,
				appearances: [],
			};

			return character;
		})
	);
}
