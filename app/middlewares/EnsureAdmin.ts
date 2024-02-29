import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";

export function EnsureAdmin() {
	return async (req: Request, res: Response, next: NextFunction) => {
		//- Validate if token is filled
		const { admin } = req.user;
		if (!admin) {
			return res.status(HttpStatusCode.Unauthorized).json({
				code: HttpStatusCode.Unauthorized,
				message: "Usuário não autorizado. Você não possui o permissão para acessar esta ação.",
			});
		}

		return next();
	};
}
