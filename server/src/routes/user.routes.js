import { Router } from "express";
import { registerUser, loginUser, test } from "../controllers/user.controller.js";
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
router.post("/instructor/newcourse",addCourse)
router.post("/student/cart",addCart);
router.get("/user",getUser,getinfo);
router.post("/instructor/newcourse",upload.fields([
    {
        name:"image",
        maxCount:1
    }
]),addCourse)
router.get("/student-dashboard",async(req,res)=>{
    const courses=await newCourse.find()
    res.json(courses)
})
router.get("/coursedetails/:courseId",async(req,res)=>{
    const currcourse=await newCourse.findById(req.params.courseId)
    res.json(currcourse)
})

export default router;
