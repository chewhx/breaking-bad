import { JSDOM } from 'jsdom';

export const deathFandomUrl =
	'https://breakingbad.fandom.com/wiki/List_of_Character_Deaths';

export function convertDeathTableRowsToObjects(arr: any[]) {
	return arr.map(([a, b, c, d, e, f]) => ({
		death: a,
		cause: b,
		responsible: c,
		last_words: d,
		season: e,
		series: f,
	}));
}

export async function scrapeBetterCallSaulDeaths(url: string) {
	const tableNthChildren = ['10', '12', '14', '16', '18', '20'];
	const seasons = ['1', '2', '3', '4', '5', '6'];

	const jsdom = await JSDOM.fromURL(url);
	const doc = jsdom.window.document;
	const res: any[] = [];

	tableNthChildren.forEach((tableNth, tableNthIndex) => {
		doc
			.querySelectorAll(
				`#mw-content-text > div > table:nth-child(${tableNth}) * tr`
			)
			.forEach((tr, trIndex) => {
				if (trIndex !== 0) {
					const row: (string | null)[] = [];
					const children = tr.children;

					for (let i = 0; i < tr.children.length; i++) {
						row.push(children.item(i)?.textContent?.trim() || '');
					}

					row.push(seasons[tableNthIndex]);
					row.push('Better Call Saul');
					res.push(row);
				}
			});
	});

	return res;
}

export async function scrapeBreakingBadDeaths(url: string) {
	const tableNthChildren = ['29', '31', '33', '35', '37', '39'];
	const seasons = ['1', '2', '3', '4', '5a', '5b'];

	const jsdom = await JSDOM.fromURL(url);
	const doc = jsdom.window.document;
	const res: any[] = [];

	tableNthChildren.forEach((tableNth, tableNthIndex) => {
		doc
			.querySelectorAll(
				`#mw-content-text > div > table:nth-child(${tableNth}) * tr`
			)
			.forEach((tr, trIndex) => {
				if (trIndex !== 0) {
					const row: (string | null)[] = [];
					const children = tr.children;

					for (let i = 0; i < tr.children.length; i++) {
						row.push(children.item(i)?.textContent?.trim() || '');
					}

					row.push(seasons[tableNthIndex]);
					row.push('Breaking Bad');
					res.push(row);
				}
			});
	});

	return res;
}
