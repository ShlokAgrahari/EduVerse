import { asyncHandler } from "../utils/asyncHandler.js";
import newCourse from "../models/course.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getCourses=asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    console.log(userId);
    const courses=await newCourse.find({instructorId:userId})
    res.json(courses)
})

export {getCourses}