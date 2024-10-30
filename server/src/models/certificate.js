const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
    userId :{
        type: String,
        required: true,
    },
    courseId:{
        type: String,
    },
    issuedDate:{
        type:String,
    },
});

module.exports = mongoose.model("certificate",CertificateSchema);