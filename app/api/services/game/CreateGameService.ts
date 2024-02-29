import CurrencyHelper from "../../../helpers/CurrencyHelper";
import { Game } from "../../../models/schema/Games";
import ICreateGameDTO from "../../models/request/game/ICreateGameDTO";

export default class CreateGameService {

	public async execute(payload: ICreateGameDTO): Promise<any> {
		const { maxNumberPossible, name, price } = payload;
		await this.validate(maxNumberPossible, name, price);
		const code: string = this.createCodeGame(name);
		const currencyHelper: CurrencyHelper = new CurrencyHelper();

		const gameToSave = await Game.create({
			maxNumberPossible,
			name,
			price: currencyHelper.convertToCents(price),
			code
		});

		await gameToSave.save();
		// Create a returnable
	}

	private async validate(maxNumberPossible: number, name: string, price: number): Promise<void> {
		if (maxNumberPossible === 0 || maxNumberPossible === null || maxNumberPossible === undefined) {
			throw new Error("Numero máximo de dezenas possíveis para o jogo inválido. Preencha corretamente e tente novamente");
		}

		if (!name) {
			throw new Error('Nome do jogo inválido');
		}

		if (name.length < 3) {
			throw new Error('O nome do jogo deve conter pelo menos 3 caracteres');
		}

		const gameAlreadyExists = await Game.findOne({ name });
		if (gameAlreadyExists) {
			throw new Error("Já existe um jogo com o nome informado.");
		}

		if (price === 0 || price === null || price === undefined) {
			throw new Error("O valor do jogo é inválido. Preencha corretamente e tente novamente");
		}
	}

	private createCodeGame(name: string): string {
		const splittedName: string[] = name.split("");

		if (splittedName.length > 4) {
			const firstLetter: string = splittedName[0];
			const secondLetter: string = splittedName[2];
			const thirdLetter: string = splittedName[4];
			return `${firstLetter}${secondLetter}${thirdLetter}`.toUpperCase();
		} else {
			return `${splittedName[0]}${splittedName[1]}${splittedName[2]}`.toUpperCase();
		}
	}
}
