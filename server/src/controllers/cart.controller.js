import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import CartDetail from "../models/cart.js";
import newCourse from "../models/course.js";


const addCart = asyncHandler(async(req,res)=>{
    console.log("add to cart");
    const {userId,courseId} = req.body;
    console.log(req.body);
    if(!(userId && courseId)){
        throw ApiError(400,"all fields are required");
    }

    const courseDetail = await newCourse.findOne({_id:courseId})
    if(!courseDetail){
        throw ApiError(409,"course does not exist");
    }

    const newCart = await CartDetail.create({
        userId: userId,
        courseId: courseId,
        price: courseDetail.pricing,
        imageUrl: courseDetail.image,
        title: courseDetail.title,
    });

    res.status(200).json(ApiResponse(200,{newCart},"cart created"));
});

export {addCart};