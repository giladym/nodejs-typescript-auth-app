import { connect, set } from "mongoose";
import { env } from "./enviroment";

const MONGO_DB_URI = env().mongoDbUri;

export const connectToMongoDB = async () => {
    try {
        set("strictQuery", false);
        const db = await connect(MONGO_DB_URI);
        console.log('Connected to MongoDB to ', db.connection.name);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};