import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import Razorpay from "razorpay";
dotenv.config({
    path:"./.env"
})

export const instance=new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const PORT=process.env.PORT||7000;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Hello from port ${PORT}`)
    })
}).catch((err)=>{
    console.log("MongoDB connection error")
})