import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
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
    comments:[commentSchema],
});

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    reviews:{
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

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
    review : [reviewSchema],
    rating : {
        type: Number,
        default: 0,
    },
    students: [studentSchema],
    
});

const newCourse = mongoose.model("Course", courseSchema);
export default newCourse;
