import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema({
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

const SubscriptionSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    courseName:{
        type:String,
        required:true,
    },
    subscriptionDate: {
        type: Date,
        default: Date.now,
    },
});

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    phone:{
        type:String,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["student", "instructor"],
    },
    loginType: {
        type: String,
        enum: ["standard", "google", "facebook", "github"],
        default: "standard",
    },
    subscription: [SubscriptionSchema],
    cart:[CartSchema],
    token: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
});

// Define and export the User model
const User = mongoose.model("User", UserSchema);
export default User;
