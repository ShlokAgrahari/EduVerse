import express from "express";
import cors from "cors";
import router from "./routes/user.routes.js";
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))


//middleware
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))

import  healthcheckRouter  from "./routes/healthcheck.routes.js";

app.use("/healthcheck",healthcheckRouter)
app.use("/signup",router)
export default app;