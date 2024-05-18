import { Router } from "express";
import ChatController from "../controllers/chat.controller";

const ChatRouter = Router();

ChatRouter.post("/message", ChatController.sendMessage);

export default ChatRouter;
