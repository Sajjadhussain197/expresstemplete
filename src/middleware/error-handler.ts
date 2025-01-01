import logger from "@libs/logger";
import type { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.debug("Running for testing");
  logger.error(err.stack); // Log the error stack trace for debugging
  // Set the status code based on the error type
  const statusCode = err instanceof HttpError ? err.statusCode : 500;

  // Send the error response
  return res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;

// Define a custom HttpError class for handling specific status codes
export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
