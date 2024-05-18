import express from "express";
import ChatRouter from "./chat";
import handleRequest from "../helpers/request";

const app = express();

app.use(handleRequest);

app.use("/chat", ChatRouter);

export default app;
