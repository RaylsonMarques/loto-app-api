import { Account } from "../../../../models/schema/Account";

export default class CreateAccountService {

	public async execute(userId: string): Promise<any> {

		if (!userId) {
			throw new Error("Usuário inválido");
		}

		const accountToSave = await Account.create({
			userId,
			balance: 0,
			expectedBalance: 0
		});

		const accountSaved = await accountToSave.save();
		return accountSaved;
	}
}
