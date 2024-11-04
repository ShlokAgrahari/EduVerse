import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    price:{
        type: Number,
        default: 0,
    },
    imageUrl:{
        type: String,
    },
    title:{
        type: String,
        required : true,
    },
});

const CartDetail= mongoose.model("Cart",CartSchema);
export default CartDetail;