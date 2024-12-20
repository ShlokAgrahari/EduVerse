import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import newCourse from "../models/course.js";
import User from "../models/user.js";


const addReview = asyncHandler(async(req,res)=>{
    console.log("addReview function triggered");
    const userId = req.user._id;
    console.log(req.body);
    const {courseId,rating,review} = req.body;
    if(!(userId && courseId)){
        throw ApiError(400,"all fields are required");
    }

    const course = await newCourse.findById(courseId);

   
    const existingReview = course.review.find(
        (r) => r.user.toString() === userId.toString()
    );

    if (existingReview) {
        throw ApiError(409, "User already reviewed this course");
    }

    const user = await User.findById(userId);
    if(!user){
        throw ApiError(402,"user does not exist");
    }

    const newreview = {
        name: user.userName,
        rating : Number(rating),
        reviews : review,
        user : userId,
    }

    course.review.push(newreview);
   

    course.rating = course.review.reduce((sum,item)=> sum + item.rating,0)/course.review.length;

    await course.save();
    res.status(200).json(ApiResponse(200,{review:course.review},"review added"));

});


const addComment = asyncHandler(async(req,res)=>{
    console.log("addComment function triggered");
    const userId = req.user._id;
    
    const {courseId,comment,lectureId} = req.body;

    const course = await newCourse.findById(courseId);
    if(!course){
        throw ApiError(400,"course does not exist");
    }

    const lecture = course.lectures.find(lecture => lecture._id.toString() === lectureId);
    if(!lecture){
        throw ApiError(400,"lecture does not found");
    }

    const user = await User.findById(userId);

    const commentdata = {
        name: user.userName,
        comment : comment,
        user: userId,
    }
    lecture.comments.push(commentdata);
    await course.save();
    res.status(200).json(ApiResponse(200,{comment:lecture.comments},"comment added"));

});

export {addReview,addComment};