import { JSDOM } from 'jsdom';

const boredPandaBBQuotesUrl = 'https://www.boredpanda.com/breaking-bad-quotes/';

export async function scrapeBadQuotesFromBoredPanda(
	url: string = boredPandaBBQuotesUrl
) {
	const jsdom = await JSDOM.fromURL(url);
	const doc = jsdom.window.document;

	const quotes: any[] = [];

	doc.querySelectorAll('span.bordered-description').forEach((span) => {
		const textContent = span.textContent;
		if (textContent) {
			const [quote, author] = textContent.split(' – ');
			quotes.push({
				quote: quote.slice(1, quote.length - 1),
				author,
				series: 'Breaking Bad',
			});
		}
	});

	return quotes;
}

const saulUrl = 'https://wealthygorilla.com/better-call-saul-quotes';

export async function scrapeSaulQuotesFromWealthyGorilla(
	url: string = saulUrl
) {
	const jsdom = await JSDOM.fromURL(url);
	const doc = jsdom.window.document;

	const quotes: any[] = [];

	doc.querySelectorAll('#mvp-content-main > p').forEach((p, i) => {
		if (i >= 8) {
			if (p.textContent && p.textContent?.includes(' — ')) {
				const [quote, author] = p.textContent.split(' — ');

				quotes.push({
					quote: quote.split('').slice(quote.indexOf('. '), quote.length - 1),
					author,
					series: 'Better Call Saul',
				});
			}
		}
	});

	return quotes;
}
