import express from "express";
import { signup, login, viewProfile, editProfile } from "./user.controller.js";
import { isAuthenticated } from "./auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/auth", isAuthenticated);

router.get("/profile", isAuthenticated, viewProfile);

router.put("/profile/edit", isAuthenticated, editProfile);

export default router;
