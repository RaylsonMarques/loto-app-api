import mongoose, { Schema } from "mongoose";

const GameSchema = new Schema({
	id: { type: String, required: true },
	name: { type: String, required: true }, //- Nome do jogo
	code: { type: String, required: true }, //- Codigo do jogo
	maxNumberPossible: { type: Number, required: true }, //- Numero possíveis para jogar
	price: { type: Number, required: true }, //- Preço unitário
});

export const Game = mongoose.model("Game", GameSchema);
