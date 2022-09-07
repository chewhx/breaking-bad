import { JSDOM } from 'jsdom';

const bcsCharactersUrl =
	'https://breakingbad.fandom.com/wiki/Category:Better_Call_Saul_Characters';

export async function saulScrapeCharactersTable(
	url: string = bcsCharactersUrl
) {
	const jsdom = await JSDOM.fromURL(url);
	const doc = jsdom.window.document;

	const characters: Record<string, any[]> = {
		main: [],
		supporting: [],
		minor: [],
	};

	/** Main Characters */
	doc
		.querySelectorAll(
			'#mw-content-text > div.mw-parser-output > table:nth-child(5) * tr'
		)
		.forEach((tr, trIndex) => {
			if (trIndex !== 0) {
				const children = tr.children;
				const person: string[] = [];
				for (let i = 1; i < children.length; i++) {
					if (i === 1) {
						person.push(children.item(i)?.querySelector('a')?.href || '');
						person.push(children.item(i)?.textContent?.trim() || '');
					} else {
						person.push(children.item(i)?.textContent?.trim() || '');
					}
				}
				characters.main.push(person);
			}
		});

	/** Supporting Characters */
	doc
		.querySelectorAll(
			'#mw-content-text > div.mw-parser-output > table.sortable.wikitable * tr'
		)
		.forEach((tr, trIndex) => {
			if (trIndex !== 0) {
				const children = tr.children;
				const person: string[] = [];

				for (let i = 0; i < children.length; i++) {
					if (i === 0) {
						person.push(children.item(i)?.querySelector('a')?.href || '');
						person.push(children.item(i)?.textContent?.trim() || '');
					} else {
						person.push(children.item(i)?.textContent?.trim() || '');
					}
				}

				characters.supporting.push(person);
			}
		});

	/** Minor Characters */
	const minor = doc.querySelectorAll(
		'#mw-content-text > div.mw-parser-output > table:nth-child(12) > tbody > tr * li'
	);

	if (minor?.length) {
		for (let i = 0; i < minor?.length; i++) {
			const person: string[] = [];
			person.push(
				'https://breakingbad.fandom.com/' +
					minor
						.item(i)
						?.querySelector('a:nth-child(1)')
						?.getAttribute('href') || ''
			);
			person.push(
				minor.item(i)?.querySelector('a:nth-child(1)')?.getAttribute('title') ||
					''
			);
			person.push(
				minor.item(i)?.querySelector('a:nth-child(2)')?.textContent?.trim() ||
					''
			);
			person.push(
				minor
					.item(i)
					?.textContent?.trim()
					?.match(/([^a-zA-Z'. ])/g)
					?.at(1) || ''
			);
			characters.minor.push(person);
		}
	}

	return characters;
}

export async function saulScrapeMainCharactersDetails(characters: string[][]) {
	return await Promise.all(
		characters.map(async (char) => {
			const [link, name, portrayed, S1, S2, S3, S4, S5, S6, episodes_count] =
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
				appearances: [S1, S2, S3, S4, S5, S6]
					.map((e: string, i: number) => {
						if (e.length) {
							return String(i + 1);
						}
					})
					.filter((e: string | undefined) => e !== undefined),
			};

			return character;
		})
	);
}
