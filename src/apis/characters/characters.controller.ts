import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../middlewares/asyncHandler';
import { findAll, findById, findRandom } from './characters.service';

const router = Router();

router.get(
	'/',
	asyncHandler(async (req: Request, res: Response) => {
		res.status(200).json(await findAll());
	})
);

router.get(
	'/random',
	asyncHandler(async (req: Request, res: Response) => {
		res.status(200).json(await findRandom());
	})
);

router.get(
	'/:id',
	asyncHandler(async (req: Request, res: Response) => {
		res.status(200).json(await findById(+req.params.id));
	})
);

export { router as charactersController };
