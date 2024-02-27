import { ILoginUserDTO } from '../../models/request/login/ILoginUserDTO';

class LoginUserService {
	// private loginRepository: LoginRepository;
	// private userRepository: UserRepository;

	constructor() {}

	public async execute(payload: ILoginUserDTO): Promise<string> {
		//- Instantiate services and repositories
		// this.loginRepository = getCustomRepository(LoginRepository);
		// this.userRepository = getCustomRepository(UserRepository);

		/*
		const { username, email, password } = payload;
		if (!username && !email) {
			//- Throw an exception with status 401 unauthorized
		}

		//- Find any user with payload
		const userFindedByAccess: Document = await Login.findOne({ access: username });
		const userFindedByEmail: Document = await Login.findOne({ email });

		//- Validate
		if (!userFindedByAccess && !userFindedByEmail) {
			//- Throw an exception with status 401 unauthorized
		}

		let login: Document;

		if (userFindedByAccess) login = userFindedByAccess;
		else if (userFindedByEmail) login = userFindedByEmail;

		const user: Document = await User.findOne({ loginId: login.id });

		const passwordMatch = await compare(password, login.password);
		if (!passwordMatch) {
			//- Throw an exception
		}

		const token: string = sign(
			{
				email: login.email,
				user,
			},
			env.API_KEY,
			{ subject: user.id, expiresIn: env.TOKEN_EXPIRATION }
		);
		return token;
		*/
		return null;
	}
}

export { LoginUserService };
