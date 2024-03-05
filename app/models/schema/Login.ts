import mongoose, { Schema } from "mongoose";

const LoginSchema = new Schema({
	cpf: { type: String, required: true },
	password: { type: String, required: true },
	provisory: { type: Boolean, required: true }
});

export const Login = mongoose.model("Login", LoginSchema);
