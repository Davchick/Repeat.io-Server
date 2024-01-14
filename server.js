import mongoose from "mongoose";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

/* CONFIGURATIONS */
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
dotenv.config();

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server works on port - ${PORT}`))
  )
  .catch((err) => console.log(err));
