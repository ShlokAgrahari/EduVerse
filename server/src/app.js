import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.js";
import razorpay from "razorpay"

const app=express();

app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST'], 
    credentials:true,
}))


//middleware
app.use(cookieParser());
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))



import  healthcheckRouter  from "./routes/healthcheck.routes.js";

app.use("/healthcheck",healthcheckRouter)

  
app.use("/signup",router);
app.use("/login",router);
app.use("/logout",router);
app.use("/",router);
app.use("/instructor-dashboard",router)
app.use("/student-dashboard",router);
app.use("/instructor/newcourse",router);
app.use("/coursedetails/:courseId/cart",router);
app.use("/coursedetails/:courseId",router)
app.use("/checkout",router)
app.use("/paymentVerification",router)
app.use("/payment/:paymentId",router)
app.use("/student-dashboard/cart",router)
app.use("/student-dashboard/cart/:courseId",router);
app.use("/my-courses",router);
app.use("/student-dashboard/rating",router);
app.use("/student-dashboard/comment",router);

app.use("/lecture/:courseId",router)

app.use("/payment-verification",router)

app.use("/auth/google",router);

app.use("/dashboard/search",router)
app.use("/student-dashboard/recommend",router);

export default app;