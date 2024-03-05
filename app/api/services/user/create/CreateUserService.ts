import CpfMask from "../../../../helpers/CpfMask";
import { People } from "../../../../models/schema/People";
import { User } from "../../../../models/schema/User";
import ICreateUserDTO from "../../../models/request/user/ICreateUserDTO";
import IUserCreatedDTO from "../../../models/response/user/IUserCreatedDTO";
import { CreateLoginService } from "../../login/create/CreateLoginService";
import CreatePeopleService from "../../people/create/CreatePeopleService";

export default class CreateUserService {
	constructor() {}

	public async execute(payload: ICreateUserDTO): Promise<IUserCreatedDTO> {
		const { name, cpf, birthdate, whatsApp } = payload;
		//- Validations
		this.validate(name, cpf, birthdate, whatsApp);
		const cpfMask: CpfMask = new CpfMask(cpf);
		const userAlreadyExist = await People.findOne({ cpf: cpfMask.getCpfWithoutMask() });
		if (userAlreadyExist) {
			throw new Error("Já existe um usuário cadastrado com este CPF");
		}
		//- Create user
		const userToSave = await User.create({
			whatsApp,
			email: null,
			active: false,
			admin: this.isAdmin(cpfMask.getCpfWithoutMask()),
		});
		const userSaved = await userToSave.save();
		//- Create people
		const createPeopleService = new CreatePeopleService(userSaved.id);
		const peopleSaved = await createPeopleService.execute(name, cpf, birthdate);
		//- Create login
		const createLoginService = new CreateLoginService();
		await createLoginService.execute(peopleSaved.cpf, peopleSaved.initials);
		const userCreated: IUserCreatedDTO = { name: peopleSaved.name, cpf: cpfMask.getCpfWithMask() };
		return userCreated;
	}

	private validate(name: string, cpf: string, birthdate: Date, whatsApp: string): void {
		if (!name || name.length === 0 || name.trim() === "" || name.length < 3)
			throw new Error("Nome inválido. Por favor, preencha corretamente e tente novamente.");
		if (this.validateCpf(cpf)) throw new Error("CPF inválido. Verifique e tente novamente");
		if (!this.validateTelephone(whatsApp)) throw new Error("Numero de telefone inválido. Verifique e tente novamente");
		if (!this.validateAge(birthdate)) throw new Error("É necessário ser maior de 18 anos para realizar o cadastro");
	}

	private validateCpf(cpf: string): boolean {
		if (!cpf) {
			return false;
		}

		const cpfMask: CpfMask = new CpfMask(cpf);
		cpf = cpfMask.getCpfWithoutMask();
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
		if (!whatsApp) {
			return false;
		}

		const whatsAppSplitted: string[] = whatsApp.split(" ");
		const ddd: string = whatsAppSplitted[0];
		const telephone: string = whatsAppSplitted[1];

		if (!this.validateTelephoneDDD(ddd)) {
			throw new Error("DDD Inválido");
		}

		const telephoneSplitted: string[] = telephone.split("-");
		const telephone1part: string = telephoneSplitted[0];
		const telephone2part: string = telephoneSplitted[1];
		if (telephone1part.length < 5 || telephone2part.length < 4) {
			return false;
		}

		return true;
	}

	private validateAge(birthdate: Date): boolean {
		const birthdateFormatted: Date = new Date(birthdate);
		const actualYear: number = new Date().getFullYear();
		const age = actualYear - birthdateFormatted.getFullYear();
		console.log(age);
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
		return cpf === process.env.CPF_MASTER_1 || cpf === process.env.CPF_MASTER_2;
	}

	private validateTelephoneDDD(ddd: string): boolean {
		const validDDDs: string[] = [
			"(61)",
			"(62)",
			"(64)",
			"(65)",
			"(66)",
			"(67)",
			"(82)",
			"(71)",
			"(73)",
			"(74)",
			"(75)",
			"(77)",
			"(85)",
			"(88)",
			"(98)",
			"(99)",
			"(83)",
			"(81)",
			"(87)",
			"(86)",
			"(89)",
			"(84)",
			"(79)",
			"(68)",
			"(96)",
			"(92)",
			"(97)",
			"(91)",
			"(93)",
			"(94)",
			"(69)",
			"(95)",
			"(63)",
			"(27)",
			"(28)",
			"(31)",
			"(32)",
			"(33)",
			"(34)",
			"(35)",
			"(37)",
			"(38)",
			"(21)",
			"(22)",
			"(24)",
			"(11)",
			"(12)",
			"(13)",
			"(14)",
			"(15)",
			"(16)",
			"(17)",
			"(18)",
			"(19)",
			"(41)",
			"(42)",
			"(43)",
			"(44)",
			"(45)",
			"(46)",
			"(51)",
			"(53)",
			"(54)",
			"(55)",
			"(47)",
			"(48)",
			"(49)",
		];

		return validDDDs.includes(ddd);
	}
}

/*
DDDs de cada estado
Centro-Oeste
– Distrito Federal (61)
– Goiás (62 e 64)
– Mato Grosso (65 e 66)
– Mato Grosso do Sul (67)
Nordeste
– Alagoas (82)
– Bahia (71, 73, 74, 75 e 77)
– Ceará (85 e 88)
– Maranhão (98 e 99)
– Paraíba (83)
– Pernambuco (81 e 87)
– Piauí (86 e 89)
– Rio Grande do Norte (84)
– Sergipe (79)
Norte
– Acre (68)
– Amapá (96)
– Amazonas (92 e 97)
– Pará (91, 93 e 94)
– Rondônia (69)
– Roraima (95)
– Tocantins (63)
Sudeste
– Espírito Santo (27 e 28)
– Minas Gerais (31, 32, 33, 34, 35, 37 e 38)
– Rio de Janeiro (21, 22 e 24)
– São Paulo (11, 12, 13, 14, 15, 16, 17, 18 e 19)
Sul
– Paraná (41, 42, 43, 44, 45 e 46)
– Rio Grande do Sul (51, 53, 54 e 55)
– Santa Catarina (47, 48 e 49)
*/
