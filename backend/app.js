import express, { urlencoded } from "express";
import cors from "cors";
import UserRouter from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";

// crete app from express
const app = express();


const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // must match frontend origin
  credentials: true,
}));

app.use(express.json());
app.use(urlencoded({
    limit:"10kb",
    extended:true
}))
app.use(cookieParser());


app.use('/',UserRouter)

export default app;