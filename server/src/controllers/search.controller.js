import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import newCourse from "../models/course.js";

const searchCourse = asyncHandler(async(req,res)=>{
    const {query}= req.query;
    try{
        const courses = await newCourse.find();
        const keys = ["title","category"];

        const filteredCourse = courses.filter((course)=>
            keys.some((key)=> course[key].toLowerCase().includes(query))
        )
        res.status(200).json(ApiResponse(200,filteredCourse,"get search courses"));
    }catch(error){
        res.status(500).json({ message: "Failed to fetch courses", error: error.message });
    }
});

export {searchCourse};