import mongoose from "mongoose";

const lectureAISchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  lectureIndex: {
    type: Number,
    required: true,
  },
  transcript: String,
  notes: String,
  status: {
    type: String,
    enum: ["pending", "processing", "done", "error"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("LectureAI", lectureAISchema);
