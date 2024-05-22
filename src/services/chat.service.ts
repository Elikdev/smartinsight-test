import Message from "../model/message.model";
import logger from "../utils/logger";
import OpenAIService from "../utils/services/open-ai";

interface ServiceResponseInterface<T = undefined> {
  status: "success" | "failed";
  message: string;
  data?: T;
}

class ChatService {
  static async sendMessage(payload: { message: string }): Promise<
    ServiceResponseInterface<{
      response: string;
      follow_up_questions: string[];
    }>
  > {
    try {
      const { message } = payload;
      const openAIServiceResponse =
        await OpenAIService.getResponseAndFollowUpQuestions(message);

      if (!openAIServiceResponse.status || !openAIServiceResponse.data) {
        return {
          status: "failed",
          message:
            openAIServiceResponse.message || "Request failed, try again later",
        };
      }

      let generatedResponse = openAIServiceResponse.data?.response;

      let generatedFollowUpQuestions =
        openAIServiceResponse.data?.followUpQuestionsInArray;
      let follow_up_questions = [];
      if (generatedFollowUpQuestions) {
        follow_up_questions = generatedFollowUpQuestions.map(
          (question: string) => {
            return { question };
          }
        );
      }

      //save the message  and response to the db
      this.createMessage({
        response: generatedResponse.replace(/<[^>]*>/g, "").trim(),
        prompt: message,
        followUpQuestions: follow_up_questions,
      });

      return {
        status: "success",
        message: "Successful.",
        data: {
          response: generatedResponse.replace(/<[^>]*>/g, "").trim(),
          follow_up_questions,
        },
      };
    } catch (error: any) {
      console.error(error);
      logger(module).error(
        JSON.stringify({ message: error?.message, stack: error?.stack })
      );
      return {
        status: "failed",
        message: "An error occurred",
      };
    }
  }

  static async createMessage(payload: {
    prompt: string;
    response: string;
    followUpQuestions: string[];
  }) {
    try {
      //save the message to the db
      const { prompt, response, followUpQuestions } = payload;

      const newMessage = await Message.create({
        prompt,
        response,
        followUpQuestions,
      });

      return {
        status: true,
        message: "message saved successfully",
      };
    } catch (error) {
      console.log(error);
      return { status: false, message: "failed to save new message" };
    }
  }

  static async fetchMessages(payload: {
    message: string;
  }): Promise<ServiceResponseInterface<{}>> {
    try {
      const messages = await Message.findAll({ where: {} });

      return {
        status: "success",
        message: "Successful.",
        data: { messages },
      };
    } catch (error: any) {
      console.error(error);
      logger(module).error(
        JSON.stringify({ message: error?.message, stack: error?.stack })
      );
      return {
        status: "failed",
        message: "An error occurred",
      };
    }
  }

  static async fetchSingleMessage(payload: {
    id: string;
  }): Promise<ServiceResponseInterface<{}>> {
    try {
      const { id } = payload;

      const message = await Message.findOne({ where: { id } });

      if (!message) {
        return {
          status: "failed",
          message: "Message does not exist",
        };
      }

      return {
        status: "success",
        message: "Successful.",
        data: { message },
      };
    } catch (error: any) {
      console.error(error);
      logger(module).error(
        JSON.stringify({ message: error?.message, stack: error?.stack })
      );
      return {
        status: "failed",
        message: "An error occurred",
      };
    }
  }

  static async updateSingleMessage(payload: {
    id: string;
    response: string;
  }): Promise<ServiceResponseInterface<{}>> {
    try {
      const { id, response } = payload;

      const message = await Message.findOne({ where: { id } });

      if (!message) {
        return {
          status: "failed",
          message: "Message does not exist",
        };
      }

      await Message.update({ response }, { where: { id: Number(id) } });

      return {
        status: "success",
        message: "Successful.",
        data: { message },
      };
    } catch (error: any) {
      console.error(error);
      logger(module).error(
        JSON.stringify({ message: error?.message, stack: error?.stack })
      );
      return {
        status: "failed",
        message: "An error occurred",
      };
    }
  }
}

export default ChatService;
