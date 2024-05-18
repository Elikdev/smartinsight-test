import axios from "axios";
import config from "../../config/config";
import logger from "../logger";

const { OPEN_AI_SECRET_KEY, OPEN_AI_BASE_URL, OPEN_AI_MODEL } = config;

interface OpenAIServiceResponseInterface {
  status: boolean;
  message: string;
  data?: any;
}

class OpenAIService {
  static getConfig = () => {
    if (!OPEN_AI_SECRET_KEY || !OPEN_AI_BASE_URL || !OPEN_AI_MODEL) {
      return false;
    }
    return {
      headers: {
        Authorization: `Bearer ${OPEN_AI_SECRET_KEY}`,
        "Content-Type": `application/json`,
      },
    };
  };

  private static splitTextUsingFollowUpQuestions = (
    input: string
  ): { response: string; followUpQuestions: string } => {
    const regex = /FOLLOW_UP_QUESTIONS/;
    const [response, followUpQuestions] = input.split(regex);
    return {
      response: response.trim(),
      followUpQuestions: followUpQuestions ? followUpQuestions.trim() : "",
    };
  };

  private static splitFollowUpQuestions = (
    input: string
  ): { followUpQuestionsInArray: string[] } => {
    const regex = `\n`;
    const questions = input.split(regex);
    const questionsTrim = questions.map((question) => question.trim());
    const removeEmptyQuestions = questionsTrim.filter(
      (question) => question.length > 0
    );

    return { followUpQuestionsInArray: removeEmptyQuestions };
  };

  static getResponseAndFollowUpQuestions = async (
    message: string
  ): Promise<OpenAIServiceResponseInterface> => {
    try {
      const config = this.getConfig();

      if (!config)
        return {
          status: false,
          message: "Request failed due to incomplete configuration parameters",
        };
      const url = `${OPEN_AI_BASE_URL}/chat/completions`;

      logger(module).info(
        `[OPEN_AI_REQUEST]: making an external http request to url -> ${url}`
      );

      const modifiedPrompt = `<${message}> Generate a response for the message specified in the angular brackets and given the context of the message and the response, generate four (4) follow-up questions.
      Make sure the follow-up questions have a heading as "FOLLOW_UP_QUESTIONS" and each question starts on a new line.`;

      const requestPayload = {
        model: OPEN_AI_MODEL,
        messages: [{ role: "user", content: modifiedPrompt }],
        // response_format: { "type": "json_object" }
      };

      logger(module).info(
        `[OPEN_AI_REQUEST]: request payload sent -> ${JSON.stringify(
          requestPayload
        )}`
      );
      const response = await axios.post(url, requestPayload, config);

      logger(module).info(
        `[OPEN_AI_REQUEST]: response received -> ${JSON.stringify(
          response?.data
        )}`
      );

      const generatedResponse = response.data?.choices[0]?.message?.content;

      if (!generatedResponse) {
        return {
          status: false,
          message:
            "Response could not be generated at this moment, try again later!",
        };
      }

      const { response: content, followUpQuestions } =
        this.splitTextUsingFollowUpQuestions(generatedResponse);

      const { followUpQuestionsInArray } =
        this.splitFollowUpQuestions(followUpQuestions);

      return {
        status: true,
        message: "Request successful",
        data: { response: content, followUpQuestionsInArray },
      };
    } catch (error: any) {
      let errMessage = error?.response
        ? error?.response?.data
          ? JSON.stringify(error?.response?.data || {})
          : "Request failed from http request to OpenAI"
        : error?.message;
      logger(module).error(
        `[OPEN_AI_REQUEST]: failed to get response due to -> ${errMessage}`
      );
      return {
        status: false,
        message: "Request failed, try again later",
      };
    }
  };
}

export default OpenAIService;
