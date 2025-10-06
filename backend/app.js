import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import authRoute from "./routes/auth.route.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

//routes middleware
app.use("/api/v1/auth", authRoute);


//error handler middleware
app.use((err, req, res, next) => {
  console.log(err);

  let msg = err?.message || "Internal Server Error";
  let statusCode = err?.statusCode || 500;

  res.status(statusCode).json({
    succes: false,
    message: msg,
    data: null,
  });
});

export default app;
