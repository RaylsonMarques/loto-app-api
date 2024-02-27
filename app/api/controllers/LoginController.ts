import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";

import { ILoginUserDTO } from "../models/request/login/ILoginUserDTO";
import { LoginUserService } from "../services/login/LoginUserService";

class LoginController {
	private _loginUserService: LoginUserService;

	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body as ILoginUserDTO;
			LoginController.prototype._loginUserService = new LoginUserService();
			const token: string = await LoginController.prototype._loginUserService.execute(payload);
			return res.status(HttpStatusCode.Ok).json({
				code: HttpStatusCode.Ok,
				message: "Login realizado com sucesso",
				payload: token,
			});
		} catch (error) {
			next(error);
		}
	}
}

export { LoginController };
