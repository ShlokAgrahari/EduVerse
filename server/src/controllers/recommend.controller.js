import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.js";
import newCourse from "../models/course.js";

const getRecommendation = asyncHandler(async(req,res) => {
    const userId = req.user._id;
    console.log("getRecommend function triggered");
    try {
        const user = await User.findById(userId).populate({
            path:"subscription.courseId",
            model:"Course",
            select:"title category",
        }).lean();
        // console.log(user.subscription);

        if(!user){
            throw ApiError(400,"user has not been found");
        }
        
        const purchasedCourse = user.subscription.map((sub)=>({
            _id :sub.courseId._id.toString(),
            title: sub.courseId.title,
            category: sub.courseId.category,
        }));

        // console.log(purchasedCourse);

        const allCourse = await newCourse.find().select("_id title category").lean();
        // console.log(allCourse);
        
        const response = await fetch('http://127.0.0.1:5000/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                purchasedCourse: purchasedCourse,
                allCourse: allCourse,
            }),
        });

        const data = await response.json();
        // console.log(data);

        res.status(200).json(ApiResponse(200,data,"got recommended courses for user"));

    } catch (error) {
        console.log(error);
    }
});

export {getRecommendation};