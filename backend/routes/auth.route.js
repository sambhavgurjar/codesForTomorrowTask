import { Router } from "express";
import * as Controller from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import userValidation from "../validation/userValidation.js";

const router = Router();

//user registration route
router.post("/register",validationMiddleware(userValidation), Controller.registerUser);

//user login route

router.post("/login", Controller.loginUser);

//user detail route

router.get("/user-detail",authMiddleware, Controller.getUser);

//forgot password route

router.post("/forgot-password", Controller.forgotpassword);

//reset password route

router.post("/reset-password/:resetToken", Controller.resetPassword);

export default router;

