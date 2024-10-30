const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    videoURL:{
        type: String,
        required: true,
    },
    instructorId:{
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
        paidAmount : String,
    },]
});

module.exports = mongoose.model("course",CourseSchema);