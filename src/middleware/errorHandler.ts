// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import logger from "../logger";

export interface ErrorResponse {
  error: string;
  message: string;
}

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  logger.info("TESTING error");
  logger.error("Unhandled error", err);

  if (err.status) {
    // If the error has a status code (like NotFoundError), use it
    return res.status(err.status).json({ error: err.name, message: err.message });
  }

  // Default to 500 internal server error
  return res.status(500).json({ error: "server_error", message: "An unexpected error occurred" });
};
