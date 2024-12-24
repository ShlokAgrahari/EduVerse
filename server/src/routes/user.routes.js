import { Router } from "express";
import { registerUser, loginUser, test, googleLogin } from "../controllers/user.controller.js";
import { addCourse } from "../controllers/course.controller.js";
import { addCart } from "../controllers/cart.controller.js";
import newCourse from "../models/course.js";
import { upload } from "../middlewares/multer.middleware.js";
import { logoutUser } from "../controllers/user.controller.js";
import getUser from "../middlewares/auth.middleware.js";
//import courses from "../controllers/course.controller.js";
import {getinfo} from "../controllers/user.controller.js";
import { checkout,paymentVerification } from "../controllers/payment.controller.js";
import { getLecture } from "../controllers/lecture.controller.js";
import { deleteFromCart, getCartdetail } from "../controllers/getcart.controller.js";


import { getCourses } from "../controllers/instruct.course.controller.js";
import { addComment, addReview } from "../controllers/review.controller.js";
import { searchCourse } from "../controllers/search.controller.js";
import myCourses from "../controllers/getMyCourses.controller.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser);
router.get("/", test);
router.post("/coursedetails/:courseId/cart",getUser,addCart);
router.get("/instructor-dashboard",getUser,getCourses)
router.get("/user",getUser,getinfo);
router.get("/auth/google",googleLogin);
router.get("/my-courses",getUser,myCourses);
router.post("/instructor/newcourse",getUser, upload, addCourse);

router.get("/student-dashboard/cart",getUser,getCartdetail);
router.post("/student-dashboard/cart/:courseId",getUser,deleteFromCart);

router.post("/student-dashboard/rating",getUser,addReview);
router.post("/student-dashboard/comment",getUser,addComment);

router.get("/student-dashboard",async(req,res)=>{
    const courses=await newCourse.find()
    res.json(courses)
})

router.get("/coursedetails/:courseId", async (req, res) => {
    try {
        const currcourse = await newCourse.findById(req.params.courseId);
        if (!currcourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(currcourse);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/lecture/:courseId",getLecture)


router.get("/dashboard/search",searchCourse)



router.post("/checkout", checkout);
router.post("/payment-verification",getUser,paymentVerification)


//router.get("/stdhome",async(req,res)=>{
//    res.json(courses);
//});


export default router;
