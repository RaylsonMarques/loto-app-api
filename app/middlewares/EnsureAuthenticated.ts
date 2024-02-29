import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "process";
import { User } from "../models/schema/User";

interface IAuthenticatedPayload {
	subject: string;
}

export function EnsureAuthenticated() {
	return async (req: Request, res: Response, next: NextFunction) => {
		//- Validate if token is filled
		const authToken: string = req.headers.authorization;
		if (!authToken) {
			return res.status(HttpStatusCode.Unauthorized).json({ code: HttpStatusCode.Unauthorized, message: "Token inválido" });
		}

		//- Validate if token is valid
		const [, token] = authToken.split(" ");
		try {
			const { subject: userId } = verify(token, env.API_KEY) as IAuthenticatedPayload;
			//- Find user and settings
			const { id, active, admin, cpf } = await User.findOne({ id: userId });
			req.user = { id, active, admin, cpf };
		} catch (error) {
			return res.status(HttpStatusCode.Unauthorized).json({ code: HttpStatusCode.Unauthorized, message: "Token inválido" });
		}
		return next();
	};
}
