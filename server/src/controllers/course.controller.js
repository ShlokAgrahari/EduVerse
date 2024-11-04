import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import newCourse from "../models/course.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const addCourse=asyncHandler(async(req,res)=>{
    console.log("Create new course function triggered");
    const {title,createdBy,category,description,pricing}=req.body
    console.log(req.body)
    if(!(title && createdBy && category && description && pricing)){
        throw ApiError(400,"All fields are required")
    }

    const imgLocalPath=req.files?.image?.[0]?.path;

    if(!imgLocalPath) throw ApiError(400,"Image file missing")

        let img;
        try {
            img = await uploadOnCloudinary(imgLocalPath);
            if (!img || !img.url) {
                return res.status(500).json(ApiResponse(500, null, "Image upload failed: no URL returned"));
            }
        } catch (error) {
            return res.status(500).json(ApiResponse(500, null, "Image upload failed"));
        }
        

    const newcourse=await newCourse.create({
        title,
        createdBy,
        category,
        image:img.url,
        description,
        pricing
    })
    console.log(newcourse)
    return res.status(200).json(ApiResponse(200,createdBy,"New course added"));
})


export {addCourse}
