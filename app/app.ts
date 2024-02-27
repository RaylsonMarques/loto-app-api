import { HttpStatusCode } from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response, Router } from "express";

import { dbConnection } from "../database/LotoDBConnection";
import { LotoRoutes } from "./routes/LotoRoutes";

class LotoApplication {
	public main(): void {
		dotenv.config();
		const express: express.Express = this.expressConfiguration();
		const door: string = process.env.PORT || process.env.PORT_SERVER;
		dbConnection();
		express.listen(door, () => console.info(`INFO :: Loto Application API server is active on: ${process.env.URL_ROOT}:${door}`));
	}

	private expressConfiguration(): express.Express {
		//- Configure express
		const app = express();
		app.use(cors());
		app.use(express.json({ limit: "10000mb" }));
		app.use(express.urlencoded({ limit: "10000mb", extended: true, parameterLimit: 5000 }));
		const router: Router = Router();
		new LotoRoutes(router);
		app.use(router);
		app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
			if (error instanceof Error) {
				return res.status(HttpStatusCode.BadRequest).json({
					code: HttpStatusCode.BadRequest,
					message: error.message,
					payload: error,
				});
			}

			return res.status(HttpStatusCode.InternalServerError).json({
				code: HttpStatusCode.InternalServerError,
				message: "Internal server error",
			});
		});

		return app;
	}
}

export { LotoApplication };
