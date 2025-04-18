import { Router } from "express";
import {
  loginUser,
  registerUser,
  getNewTokens,
  logoutUser
} from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authToken.js";

const router = Router();

router.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refreshToken", authMiddleware, getNewTokens);
router.get("/logout", logoutUser);

export default router;
