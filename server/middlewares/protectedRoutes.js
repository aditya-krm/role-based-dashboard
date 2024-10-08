import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  // console.log("Cookies:", req.cookies);
  // console.log("JWT", req.cookies.jwt);
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized! 1" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};
