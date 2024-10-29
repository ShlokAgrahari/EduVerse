const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    courseId:{
        type:String,
        required: true,
    },
    totalAmount:{
        type:Number,
        default:0,
    },
});

module.exports = mongoose.model("cart",CartSchema);