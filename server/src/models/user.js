import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
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
    loginType: {
        type: String,
        enum: ["standard", "google", "facebook", "github"],
        default: "standard",
    },
    role: {
        type: String,
        enum: ["student", "instructor"],
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
