const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
    },
    courseId:{
        type:String,
        required: true,
    },
    amount:{
        type:mongoose.Types.Decimal128,
    },
    status:{
        type:String,
        enums:["pending","failed","success"],
    }
});

module.exports = mongoose.model("payment",PaymentSchema);