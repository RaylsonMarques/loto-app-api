import { hash } from "bcryptjs";

import CpfMask from "../../../../helpers/CpfMask";
import { Login } from "../../../../models/schema/Login";
import { User } from "../../../../models/schema/User";
import ICreateUserDTO from "../../../models/request/user/ICreateUserDTO";
import IUserCreatedDTO from "../../../models/response/user/IUserCreatedDTO";

export default class CreateUserService {
	constructor() {}

	public async execute(payload: ICreateUserDTO): Promise<IUserCreatedDTO> {
		const { name, cpf, birthdate, whatsApp, password } = payload;
		//- Validations
		this.validate(name, cpf, birthdate, whatsApp);

		const cpfMask: CpfMask = new CpfMask(cpf);
		const userToSave = await User.create({
			name,
			cpf: cpfMask.getCpfWithoutMask(),
			birthdate,
			whatsApp,
			admin: this.isAdmin(cpfMask.getCpfWithoutMask()),
		});
		const userSaved = await userToSave.save();

		//- Encript password
		const passwordEncrypted = await hash(password, 8);
		const loginToSave = await Login.create({
			cpf: userSaved.cpf,
			password: passwordEncrypted,
		});
		await loginToSave.save();

		const userCreated: IUserCreatedDTO = { name: userSaved.name, cpf: cpfMask.getCpfWithMask() };
		return userCreated;
	}

	private validate(name: string, cpf: string, birthdate: Date, whatsApp: string): void {
		if (!name || name.length === 0 || name.trim() === "" || name.length < 3)
			throw new Error("Nome inválido. Por favor, preencha corretamente e tente novamente.");
		if (!this.validateCpf(cpf)) throw new Error("CPF inválido. Verifique e tente novamente");
		if (!this.validateTelephone(whatsApp)) throw new Error("Numero de telefone inválido. Verifique e tente novamente");
		if (!this.validateAge(birthdate)) throw new Error("É necessário ser maior de 18 anos para realizar o cadastro");
	}

	private validateCpf(cpf: string): boolean {
		let soma: number;
		let resto: number;
		soma = 0;

		const cpfsInvalidos = [
			"00000000000",
			"11111111111",
			"22222222222",
			"33333333333",
			"44444444444",
			"55555555555",
			"66666666666",
			"77777777777",
			"88888888888",
			"99999999999",
		];

		cpf = cpf.replace(/[\s.-]*/gim, "");
		const cpfInvalido = cpfsInvalidos.indexOf(cpf);

		if (!cpf || cpf.length !== 11 || cpfInvalido !== -1) return false;

		for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
		resto = (soma * 10) % 11;

		if (resto == 10 || resto == 11) resto = 0;
		if (resto != parseInt(cpf.substring(9, 10))) return false;

		soma = 0;
		for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
		resto = (soma * 10) % 11;

		if (resto == 10 || resto == 11) resto = 0;
		return resto !== parseInt(cpf.substring(10, 11));
	}

	private validateTelephone(whatsApp: string): boolean {
		const celular = whatsApp.replace("/[^0-9]/", "");
		return celular.match(/^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/) ? true : false;
	}

	private validateAge(birthdate: Date): boolean {
		const differenceMS = Date.now() - birthdate.getTime();
		const ageDate = new Date(differenceMS);
		const age: number = Math.abs(ageDate.getUTCFullYear() - 1970);

		return age > 18;
	}

	/**
	 * @TODO
	 * É necessário refatorar essa validação.
	 *
	 * @param cpf @type {string}
	 * @returns {boolean}
	 */
	private isAdmin(cpf: string): boolean {
		return cpf === process.env.CPF_MASTER_2;
	}
}
