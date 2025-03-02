import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnections.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js"; // Corrected import

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    tempFileDir: "/tmp",
    useTempFiles: true,
  })
);

app.use("/api/v1/user", userRouter); // Corrected router variable
app.use("/api/v1/task", taskRouter);

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
