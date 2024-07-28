import { GoogleGenerativeAI } from "@google/generative-ai";

const KEY = import.meta.env.VITE_GEMINI_AI_KEY;

const genAI = new GoogleGenerativeAI(KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export { model, genAI };
