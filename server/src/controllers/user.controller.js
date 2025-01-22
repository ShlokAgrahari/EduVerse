import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.js";
import newCourse from "../models/course.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { oauth2Client } from "../utils/googleconfig.js";



const registerUser = asyncHandler(async (req, res) => {
    console.log("Register user function triggered");
    const { userName,phone,userEmail, password, role, loginType } = req.body;
    console.log(req.body)
    
    if (!(userName && userEmail && password)) {
        throw ApiError(400, "All fields are required");
    }

    const existuser = await User.findOne({ userEmail });
    if (existuser) {
        throw ApiError(409, "User already exists");
    }


    const encrpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        userName,
        phone,
        userEmail,
        password: encrpassword,
        role,
        loginType,
    });

    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

    user.token = token;
    user.password = undefined;


    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: "lax",
        path: "/",
        secure: false,
        domain: "localhost"
    };

    return res.status(200).cookie("token", token, options).json(ApiResponse(200, { user }, "registered"));
});

const loginUser = asyncHandler(async (req, res) => {
    console.log("Login function triggered");
    const { userEmail, password } = req.body; 
    if (!(userEmail && password)) {
        throw ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ userEmail });
    if (!user) {
        return res.status(400).json({message:"user does not exist!"});
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(404).json({message:"password is incorrect!"});
    }

    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    user.token = token;
    user.password = undefined;

    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: "lax",
        path: "/",
        secure: false,
        domain: "localhost"
    };
    console.log(user);
    return res.status(200).cookie("token", token, options).json(ApiResponse(200, { user }, "Successfully logged in"));
});


const logoutUser = asyncHandler(async(req,res)=>{
    console.log("logout function triggered");
    res.clearCookie("token",{
        httpOnly: true,
        expires: new Date(0),
    });

    return res.status(200).json(ApiResponse(200,{},"logged out"));
});


const test = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: "Working" });
});

const getinfo = asyncHandler(async(req,res)=>{
    return res.status(202).json(ApiResponse(200,req.user,"user fetched"))
});



const googleLogin = asyncHandler(async(req,res)=>{
    const code = req.query.code;
    const role = req.query.role;
    console.log("code is",code);
    console.log("role is ",role);
    try {
        console.log("googlelogin function triggered");
        const code = req.query.code;
        const googleres = await oauth2Client.getToken(code);
        console.log("google res",googleres);
        oauth2Client.setCredentials(googleres.tokens);
        const userres = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${googleres.tokens.access_token}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${googleres.tokens.access_token}`
            }
        });

        if(!userres.ok){
            console.log("fetching error");
            throw ApiError(401,"invalid");
        }
        const userData = await userres.json();
        const {email, name,} = userData;

        let user = await User.findOne({userEmail:email});

        if(!user){
            user = await User.create({
                userName: name,
                userEmail:email,
                role:role,
                loginType:"google",
            });   
        }
        console.log("id ",user._id);

        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: "lax",
            path: "/",
            secure: false,
            domain: "localhost"
        };
        return res.status(200).cookie("token", token, options).json(ApiResponse(200, { user }, "Successfully logged in through google"));

        
    } catch (error) {
        console.log("google login backend error : ",error);
    }
});

const getDetail = asyncHandler(async(req,res)=>{
    const {courseId} = req.params;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if(!user){
            throw ApiError(401,"user does not found");
        }
        const currcourse = await newCourse.findById(courseId);
        if (!currcourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        const detail = {
            name:user.userName,
            course:currcourse.title,
        }
        return res.status(200).json(ApiResponse(200,{detail},"fetched detail"));
    } catch (error) {
        console.log("get detail error is ",error);
    }
})


export { registerUser, loginUser,googleLogin, test ,logoutUser ,getinfo,getDetail};
