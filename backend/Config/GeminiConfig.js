import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Exporting a function allows us to pass dynamic instructions
export const getAiModel = (doctorContext) => {
    return genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        // System instructions define the AI's personality and knowledge
        systemInstruction: {
            role: "system",
            parts: [{ 
                text: `You are a professional hospital receptionist. 
                Answer questions ONLY using this doctor list: ${doctorContext}. 
                If the info is missing, tell them to contact the front desk. 
                Be polite and concise.` 
            }]
        }
    });
};