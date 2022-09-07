import { Request, Response, NextFunction } from 'express';

export const errorHandler = async (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = {
		...err,
		statusCode: 500,
	};

	error.message = err.message;

	/** Logs error to server console */
	console.log(err);

	res.status(error.statusCode).json({
		error: error.message || 'Server Error',
	});
};
