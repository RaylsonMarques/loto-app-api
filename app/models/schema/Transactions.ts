import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const TransactionSchema = new Schema({
	id: { type: String, required: true, default: uuid() },
	type: { type: String, required: true }, //- Tipo da transação (D -> Depósito | C -> Compras | R -> Recebimento de prêmio)
	status: { type: String, required: true }, //- Status da transação (E -> Efetivada | P -> Pendente | PP - Em Processamento | F -> Falha | C -> Cancelada)
	value: { type: Number, required: true },
	//- Datas
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: false },
});

export const Transaction = mongoose.model("Transaction", TransactionSchema);
