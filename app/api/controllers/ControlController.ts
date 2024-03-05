import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";

export default class ControlController {
	public verifyAuthenticated(req: Request, res: Response, next: NextFunction) {
		return res.status(HttpStatusCode.Created).json({
			code: HttpStatusCode.Ok,
			message: "",
			payload: true,
		});
	}

	public verifyAdmin(req: Request, res: Response, next: NextFunction) {
		return res.status(HttpStatusCode.Created).json({
			code: HttpStatusCode.Ok,
			message: "",
			payload: true,
		});
	}
}
