import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";

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

    return res.status(200).json(ApiResponse(200, user, "Successfully registered"));
});

const loginUser = asyncHandler(async (req, res) => {
    console.log("Login function triggered");
    const { userEmail, password } = req.body; // Removed role as it's not used
    if (!(userEmail && password)) {
        return res.status(400).json(ApiResponse(400,null, "All fields are required"));
    }

    const user = await User.findOne({ userEmail });
    if (!user) {
        return res.status(409).json(ApiResponse(404, null, "User does not exist"));
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json(ApiResponse(401,null,"incorrect password"));
    }

    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    user.token = token;
    user.password = undefined;

    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    return res.status(200).cookie("token", token, options).json(ApiResponse(200, { user }, "Successfully logged in"));
});

const test = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: "Working" });
});

export { registerUser, loginUser, test };
