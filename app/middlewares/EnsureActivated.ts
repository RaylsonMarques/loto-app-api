import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";

export function EnsureActivated() {
	return async (req: Request, res: Response, next: NextFunction) => {
		//- Validate if token is filled
		const { active } = req.user;
		if (!active) {
			return res
				.status(HttpStatusCode.Forbidden)
				.json({ code: HttpStatusCode.Forbidden, message: "Usuário inativo" });
		}
		return next();
	}
}
