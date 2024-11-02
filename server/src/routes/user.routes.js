import { Router } from "express";
import { registerUser, loginUser, test } from "../controllers/user.controller.js";
import courses from "../controllers/course.controller.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", test);
router.get("/stdhome",async(req,res)=>{
    res.json(courses);
});

export default router;
