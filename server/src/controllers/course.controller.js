import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import newCourse from "../models/course.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const addCourse = asyncHandler(async (req, res) => {
    const { title, description, pricing, category, level, videoContents } = req.body;
  
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
      for (const [ video] of videoContents.entries()) {
        const videoLocalPath = req.files[videoContents]?.[0]?.path;
        if (!videoLocalPath) throw ApiError(400, 'Video missing');
  
        let videoUpload;
        try {
          videoUpload = await uploadOnCloudinary(videoLocalPath);
          if (!videoUpload || !videoUpload.url) {
            return res.status(500).json(ApiResponse(500, null, 'Video upload failed'));
          }
        } catch (error) {
          console.error("Error uploading video:", error);
          return res.status(500).json(ApiResponse(500, null, "Video upload failed"));
        }
  
        lectures.push({
          title: video.label,
          videoUrl: videoUpload.url,
        });
      }
    }
  
    const newCourse = await newCourseModel.create({
      title,
      category,
      description,
      pricing,
      level,
      createdBy: req.user.id, 
      image: img.url,
      lectures,
    });
  
    res.status(200).json(ApiResponse(200, newCourse, "New course added"));
  });
  


export {addCourse}
