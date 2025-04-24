import app from "./app.js";
import logger from "./utils/Logger.js";
import dotenv from "dotenv"
import { connectDb } from "./database/database.js";
dotenv.config()

const startServer = () => {
    try {
        app.listen(process.env.PORT, () => {
            logger.info(`Server is listening on port ${process.env.PORT}`);
        });
        connectDb();

    } catch (err) {
        logger.error(" Failed to start the server:", err);
        process.exit(1);
    }
};

startServer();
