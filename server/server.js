import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authUser from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import connectToDB from "./db/connectToDB.js";

const __dirname = path.resolve();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authUser);
app.use("/api/dashboard", dashboardRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});
