const mongoose = require("mongoose");

const RatingReviewSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
    },
    courseId:{
        type:String,
        required: true,
    },
    rating:{
        type:Number,
    },
    review:{
        type:String,
    },
    date:{
        type:Date,
        dafault: Date.now,
    },
},{
    timestamps:true,
});

module.exports = mongoose.model("ratings",RatingReviewSchema);