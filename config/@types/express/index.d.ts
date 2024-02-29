declare namespace Express {
	export interface Request {
		user: {
			id: string;
			active: boolean;
			admin: boolean;
			cpf: string;
		}
	}
}
