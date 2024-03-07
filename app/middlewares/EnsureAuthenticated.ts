import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { People } from "../models/schema/People";
import { User } from "../models/schema/User";

interface IAuthenticatedPayload {
	sub: string;
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
			const { sub } = verify(token, process.env.API_KEY) as IAuthenticatedPayload;
			//- Find user and settings
			const peopleFounded = await People.findOne({ userId: sub });
			const userFounded = await User.findOne({ id: sub });
			req.user = { id: userFounded.id, active: userFounded.active, admin: userFounded.admin, cpf: peopleFounded.cpf };
		} catch (error) {
			return res.status(HttpStatusCode.Unauthorized).json({ code: HttpStatusCode.Unauthorized, message: "Token inválido" });
		}
		return next();
	};
}
