import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import app from "../app.js";






const registerUser = asyncHandler(async(req,res)=>{
    console.log("registeruser worked");
    const {userName,userEmail,password,role,loginType} = req.body;
        if(!(userName && userEmail && password && role)){
            throw new ApiError(400,"all fields are required");
        }

        const existuser = await User.findOne({userEmail})
        if(existuser){
            throw new ApiError(409,"user already exists");
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

        return res.status(200).json(ApiResponse(200,user,"successfully registered"));
})

const loginUser = asyncHandler(async(req,res)=>{
    console.log("login worked");
    const {userEmail,password,role} = req.body;
    if(!(userEmail && password)){
        throw new ApiError(400,"all fields are required");
    }

    const user = await User.findOne({userEmail});
    if(!user){
        throw new ApiError(409,"user does not exist");
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
})

const test = asyncHandler(async(req,res)=>{
    res.status(200).json({msg: "working"});
});

export {registerUser,loginUser,test};