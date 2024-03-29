import authRoutes from "./routes/auth.routes.js";
import keepAlive from "./utils/keepAlive.js";
import mongoose from "mongoose";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";

/* CONFIGURATIONS */
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
dotenv.config();

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});
const upload = multer({ storage });

/* ROUTES W/ FILES */
app.post("/");

/* ROUTES */
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(
      PORT,
      () => console.log(`Server works on port - ${PORT}`),
      setInterval(keepAlive, 30000)
    )
  )
  .catch((err) => console.log(err));
