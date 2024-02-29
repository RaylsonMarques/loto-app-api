import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";

import ICreateUserDTO from "../models/request/user/ICreateUserDTO";
import { IEditUserDTO } from "../models/request/user/IEditUserDTO";
import { IDetailUserDTO } from "../models/response/user/IDetailUserDTO";
import CreateUserService from "../services/user/create/CreateUserService";
import { DetailUserService } from "../services/user/detail/DetailUserService";
import IUserCreatedDTO from "../models/response/user/IUserCreatedDTO";

class UserController {
	private _createUserService: CreateUserService;
	private _detailUserService: DetailUserService;

	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body as ICreateUserDTO;
			UserController.prototype._createUserService = new CreateUserService();
			const user: IUserCreatedDTO = await UserController.prototype._createUserService.execute(payload);
			return res.status(HttpStatusCode.Created).json({
				code: HttpStatusCode.Created,
				message: "Usuário criado com sucesso",
				payload: user,
			});
		} catch (error) {
			next(error);
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		const payload = req.body as IEditUserDTO;

		try {
		} catch (error) {
			next(error);
		}
	}

	public async recoverAccount(req: Request, res: Response, next: NextFunction) {}

	public async detail(req: Request, res: Response, next: NextFunction) {
		try {
			const userId: string = req.params.userId;
			UserController.prototype._detailUserService = new DetailUserService();
			const user: IDetailUserDTO = await UserController.prototype._detailUserService.execute(userId);
			return res.status(HttpStatusCode.Ok).json({
				code: HttpStatusCode.Ok,
				message: "",
				payload: user,
			});
		} catch (error) {
			next(error);
		}
	}
}

export { UserController };
