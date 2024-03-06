import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';

const AccountSchema = new Schema({
	id: { type: String, required: true, default: uuid() },
	userId: { type: String, required: true },
	balance: { type: Number, required: true },
	expectedBalance: { type: Number, required: true },
	//- Dates
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: false }
});

export const Account = mongoose.model('Account', AccountSchema);
