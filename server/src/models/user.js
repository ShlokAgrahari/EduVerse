import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required : true,
    },
    userEmail:{
        type: String,
        required : true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    loginType:{
        type: String,
        enums: ["standard","google","facebook","github"],
    },
    role:{
        type: String,
        enums:["student","instructor"],
    },
    token:{
        type: String,
        default: null,
    }
},{
    timestamps:true,
}
);

// module.exports = mongoose.model("user",UserSchema);
const User = mongoose.model("User", UserSchema); // Define the User model

export default User;