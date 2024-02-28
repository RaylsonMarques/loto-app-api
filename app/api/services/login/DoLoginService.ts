import { compare } from 'bcryptjs';
import { Login } from '../../../models/schema/Login';
import IDoLoginDTO from '../../models/request/login/IDoLoginDTO';
import { sign } from 'jsonwebtoken';
import { User } from '../../../models/schema/User';

export default class DoLoginService {

	constructor() {}

	public async execute(payload: IDoLoginDTO): Promise<string> {
		const { cpf, password } = payload;
		if (!cpf) {
			//- Throw an exception with status 401 unauthorized
			throw new Error("Usuário ou senha incorretos");
		}

		//- Find any user with payload
		const loginFounded = await Login.findOne({ cpf });
		const user = await User.findOne({ cpf });

		//- Validate
		if (!loginFounded || !user) {
			//- Throw an exception with status 401 unauthorized
			throw new Error("Usuário ou senha incorretos");
		}

		const passwordMatch = await compare(password, loginFounded.password);
		if (!passwordMatch) {
			//- Throw an exception
			throw new Error("Usuário ou senha incorretos");
		}

		const token: string = sign(
			{
				cpf: loginFounded.cpf
			},
			process.env.API_KEY,
			{ subject: user.id, expiresIn: process.env.TOKEN_EXPIRATION }
		);

		return token;
	}
}
