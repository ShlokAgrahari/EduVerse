import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import newCourse from "../models/course.js";
const addCourse=asyncHandler(async(req,res)=>{
    console.log("Create new course function triggered");
    const {title,createdBy,category,description,pricing}=req.body
    console.log(req.body)
    if(!(title && createdBy && category && description && pricing)){
        throw ApiError(400,"All fields are required")
    }

    const newcourse=await newCourse.create({
        title,
        createdBy,
        category,
        description,
        pricing
    })

    return res.status(200).json(ApiResponse(200,createdBy,"New course added"));
})


export {addCourse}
