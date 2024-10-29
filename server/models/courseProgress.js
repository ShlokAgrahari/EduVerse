const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema({
    lectureId :{
        type:String,
    },
    viewed:{
        type:Boolean,
        default:false,
    }
});

const CourseProgressSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    courseId:{
        type:String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    completionDate:{
        type: Date,
    },
    lectureProgress:[LectureProgressSchema],
});

module.exports = mongoose.model("courseProgress",CourseProgressSchema);