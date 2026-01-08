/*import {app,server} from "./utils/socket.js"
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
    server.listen(PORT,()=>{
        console.log(`Hello from port ${PORT}`)
    })
}).catch((err)=>{
    console.log("MongoDB connection error")
})*/

// index.js
import { server } from "./utils/socket.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import Razorpay from "razorpay";
import "./app.js";  // Import to configure routes

dotenv.config({
    path: "./.env"
});

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PORT = process.env.PORT || 7000;

connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });