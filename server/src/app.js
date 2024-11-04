import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.js";


const app=express();

app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST'], 
    credentials:true,
}))


//middleware
app.use(cookieParser());
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))



import  healthcheckRouter  from "./routes/healthcheck.routes.js";

app.use("/healthcheck",healthcheckRouter)

  
app.use("/signup",router);
app.use("/login",router);
app.use("/",router);
app.use("/stdhome",router);
app.use("/instructor/newcourse",router);
app.use("student/cart",router);
export default app;