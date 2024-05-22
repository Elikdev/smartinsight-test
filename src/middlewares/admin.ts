///

import { NextFunction, Request, Response } from "express"
import handleResponse from "../helpers/response"

const adminCheck = (req: Request, res:Response, next: NextFunction) => {
try {
 const headers = req.headers

 if(!headers["api-key"]) {
  return handleResponse(req, res, {message: "Missing headers"}, 401)
 }

 if(headers["api-key"] !== process.env.API_KEY) {
  return handleResponse(req, res, {message: "Unauthorized, invalid api key"}, 401)
 }

 return next()
} catch (error) {
 return handleResponse(req, res, {message: 'failed to validate data'}, 500)
}
}
export default adminCheck