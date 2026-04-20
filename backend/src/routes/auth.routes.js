import { Router } from "express";

import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/auth.validator.js";

import {
  googleAuthCallback,
  login,
  register,
} from "../controllers/auth.controller.js";

import passport from "passport";
import { config } from "../config/config.js";
const authRouter = Router();


//* Local Authentication routes */ 
authRouter.post("/register", validateRegisterUser, register);
authRouter.post("/login", validateLoginUser, login);


//* Google OAuth routes */ 

// Route to initiate Google OAuth authentication
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback route for Google OAuth
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.NODE_ENV === "production"
        ? "/login"
        : "http://localhost:5173/login",
  }),
  googleAuthCallback,
);

export default authRouter;
