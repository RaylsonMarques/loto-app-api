import { ICreateUserDTO } from '../../models/request/user/ICreateUserDTO';

class CreateUserService {

	constructor() {}

	public async execute(payload: ICreateUserDTO): Promise<any> {
		const {  } = payload;
	}
}

export { CreateUserService };
