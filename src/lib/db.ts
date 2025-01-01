import mongoose from "mongoose";
import logger from "./logger";
export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    logger.info("Database is connected Successfully:");
  } catch (error) {
    logger.error("Error Occurred while connecting to database", error);
  }
}
