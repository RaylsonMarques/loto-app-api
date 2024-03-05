import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const PeopleSchema = new Schema({
	id: { type: String, required: true, default: uuid() },
	name: { type: String, required: true },
	cpf: { type: String, required: true },
	birthdate: { type: Date, required: true },
	initials: { type: String, required: true },
	gender: { type: String, required: false },
	//- FK
	userId: { type: String, required: true},
	//- Dates
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: false }
});

export const People = mongoose.model("People", PeopleSchema);
