import mongoose, { Schema } from "mongoose";

const SpecialGroupSchema = new Schema({});

export const SpecialGroup = mongoose.model('SpecialGroup', SpecialGroupSchema);
