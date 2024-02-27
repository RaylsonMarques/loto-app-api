declare namespace Express {
	export interface Request {
		user: {
			id: string;
			language: LanguageEnum;
			active: boolean;
			role: number;
		}
	}
}
