import jwt from "jsonwebtoken";

const generateTokenSetCookie = (userId, res) => {
  // console.log(userId);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1D",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in ms
    httpOnly: true, // Prevent JavaScript access to cookies
    secure: false, // Set to true for HTTPS
    // Allow cookies to be sent with cross-origin requests
  });
  // console.log("cookie backed", token);
};

export default generateTokenSetCookie;
