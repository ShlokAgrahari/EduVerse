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

    const user = await User.findById(userId);
    if(!user){
        throw ApiError(402,"user does not exist");
    }

    if (existingReview) {
        existingReview.rating = Number(rating);
        existingReview.reviews = review;
    }
    else{
        const newreview = {
            name: user.userName,
            rating : Number(rating),
            reviews : review,
            user : userId,
        }
        course.review.push(newreview);
    }
   

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

const getReviews = asyncHandler(async(req,res)=>{
    console.log("getReview function triggered");
    const {courseId} = req.params;
    try {
        const course = await newCourse.findById(courseId).select("review");
        if(!course){
            throw ApiError(404,"course does not exists");
        }
        return res.status(200).json(ApiResponse(200,{review:course.review},"fetched review"));
    } catch (error) {
        console.log(error);
    }
});

export {addReview,addComment,getReviews};