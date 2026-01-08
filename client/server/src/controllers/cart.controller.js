import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import CartDetail from "../models/cart.js";
import newCourse from "../models/course.js";
import User from "../models/user.js";

const addCart = asyncHandler(async(req,res)=>{
    console.log("add to cart");
    const userId = req.user._id;
    console.log(req.body);
    const {courseId} = req.body;
    console.log(req.body);
    if(!(userId && courseId)){
        throw ApiError(400,"all fields are required");
    }
    console.log("check")
    const courseDetail = await newCourse.findOne({_id:courseId})
    if(!courseDetail){
        throw ApiError(409,"course does not exist");
    }
    console.log(courseDetail)

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.cart.push({
        courseId: courseId,
        price: courseDetail.pricing,
        imageUrl: courseDetail.image,
        title: courseDetail.title,
    });
    
    await user.save();

    res.status(200).json(ApiResponse(200,{cart:user.cart},"cart created"));
});

export {addCart};