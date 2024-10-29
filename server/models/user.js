const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("user",UserSchema);