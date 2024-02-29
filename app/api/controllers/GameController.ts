import { NextFunction, Request, Response } from "express";
import ICreateGameDTO from "../models/request/game/ICreateGameDTO";
import CreateGameService from "../services/game/CreateGameService";
import { HttpStatusCode } from "axios";

export default class GameController {
	private _createGameService: CreateGameService;

	constructor() {}

	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body as ICreateGameDTO;
			GameController.prototype._createGameService = new CreateGameService();
			const user: any = await GameController.prototype._createGameService.execute(payload);
			return res.status(HttpStatusCode.Created).json({
				code: HttpStatusCode.Created,
				message: "Novo jogo cadastrado com sucesso",
				payload: user,
			});
		} catch (error) {
			next(error);
		}
	}
}
