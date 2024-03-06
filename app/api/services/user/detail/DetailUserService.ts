import CpfMask from "../../../../helpers/CpfMask";
import { People } from "../../../../models/schema/People";
import { User } from "../../../../models/schema/User";

class DetailUserService {
	constructor() {}

	public async execute(userId: string): Promise<any> {}

	public async userIsActive(cpf: string): Promise<boolean> {
		if (!cpf) throw new Error('CPF inválido');
		const cpfMask = new CpfMask(cpf);
		const peopleFounded = await People.findOne({ cpf: cpfMask.getCpfWithoutMask() });
		if (!peopleFounded) throw new Error('Não foi encontrado nenhum usuário com o CPF informado');
		const user = await User.findOne({ id: peopleFounded.userId });
		if (!user) throw new Error("Não foi encontrado nenhum usuário com o CPF informado");
		return user.active;
	}
}

export { DetailUserService };
