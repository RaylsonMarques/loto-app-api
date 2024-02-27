import { Router } from 'express';

class LotoRoutes {
	//- public
	public serverRoute: string;
	//- private
	//-- Controllers

	constructor(private router: Router) {
		this.initializeVariables();
		this.initializeControllers();
		this.initializeRoutes();
	}

	public initializeVariables(): void {
		this.serverRoute = process.env.URN_LOTO_APPLICATION;
	}

	public initializeControllers(): void {}

	public initializeRoutes(): void {
		// this.router.post(`${this.serverRoute}/login`, this.loginController.login);
		this.userRoutes(); //- Create user routes
	}

	private userRoutes(): void {
		const prefix: string = "/user/";
		// this.router.get(`${this.serverRoute}${prefix}detail/:userId`, this.userController.detail);
		// this.router.post(`${this.serverRoute}${prefix}create`, this.userController.create);
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
