import { Router } from "express";
import { registerUser, loginUser, test } from "../controllers/user.controller.js";
import { addCourse } from "../controllers/course.controller.js";
import newCourse from "../models/course.js";
//import courses from "../controllers/course.controller.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", test);
router.post("/instructor/newcourse",addCourse)
router.get("/student-dashboard",async(req,res)=>{
    const courses=await newCourse.find()
    res.json(courses)
})
router.get("/courses/:courseId",async(req,res)=>{
    const currcourse=await newCourse.findById(req.params.courseId)
    res.json(currcourse)
})
//router.get("/stdhome",async(req,res)=>{
//    res.json(courses);
//});

export default router;
