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

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser);
router.get("/", test);
router.post("/coursedetails/:courseId/cart",getUser,addCart);

router.get("/user",getUser,getinfo);
router.get("/auth/google",googleLogin);

router.post("/instructor/newcourse",getUser, upload, addCourse);



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
//router.get("/stdhome",async(req,res)=>{
//    res.json(courses);
//});


export default router;
