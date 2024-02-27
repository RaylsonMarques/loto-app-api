import mongoose from "mongoose";

export const dbConnection = () => {
	console.info("INFO >> Creating database connection.");
	mongoose
		.connect(process.env.DB_URL)
		.then(() => console.info("INFO >> Connected to Database"))
		.catch((error) => console.error("ERROR :: ", error));
};
