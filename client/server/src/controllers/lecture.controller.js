import newCourse from "../models/course.js";
import User from "../models/user.js";
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


const completeLecture = asyncHandler(async(req,res)=>{
    const {courseId} = req.params;
    const userId = req.user._id;
    const {lectureId} = req.body;
    console.log("completeLecture function is triggered");
    try {
        const user = await User.findById(userId);
        if(!user){
            throw ApiError(401,"user does not found");
        }
        const course = user.subscription.find((sub)=>sub.courseId.toString() === courseId);
        if(!course){
            throw ApiError(401,"course does not found");
        }
        const lecture = course.allecture.find((lec)=>lec.lectureId.toString() === lectureId);
        if(!lecture){
            throw ApiError(402,"lecture does not found");
        }

        lecture.complete = !lecture.complete;
        user.save();
        res.status(202).json({message:"lecture marked as completed "});
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
})



const isComplete = asyncHandler(async(req,res)=>{
    const {courseId} = req.params;
    const userId = req.user._id;
    console.log("iscomplete functions is triggered");
    try {
        const user = await User.findById(userId);
        if(!user){
            throw ApiError(401,"user does not found");
        }
        const course = user.subscription.find((sub)=>sub.courseId.toString() === courseId);
        if(!course){
            throw ApiError(401,"course does not found");
        }
        const completedLectures = course.allecture.filter(lecture => lecture.complete);
        res.status(200).json(ApiResponse(200,completedLectures,"fetched completed lectures"));
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
})

export {getLecture,completeLecture,isComplete};