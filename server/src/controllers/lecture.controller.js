import newCourse from "../models/course.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs'

const addLecture=asyncHandler(async(req,res)=>{
    const {courseId}=req.params;
    const {title}=req.body;
    console.log(courseId)
    console.log(title)

    if(!title){
        throw ApiError(400,"Lecture title is required");
    }

    let video;
    try{
        video=await uploadOnCloudinary(videoFilePath);
        if(!video || !video.url) 
            {
                throw ApiError(500,"Video upload failed")
            }
        fs.unlinkSync(videoFilePath);
    }catch(error)
    {
        console.log("Error occurred",error)
    }
    const course=await newCourse.findById(courseId);
    if(!course){
        throw ApiError(404,"Course not found");
    }

    course.lectures.push(
        {
            title,
            videoUrl:video.url
        }
    )
    course.save();

    return res.status(200).json(ApiResponse(200,course,"Lecture added successfully"));
})

export {addLecture}