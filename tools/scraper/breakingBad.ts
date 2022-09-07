import { JSDOM } from 'jsdom';

const bbCharactersUrl =
	'https://breakingbad.fandom.com/wiki/Category:Breaking_Bad_Characters';

export async function badScrapeCharactersFromTable(
	url: string = bbCharactersUrl
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
			'#mw-content-text > div.mw-parser-output > table:nth-child(8) * tr'
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
		'#mw-content-text > div.mw-parser-output > table:nth-child(10) > tbody > tr * li'
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
