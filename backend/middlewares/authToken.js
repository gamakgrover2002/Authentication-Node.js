import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
const authMiddleware = asyncHandler((req, res, next) => {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded.data.username;
        next();
});

export default authMiddleware;
