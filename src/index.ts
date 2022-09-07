import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { charactersController } from './apis/characters/characters.controller';
import { episodesController } from './apis/episodes/episodes.controller';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();
const PORT = process.env.PORT || 8081;

app.use(morgan('dev'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('breaking bad');
});

app.use('/characters', charactersController);
app.use('/episodes', episodesController);

app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
