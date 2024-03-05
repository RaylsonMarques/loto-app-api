import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const UserSchema = new Schema({
	id: { type: String, required: true, default: uuid() },
	//- Contacts
	whatsApp: { type: String, required: true },
	email: { type: String, required: false },
	//- Utils
	active: { type: Boolean, required: true, default: false },
	admin: { type: Boolean, required: true, default: false },
	//- Dates
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: false },
});

export const User = mongoose.model("User", UserSchema);
