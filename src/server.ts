import "@utils/env";
import { connectDB } from "@libs/db";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandle from "@middleware/error-handler";
import logger from "@libs/logger";
import MAIN_ROUTER from "@v1/routes";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { socketHandler } from "@libs/socket";
import path from "node:path";

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// Socket.io handler

socketHandler(io);

// Database connection
connectDB();

// Middleware

// app.use(
//   helmet({
//     crossOriginResourcePolicy: {
//       policy: "cross-origin",
//     },
//   }),
// );
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'data' folder
app.use("/api/v1/data", express.static(path.join(__dirname, "../data")));

// API routes
app.use("/api/v1", MAIN_ROUTER);
// Error handler middleware
app.use(errorHandle);

// Start the server
server.listen(process.env.PORT_NO, () => {
  logger.info(`Server started on port :${process.env.PORT_NO}`);
});
