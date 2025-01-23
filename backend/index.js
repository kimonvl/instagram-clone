import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.router.js";
import postRouter from "./routes/post.router.js";
import path from "path";
import { app, server } from "./socket/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

// 1) Serve static files from "public" folder
//    __dirname might not be defined if you're using ES modules, so adjust accordingly:
import { fileURLToPath } from "url";
import messageRouter from "./routes/message.router.js";
import notificationRouter from "./routes/notification.router.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve "public" statically
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/notification", notificationRouter);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})