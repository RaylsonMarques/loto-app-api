import { hash } from "bcryptjs";

import { Login } from "../../../../models/schema/Login";

class CreateLoginService {

	public async execute(cpf: string, initials: string): Promise<any> {
		// const numbers: number =	Math.floor(Math.random() * (99999 - 100) + 100);
		const numbers: number = 123456;
		const tempPassword: string = `${initials}${numbers}`;
		const passwordEncrypted = await hash(tempPassword, 8);
		const loginToSave = await Login.create({
			cpf,
			password: passwordEncrypted,
			provisory: true,
		});
		await loginToSave.save();
	}
}

export { CreateLoginService };
