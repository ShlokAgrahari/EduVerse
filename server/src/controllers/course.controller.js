import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import newCourse from "../models/course.js";
import User from "../models/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const addCourse = asyncHandler(async (req, res) => {
  console.log(req)
    const { title, description, pricing, category, level} = req.body;
    const videoContents=req.files?.videoContents;
    console.log(videoContents)
    if (!(title && category && description && pricing)) {
      throw ApiError(400, "All fields are required");
    }
  
    const imgLocalPath = req.files?.image?.[0]?.path;
    if (!imgLocalPath) throw ApiError(400, "Image file missing");
  
    let img;
    try {
      img = await uploadOnCloudinary(imgLocalPath);
      if (!img || !img.url) {
        return res.status(500).json(ApiResponse(500, null, "Image upload failed: no URL returned"));
      }
    } catch (error) {
      return res.status(500).json(ApiResponse(500, null, "Image upload failed"));
    }
  
    const lectures = [];
    if (Array.isArray(videoContents)) {
      for (let index = 0; index < videoContents.length; index++) {
        const videoFile = videoContents[index];
        const videoLocalPath = videoFile.path;
        if (!videoLocalPath) throw ApiError(400, 'Video missing');
    
        let videoUpload;
        try {
          videoUpload = await uploadOnCloudinary(videoLocalPath);
          if (!videoUpload || !videoUpload.url) {
            return res.status(500).json(ApiResponse(500, null, 'Video upload failed'));
          }
        } catch (error) {
          console.log("Error uploading video:", error);
          return res.status(500).json(ApiResponse(500, null, "Video upload failed"));
        }
    
        lectures.push({
          label: req.body.videoContents[index], 
          videoUrl: videoUpload.url,
        });
      }
    }
    const instructorId=req.user._id
    console.log(instructorId)
    
    const user = await User.findById(instructorId);
  if (!user) {
    throw ApiError(404, "Instructor not found");
  }

    const newCourseData = await newCourse.create({
      instructorId,
      title,
      category,
      description,
      pricing,
      level,
      createdBy: user.userName, 
      image: img.url,
      lectures,
    });
  
    res.status(200).json(ApiResponse(200, newCourseData, "New course added"));
  });
  


export {addCourse}
