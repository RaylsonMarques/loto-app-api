export default class CpfMask {
	constructor(private cpf: string) {
		if (!this.cpf) {
			throw new Error('Ocorreu um erro interno');
		}
	}

	public getCpfWithoutMask(): string {
		let cpf = this.cpf;
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace("-", "");
		return cpf;
	}

	public getCpfWithMask(): string {
		let cpf: string = this.cpf;
		cpf = cpf.replace(/[^\d]/g, "");
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}
}
