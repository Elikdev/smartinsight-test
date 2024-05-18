import { Response, Request } from "express";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

const handleResponse = async (
  req: Request,
  res: Response,
  payload: any,
  statusCode: number
) => {
  const ipAddress =
    req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  let responseDataAsString = JSON.stringify(payload);
  logger(module).info(
    `${statusCode} - ${req.method} - ${ipAddress}- ${req.originalUrl} - ${
      statusCode >= 400 ? responseDataAsString : "success"
    }`
  );
  
  res.setHeader("Cache-control", "no-cache");
  res.setHeader("Pragma", "no-store");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  return res.status(statusCode).json({
    data: payload,
    status: statusCode < 400 ? "success" : "error",
  });
};

export default handleResponse;
