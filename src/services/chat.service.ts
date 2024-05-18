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
}

export default ChatService;
