import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";

export function EnsureRole(rolesAllowed: number[]) {
	return async (req: Request, res: Response, next: NextFunction) => {
		//- Validate if token is filled
		const { role } = req.user;
		if (!rolesAllowed.includes(role)) {
			return res.status(HttpStatusCode.Unauthorized).json({
				code: HttpStatusCode.Unauthorized,
				message: "Usuário não autorizado. Você não possui o permissão para acessar esta ação.",
			});
		}

		return next();
	};
}
