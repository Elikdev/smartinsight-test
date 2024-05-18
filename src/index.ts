import express, { NextFunction, Request, Response } from "express";
import config from "./config/config";
import cors from "cors";
import rtracer from "cls-rtracer";
import appRoutes from "./routes";
import handleResponse from "./helpers/response";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(rtracer.expressMiddleware());


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(err);
    return handleResponse(
      req,
      res,
      { message: "An error occurred, try again later" },
      500
    );
  }

  next();
});

app.use("/api", appRoutes);

app.get("/", (req: Request, res: Response) => {
  return handleResponse(
    req,
    res,
    { message: "Welcome to the smartinsight api test server🚀" },
    200
  );
});

app.all("*", (req: Request, res: Response) => {
  return handleResponse(
    req,
    res,
    { message: `Route ${req.originalUrl} not found` },
    404
  );
});

export default app;