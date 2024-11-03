import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    courseId:{
        type: String,
        required: true,
    },
    videoURL:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    title:{
        type: String,
        required: true,
    }
});

export default mongoose.model("Lecture",lectureSchema);