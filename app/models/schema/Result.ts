import mongoose, { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { Game } from './Games';

const ResultSchema = new Schema({
	id: { type: String, required: true, default: uuid() },
	name: { type: String, required: true }, //- Nome do bolão
	game: { type: Game, required: true }, //- Tipo do jogo do bolão
	prize: { type: String, required: true }, //- Prêmio
	numbers: { type: String, required: true }, //- Quantidade de jogos do bolão
	contest: { type: Number, required: true }, //- Concurso
	date: { type: Date, required: true }, //- Data do resultado
	//- Dates
	createdAt: { type: Date, required: true, default: Date.now }, //- Data de criação
	updatedAt: { type: Date, required: false }
});

export const Result = mongoose.model("Result", ResultSchema);
