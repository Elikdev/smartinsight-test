import request from "supertest";
import app from "../src";
import ChatService from "../src/services/chat.service";

jest.mock("../src/services/chat.service");

describe("ChatController", () => {
  
  it("should return 200 for health check", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });

  it("should return 404 for invalid route", async () => {
    const response = await request(app).get("/smart");
    expect(response.status).toBe(404);
  });

  describe("POST /api/chat/message", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });


    it("should return 200 and the response with follow-up questions on success", async () => {
      const mockResponse = {
        status: "success",
        message: "Successful.",
        data: {
          response: "Venus is the hottest planet in our solar system.",
          follow_up_questions: [
            { question: "What type of rice is best for making sushi?" },
            { question: "Where can I find nori seaweed sheets?" },
            { question: "What are some popular sushi fillings?" },
            {
              question:
                "Is there a specific technique for rolling sushi tightly?",
            },
          ],
        },
      };

      (ChatService.sendMessage as jest.Mock).mockResolvedValue(mockResponse);

      const res = await request(app)
        .post("/api/chat/message")
        .send({ message: "What planet is the hottest?" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("response");
      expect(res.body).toHaveProperty("follow_up_questions");
      expect(Array.isArray(res.body.follow_up_questions)).toStrictEqual(true);
    });

    it("should return 400 if the ChatService returns a failure response", async () => {
      const mockResponse = {
        status: "failed",
        message: "Request failed, try again later",
        data: null,
      };
      (ChatService.sendMessage as jest.Mock).mockResolvedValue(mockResponse);

      const res = await request(app)
        .post("/api/chat/message")
        .send({ message: "What planet is the hottest?" });

      expect(res.status).toBe(400);
    });

    it("should return 500 if an unexpected error occurs", async () => {
      (ChatService.sendMessage as jest.Mock).mockImplementation(() => {
        throw new Error("Unexpected error");
      });

      const res = await request(app)
        .post("/api/chat/message")
        .send({ message: "What planet is the hottest?" });

      expect(res.status).toBe(500);
      expect(res.body.data.message).toEqual(
        "an unexpected error occurred, try again later"
      );
    });
  });
});
