import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
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
        default:"standard"
    },
    role:{
        type: String,
        enum:["student","instructor"],
    },
},{
    timestamps:true,
}
);

export const User = mongoose.model("User", UserSchema);