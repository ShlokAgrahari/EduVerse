import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    studentId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    studentName: { 
        type: String, 
        required: true 
    },
    commentText: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    parentComment: { 
        type: Schema.Types.ObjectId, 
        ref: "Comment", 
        default: null
    },
    childrenComments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment", 
        },
    ],
});

const lectureSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
});

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    studentEmail: {
        type: String,
        required: true,
    }
});

const courseSchema = new mongoose.Schema({
    instructorId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricing: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    lectures: [lectureSchema],
    resources: {
        type: String, 
    },
    previewVideo:{
            type: String,
            required: true,
    },
    image: {
        type: String, 
    },
    students: [studentSchema],
    
});

const newCourse = mongoose.model("Course", courseSchema);
export default newCourse;
