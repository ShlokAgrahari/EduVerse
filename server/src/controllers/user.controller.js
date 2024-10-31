import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.js";
const registerUser=asyncHandler(async(req,res)=>{
  console.log("registerUser function called"); 

    console.log('registeruser function called');
    console.log('request body:',req.body);

    const { userName, userEmail, password, role } = req.body;

    if([userName,userEmail,password,role].some(field=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { userEmail }]
      });
    
      if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
      }

      try {
        const newUser = new User({
            userName,
            userEmail,
            password, 
            role,
            loginType: "standard", 
        });

        const createdUser=await newUser.save()

        return res.status(201).json(ApiResponse(200, createdUser, "User registered successfully"))
      } catch (error) {
        console.log("User creation failed",error)
      }
})

export {registerUser}