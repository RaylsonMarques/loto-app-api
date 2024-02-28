import { Router } from 'express';
import { UserController } from '../api/controllers/UserController';
import { LoginController } from '../api/controllers/LoginController';

class LotoRoutes {
	//- public
	public serverRoute: string;
	//- private
	//-- Controllers
	private loginController: LoginController;
	private userController: UserController;

	constructor(private router: Router) {
		this.initializeVariables();
		this.initializeControllers();
		this.initializeRoutes();
	}

	public initializeVariables(): void {
		this.serverRoute = process.env.URN_LOTO_APPLICATION;
	}

	public initializeControllers(): void {
		this.userController = new UserController();
		this.loginController = new LoginController();
	}

	public initializeRoutes(): void {
		this.loginRoutes();
		this.userRoutes();
	}

	private loginRoutes(): void {
		this.router.post(`${this.serverRoute}/login`, this.loginController.login);
	}

	private userRoutes(): void {
		const prefix: string = "/user/";
		this.router.post(`${this.serverRoute}${prefix}create`, this.userController.create);
		// this.router.get(`${this.serverRoute}${prefix}detail/:userId`, this.userController.detail);
		// this.router.post(`${this.serverRoute}${prefix}code-activation`, this.userController.sendCodeToActivate);
		// this.router.post(`${this.serverRoute}${prefix}activate`, this.userController.activate);
		// this.router.post(
		// 	`${this.serverRoute}${prefix}deactivate`,
		// 	EnsureAuthenticated,
		// 	EnsureActivated,
		// 	EnsureRole([0,1,2]),
		// 	this.userController.deactivate
		// );
	}
}

export { LotoRoutes };
