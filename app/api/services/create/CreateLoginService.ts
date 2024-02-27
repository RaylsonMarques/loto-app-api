class CreateLoginService {
	//- Repository
	// private loginRepository: LoginRepository;

	public async execute(payload: any): Promise<any> {
		// const { access, email, password } = payload;
		// //- Instantiate services and repositories
		// // this.loginRepository = getCustomRepository(LoginRepository);
		// //- VALIDATIONS
		// await this.validate(access, email, password);
		// //- Encript password
		// const passwordEncrypted = await hash(password, 8);
		// //- Fist access haven't second and third devices. Can be addicted after in system
		// const loginToSave: Document = Login.create({
		// 	access,
		// 	email,
		// 	password: passwordEncrypted,
		// });
		// //- Save login informations
		// await loginToSave.save();
		// //- Make a treatment if necessary else return entity saved
		// return loginToSave;
	}
}

export { CreateLoginService };
