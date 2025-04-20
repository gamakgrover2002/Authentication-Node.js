import { Router } from "express";
import {
  loginUser,
  registerUser,
  getNewTokens,
  logoutUser,
  getUser
} from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authToken.js";

const router = Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refreshToken", authMiddleware, getNewTokens);
router.get("/logout", logoutUser);
router.get("/",authMiddleware,getUser);

export default router;
