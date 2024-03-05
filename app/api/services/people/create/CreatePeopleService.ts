import CpfMask from "../../../../helpers/CpfMask";
import { People } from "../../../../models/schema/People";

export default class CreatePeopleService {
	constructor(private readonly userId: string) {}

	public async execute(name: string, cpf: string, birthdate: Date): Promise<any> {
		const cpfMask = new CpfMask(cpf);
		const initials: string = this.createPeopleInitials(name);

		const peopleToSave = await People.create({
			name,
			cpf: cpfMask.getCpfWithoutMask(),
			birthdate,
			initials,
			gender: null,
			userId: this.userId,
		});

		const peopleSaved = await peopleToSave.save();
		return peopleSaved;
	}

	private createPeopleInitials(name: string): string {
		const nameSplitted = name.split(" ");
		const initials: string = `${nameSplitted[0].charAt(0)}${nameSplitted[nameSplitted.length - 1].charAt(0)}`.toUpperCase();
		return initials;
	}
}
