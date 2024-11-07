import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


const getUser = asyncHandler(async(req,res,next)=>{
    try {
        console.log("middleware");
        const accessToken = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","");
        if(!accessToken){
            throw ApiError(401,"unauthorised reques");
        }

        const decodetoken = jsonwebtoken.verify(accessToken,process.env.JWT_SECRET);
        const user = await User.findById(decodetoken.id).select("-password");

        if(!user){
            throw  ApiError(401,"user does not found");
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("error is : ",error);
        throw ApiError(401,"invalid access");
    }
});

export default getUser;