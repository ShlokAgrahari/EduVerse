import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.js";
import newCourse from "../models/course.js";

const myCourses=asyncHandler(async(req,res)=>{

    try {
        console.log('req.user:', req.user); // Log to check if user is populated
        if (!req.user) {
            return res.status(400).json({ message: 'User not authenticated' });
        }
        console.log("my courses function triggered");
        const userId=req.user._id;
        const user=await User.findById(userId).select("subscription");
        console.log("These are my courses",user);
        const courseIds = user.subscription.map(sub => sub.courseId);
        const courses = await newCourse.find({
            _id: { $in: courseIds }
        }).select("title description pricing image createdBy lectures category level previewVideo");
        console.log("these are the courses",courses);
        // Send the response with the courses
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

})

export default myCourses;