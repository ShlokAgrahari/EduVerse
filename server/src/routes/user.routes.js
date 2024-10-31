import { Router } from "express";
import { registerUser, loginUser, test } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", test);

export default router;
