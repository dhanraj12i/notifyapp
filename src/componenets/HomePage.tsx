import { useState } from "react";
import { model } from "../geminiAI/configAI";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [aiResponse, setResponse] = useState("");

  const aiRun = async () => {
    const prompt = `jokes on ashish who is my brother make it short and funny`;
    const prompt1 = `cute notification to remind for drinking water please make it short quick read`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
  };

  return (
    <>
      <div>{search}</div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={aiRun}>search</button>
      <div>output:-</div>
      <div>{aiResponse}</div>
    </>
  );
};
