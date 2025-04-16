import mongoose from "mongoose"
import logger from "../utils/Logger.js";

const connectDb = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`)
        logger.info("Database Connected Successfully");
    }
    catch(err){
       logger.error(err.message)
        process.exit(0);
    }
}

export {connectDb};