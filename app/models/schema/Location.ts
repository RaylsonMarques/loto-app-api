import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const LocationSchema = new Schema({
	id: { type: String, required: true, default: uuid() },
	cep: { type: Number, required: true },
	address: { type: String, required: true },
	number: { type: String, required: false },
	neighborhood: { type: String, required: false },
	complement: { type: String, required: false },
	city: { type: String, required: true },
	state: { type: String, required: true },
	country: { type: String, required: true },
	//- FK
	peopleId: { type: String, required: true }
});

const Location = mongoose.model("Location", LocationSchema);
