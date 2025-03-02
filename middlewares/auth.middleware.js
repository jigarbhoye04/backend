import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

const authorize = async (req, res, next) => {
   try {
      let token;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
         return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
         });
      }

      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found.",
         });
      }

      req.user = user;

      next();
   } catch (error) {
      let message = "Not authorized to access this route";
      
      // JWT-specific errors
      if (error.name === "TokenExpiredError") {
         message = "Token has expired. Please log in again.";
      } else if (error.name === "JsonWebTokenError") {
         message = "Invalid token. Authentication failed.";
      }

      res.status(401).json({
         success: false,
         message,
      });
   }
};

export default authorize;
