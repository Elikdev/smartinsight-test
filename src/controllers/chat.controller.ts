import { Request, Response } from "express";
import handleResponse from "../helpers/response";
import ChatService from "../services/chat.service";

class ChatController {
  static async sendMessage(req: Request, res: Response) {
    try {
      const response = await ChatService.sendMessage(req.body);

      const { status, data, message } = response;

      if (status == "success" && data) {
        return res.status(200).json({
          response: data?.response,
          follow_up_questions: data?.follow_up_questions,
        });
      }

      return handleResponse(
        req,
        res,
        { message: message, data },
        status == "success" ? 200 : 400
      );
    } catch (error: any) {
      console.log(error);
      return handleResponse(
        req,
        res,
        { message: "an unexpected error occurred, try again later" },
        500
      );
    }
  }

  static async fetchMessages(req: Request, res: Response) {
    try {
      const response = await ChatService.fetchMessages(req.query);

      const { status, data, message } = response;


      return handleResponse(
        req,
        res,
        { message: message, data },
        status == "success" ? 200 : 400
      );
    } catch (error: any) {
      console.log(error);
      return handleResponse(
        req,
        res,
        { message: "an unexpected error occurred, try again later" },
        500
      );
    }
  }

  static async fetchSingleMessage(req: Request, res: Response) {
    try {
      const response = await ChatService.fetchSingleMessage({
        id: req.params.id,
      });

      const { status, data, message } = response;


      return handleResponse(
        req,
        res,
        { message: message, data },
        status == "success" ? 200 : 400
      );
    } catch (error: any) {
      console.log(error);
      return handleResponse(
        req,
        res,
        { message: "an unexpected error occurred, try again later" },
        500
      );
    }
  }

  static async updateSingleMessage(req: Request, res: Response) {
    try {
      const response = await ChatService.updateSingleMessage({
        id: req.params.id,
        response: req.body.response,
      });

      const { status, data, message } = response;


      return handleResponse(
        req,
        res,
        { message: message, data },
        status == "success" ? 200 : 400
      );
    } catch (error: any) {
      console.log(error);
      return handleResponse(
        req,
        res,
        { message: "an unexpected error occurred, try again later" },
        500
      );
    }
  }
}

export default ChatController;
