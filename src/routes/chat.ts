import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import adminCheck from "../middlewares/admin";

const ChatRouter = Router();

ChatRouter.post("/message", ChatController.sendMessage);

ChatRouter.get("/admin/messages", adminCheck,  ChatController.fetchMessages);
ChatRouter.get("/admin/messages/:id", adminCheck,  ChatController.fetchMessages);
ChatRouter.patch("/admin/messages/:id", adminCheck,  ChatController.fetchMessages);


export default ChatRouter;
