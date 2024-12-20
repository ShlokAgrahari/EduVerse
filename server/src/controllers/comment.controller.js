import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import newCourse from "../models/course.js";
import User from "../models/user.js";

const addComment=asyncHandler(async(req,res)=>{
    console.log(req.params);
    console.log(req.body);
    console.log(req.user);

    const { courseId, lectureId } = req.params;
    const { commentText } = req.body;
    const { _id: studentId, name: studentName } = req.user;
    
    try {
        const course = await newCourse.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const lecture = course.lectures.id(lectureId);
        if (!lecture) return res.status(404).json({ message: "Lecture not found" });

        lecture.comments.push({ 
            studentId:studentId, 
            studentName:studentName, 
            commentText:commentText });
        await course.save();

        res.status(201).json({ message: "Comment added successfully"});
    } catch (error) {
        throw ApiError(400, "Error adding a comment");
    }
})

const deleteComment=asyncHandler(async(req,res)=>{
    const { courseId, lectureId,commentId } = req.params;
    const { _id: studentId, name: studentName } = req.user;

    const course = await newCourse.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const lecture = course.lectures.id(lectureId);
        if (!lecture) return res.status(404).json({ message: "Lecture not found" });

        lecture.comments.pull({ _id: commentId, studentId: studentId });
        
        await course.save();
        if(commentDelete){
           return res.status(201).json({ message: "Comment deleted successfully", });
        }
        else{
            return res.status(500).json({ message: "Failed to delete comment", error: error.message });
        }
})

const getComment=asyncHandler(async(req,res)=>{
    const { courseId, lectureId } = req.params;

    try {
        const course = await newCourse.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const lecture = course.lectures.id(lectureId);
        if (!lecture) return res.status(404).json({ message: "Lecture not found" });

        res.status(200).json(ApiResponse(200,lecture.comments,"got comments"));
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch comments", error: error.message });
    }
})