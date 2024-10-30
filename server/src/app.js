import express from "express";
import cors from "cors";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))


//middleware
app.use(cookieParser());
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))


app.get("/",async(req,res)=>{
    res.send("hello world");
})

app.post("/signup",async(req,res)=>{
    try{
        const {userName,userEmail,password,role,loginType} = req.body;
        if(!(userName && userEmail && password && role)){
            return res.status(400).send("all fields are required");
        }

        const existuser = await User.findOne({userEmail})
        if(existuser){
            return res.status(400).send("user already exists");
        }

        const encrpassword = await bcrypt.hash(password,10);
        const user = await User.create({
            userName: userName,
            userEmail:userEmail,
            password:encrpassword,
            role: role,
            loginType:loginType,
        })

        const token = jsonwebtoken.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY});

        user.token = token;
        user.password = undefined;

        return res.status(200).json(user);


    }catch(error){
        console.log(error);
    }
})

app.post("/login",async(req,res)=>{
    try{
        const {userEmail,password,role} = req.body;
        if(!(userEmail && password)){
            return res.status(400).send("all fields are required")
        }

        const user = await User.findOne({userEmail});
        if(!user){
            return res.status(400).send("NO account exists with this email");
        }

        if(await bcrypt.compare(password,user.password)){
            const token = jsonwebtoken.sign(
                {id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRY}
            );
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 24*60*60*1000),
                httpOnly: true,
            };
            return res.status(200).cookie("token",token,options).json({
                success:true
            })

        }
    }catch(error){
        console.log(error);
    }
})

import  healthcheckRouter  from "./routes/healthcheck.routes.js";

app.use("/healthcheck",healthcheckRouter)

export default app;