export class NotFoundError extends Error {
	public readonly statusCode: number;

	constructor(args: any) {
		super(args);
		this.statusCode = 404;
	}
}
