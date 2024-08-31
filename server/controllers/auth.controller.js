import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, password, confirmPassword, role } = req.body;
    if (!username || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Pasword need to be same" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    //generateTokenSetCookie(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both username and password" });
    }
    console.log({ username, password });

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenSetCookie(user._id, res);
    req.user = user;
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
