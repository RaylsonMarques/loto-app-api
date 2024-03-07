import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import CpfMask from "../../../../helpers/CpfMask";
import { Login } from "../../../../models/schema/Login";
import { People } from "../../../../models/schema/People";
import { User } from "../../../../models/schema/User";
import IDoLoginDTO from "../../../models/request/login/IDoLoginDTO";

export default class DoLoginService {
	constructor() {}

	public async execute(payload: IDoLoginDTO): Promise<string> {
		const { cpf, password } = payload;
		if (!cpf) {
			//- Throw an exception with status 401 unauthorized
			throw new Error("Usuário ou senha incorretos");
		}

		//- Find any user with payload
		const cpfMaskHelper = new CpfMask(cpf);
		const loginFounded = await Login.findOne({ cpf: cpfMaskHelper.getCpfWithoutMask() });
		const peopleFounded = await People.findOne({ cpf: cpfMaskHelper.getCpfWithoutMask() });
		const user = await User.findOne({ id: peopleFounded.userId });

		//- Validate
		if (!loginFounded || !peopleFounded) {
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
				cpf: loginFounded.cpf,
			},
			process.env.API_KEY,
			{ subject: user.id, expiresIn: process.env.TOKEN_EXPIRATION }
		);

		return token;
	}
}
