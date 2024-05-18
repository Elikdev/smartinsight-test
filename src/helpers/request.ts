import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "../utils/logger";
import handleResponse from "./response";

dotenv.config();

const handleRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestBody = { ...req.body, ...req.query };
    if (requestBody.password) delete requestBody.password;
    if (requestBody.confirmPassword) delete requestBody.confirmPassword;

    logger(module).info(
      `${req.method} - ${req.ip}- ${req.originalUrl} - ${JSON.stringify(
        requestBody
      )}`
    );

    return next();
  } catch (error: any) {
    return handleResponse(req, res, { error: error.message }, 500);
  }
};

export default handleRequest;
