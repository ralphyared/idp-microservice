import express from "express";
import { signup, login, viewProfile, editProfile } from "./user.controller.js";
import { isAuthenticated } from "./auth.middleware.js";
import { validate } from "../global/utils.js";
import {
  editProfileSchema,
  loginSchema,
  signupSchema,
} from "./user.validation.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);

router.post("/login", validate(loginSchema), login);

router.post("/auth", isAuthenticated);

router.get("/profile", isAuthenticated, viewProfile);

router.put(
  "/profile/edit",
  isAuthenticated,
  validate(editProfileSchema),
  editProfile
);

export default router;
