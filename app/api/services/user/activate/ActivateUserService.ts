import { compare, hash } from "bcryptjs";

import CpfMask from "../../../../helpers/CpfMask";
import { Login } from "../../../../models/schema/Login";
import { People } from "../../../../models/schema/People";
import { User } from "../../../../models/schema/User";
import { IActivateUserDTO } from "../../../models/request/user/IActivateUserDTO";
import IUserCreatedDTO from "../../../models/response/user/IUserCreatedDTO";

export default class ActivateUserService {
	public async execute(payload: IActivateUserDTO): Promise<IUserCreatedDTO> {
		const { cpf, password, temporaryPassword } = payload;
		const cpfMask: CpfMask = new CpfMask(cpf);
		const peopleFounded = await People.findOne({ cpf: cpfMask.getCpfWithoutMask() });
		if (!peopleFounded) {
			throw new Error("Usuário não encontrado com o CPF informado");
		}

		const login = await Login.findOne({ cpf: cpfMask.getCpfWithoutMask() });
		if (!login) {
			throw new Error("Usuário não encontrado com o CPF informado");
		}

		const user = await User.findOne({ id: peopleFounded.userId });
		if (!user) {
			throw new Error("Usuário não encontrado com o CPF informado");
		}

		const passwordMatch = await compare(temporaryPassword, login.password);
		if (!passwordMatch) {
			//- Throw an exception
			throw new Error("Senha incorreta");
		}

		if (!password || password.length < 6) {
			throw new Error("Nova senha inválida");
		}

		const passwordEncrypted = await hash(password, 8);
		login.provisory = false;
		login.password = passwordEncrypted;
		await login.save();

		user.active = true;
		user.updatedAt = new Date();
		await user.save();

		const userActivated: IUserCreatedDTO = {
			name: peopleFounded.name,
			cpf: peopleFounded.cpf
		}
		return userActivated;
	}
}
