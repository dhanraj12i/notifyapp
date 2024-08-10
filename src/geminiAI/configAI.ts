import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

import { MODEL } from "../componenets/shared/constants";

const KEY = import.meta.env.VITE_GEMINI_AI_KEY;

const genAI = new GoogleGenerativeAI(KEY);

const model = genAI.getGenerativeModel({
  model: MODEL,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
});

export { model, genAI };
