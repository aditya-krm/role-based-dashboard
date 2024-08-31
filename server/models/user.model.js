import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: [true, "Username already exists"],
      trim: [true, "Please enter a valid username without spaces"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      required: [true, "Please enter a role"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
