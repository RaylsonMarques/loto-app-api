import { Router } from 'express';
import { UserController } from '../api/controllers/UserController';
import { LoginController } from '../api/controllers/LoginController';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import GameController from '../api/controllers/GameController';
import ControlController from '../api/controllers/ControlController';

class LotoRoutes {
	//- public
	public serverRoute: string;
	//- private
	//-- Controllers
	private controlController: ControlController;
	private loginController: LoginController;
	private userController: UserController;
	private gameController: GameController;

	constructor(private router: Router) {
		this.initializeVariables();
		this.initializeControllers();
		this.initializeRoutes();
	}

	public initializeVariables(): void {
		this.serverRoute = process.env.URN_LOTO_APPLICATION;
	}

	public initializeControllers(): void {
		this.controlController = new ControlController();
		this.userController = new UserController();
		this.loginController = new LoginController();
		this.gameController = new GameController();
	}

	public initializeRoutes(): void {
		this.controlRoutes();
		this.loginRoutes();
		this.userRoutes();
		this.gameRoutes();
	}

	private controlRoutes(): void {
		const prefix: string = "control";
		this.router.get(`${this.serverRoute}${prefix}authenticated`, EnsureAuthenticated, this.controlController.verifyAuthenticated);
		this.router.get(`${this.serverRoute}${prefix}isAdmin`, EnsureAuthenticated, EnsureAdmin, this.controlController.verifyAdmin);
	}

	private loginRoutes(): void {
		this.router.post(`${this.serverRoute}/login`, this.loginController.login);
	}

	private userRoutes(): void {
		const prefix: string = "/user/";
		this.router.post(`${this.serverRoute}${prefix}create`, this.userController.create); //- Cria um usuario
		this.router.post(`${this.serverRoute}${prefix}user-active`, this.userController.userActive); //- Verifica se o usuário está ativo
		this.router.post(`${this.serverRoute}${prefix}activate`, this.userController.activate); //- Ativa o usuário
		// this.router.get(`${this.serverRoute}${prefix}detail/:userId`, this.userController.detail);
		// this.router.post(`${this.serverRoute}${prefix}code-activation`, this.userController.sendCodeToActivate);
		// this.router.post(
		// 	`${this.serverRoute}${prefix}deactivate`,
		// 	EnsureAuthenticated,
		// 	EnsureActivated,
		// 	EnsureRole([0,1,2]),
		// 	this.userController.deactivate
		// );
	}

	private gameRoutes(): void {
		const prefix: string = "/game/";
		this.router.post(`${this.serverRoute}${prefix}create`, EnsureAuthenticated, EnsureAdmin, this.gameController.create);
	}
}

export { LotoRoutes };
