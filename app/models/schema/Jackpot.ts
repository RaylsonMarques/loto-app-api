import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

import { Game } from "./Games";

const JackpotSchema = new Schema({
	id: { type: String, required: true, default: uuid() },
	name: { type: String, required: true }, //- Nome do bolão
	game: { type: Game, required: true }, //- Tipo do jogo do bolão
	code: { type: String, required: true }, //- Código
	amountGames: { type: Number, required: true }, //- Quantidade de jogos do bolão
	amountDozens: { type: Number, required: true }, //- Quantidade de dezenas
	contest: { type: Number, required: true }, //- Concurso
	price: { type: Number, required: true }, //- Prêmio
	quotas: { type: Number, required: true }, //- Quantidade de cotas
	availableQuotas: { type: Number, required: true }, //- Quantidade de cotas disponíveis
	quotaPrice: { type: Number, required: true }, //- Valor da cota
	date: { type: Date, required: true }, //- Data do bolão
	//- Control
	expired: { type: Boolean, required: true },
});

export const Jackpot = mongoose.model("Jackpot", JackpotSchema);
