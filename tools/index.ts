import { writeJsonSync } from 'fs-extra';
import {
	saulScrapeCharactersTable,
	saulScrapeMainCharactersDetails,
} from './scraper/betterCallSaul';
import { badScrapeCharactersFromTable } from './scraper/breakingBad';
import {
	scrapeMainCharactersDetails,
	scrapeMinorCharactersDetails,
	scrapeSupportingCharactersDetails,
} from './scraper/characterDetails';
import {
	scrapeBadQuotesFromBoredPanda,
	scrapeSaulQuotesFromWealthyGorilla,
} from './scraper/quotes';

// saulScrapeCharactersTable().then(async (characters) => {
// 	const details = await scrapeMinorCharactersDetails(characters.minor);
// 	console.log(details);
// });

// scrapeBadQuotesFromBoredPanda().then(async (quotes) => {
// 	console.log(quotes);
// });

// scrapeSaulQuotesFromWealthyGorilla().then((quotes) => console.log(quotes));

saulScrapeCharactersTable().then(async (chars) => {
	const main = await saulScrapeMainCharactersDetails(chars.main);
	const supporting = await scrapeSupportingCharactersDetails(chars.supporting);
	const minor = await scrapeMinorCharactersDetails(chars.minor);

	writeJsonSync('./bsccharacters2.json', [...main, ...supporting, ...minor]);
});
