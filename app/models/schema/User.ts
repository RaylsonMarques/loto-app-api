import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const UserSchema = new Schema({
	id: { type: String, required: true, default: uuid() },
	name: { type: String, required: true },
	cpf: { type: String, required: true },
	birthdate: { type: Date, required: true },
	whatsApp: { type: String, required: true },
	//- Utils
	active: { type: Boolean, required: true, default: false },
	admin: { type: Boolean, required: true, default: false },
});

export const User = mongoose.model("User", UserSchema);
