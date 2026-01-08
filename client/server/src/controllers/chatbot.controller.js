import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatbotController = asyncHandler(async (req, res) => {
    console.log("Chatbot controller accessed");
    const {userMessage,chatHistory} = req.body;
    
    const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});
    const result = await model.startChat({
        history:chatHistory
    });

    try {
        const resp = await result.sendMessage([{ 
            text: userMessage, 
        }]);

        const aiResponseText = resp.response.text();

        const newModelMessage = {
            role: "model",
            parts: [{ text: aiResponseText }]
        };

        res.status(200).json(ApiResponse(200, { modelResponse: newModelMessage }, "connected with ai"));

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json(
            ApiResponse(500, null, "Failed to connect with AI.")
        );
    }
});

export { chatbotController };
