import mongoose, { Schema } from "mongoose";

const JackpotParticipantSchema = new Schema({
	jackpotId: { type: String, required: true },
	userId: { type: String, required: true },
});

export const JackpotParticipant = mongoose.model("JackpotParticipant", JackpotParticipantSchema);
