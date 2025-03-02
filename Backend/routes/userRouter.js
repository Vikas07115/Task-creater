import express from "express";
import {
    login,
    logout,
    myProfile,
    register,
} from "../controller/userController.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/me", myProfile);
router.post("/register", register);

export default router;