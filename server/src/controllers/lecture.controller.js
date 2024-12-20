import newCourse from "../models/course.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs'

const getLecture=asyncHandler(async(req,res)=>{
    const {courseId}=req.params;
    try {
        const currcourse = await newCourse.findById(courseId);
        if (!currcourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(currcourse);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

})

export {getLecture}