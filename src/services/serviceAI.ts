import { model } from "../geminiAI/configAI";

const aiRun = async () => {
  const prompt = `cute notification to remind for drinking water please make it really short simple sentence witty for your girlfriend`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export { aiRun };
