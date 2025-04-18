import express, { urlencoded } from "express";
import cors from "cors";
import UserRouter from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";

// crete app from express
const app = express();


// use common middlewares for react
app.use(cors({
    origin: function(origin, callback) {
      callback(null, true); // Allow any origin
    },
    credentials: true, // Allow credentials (cookies)
  }));
app.use(express.json());
app.use(urlencoded({
    limit:"10kb",
    extended:true
}))
app.use(cookieParser());


app.use('/',UserRouter)

export default app;