import mongoose, { Schema } from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    createdBy:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default:Date.now,
    },
    image :{
        type:String,
    },
    description:{
        type:String,
        required: true,
    },
    pricing :{
        type: Number,
        default : 0, 
    },
    students:[{
        studentId:String,
        studentName : String,
        studentEmail :String,
        paidAmount : Number,
    },]
});

const newCourse = mongoose.model("Course",CourseSchema);
export default newCourse