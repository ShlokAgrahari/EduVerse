import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required:true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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
