import { GoogleGenAI } from "@google/genai";

let genai;

export const getGenAIClient = () => {
  if (!genai) {
    genai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  return genai;
};

export const analyzeContent = async (text) => {
  try {
    if (!text || text.trim() === "") {
      return { error: "Text is required" };
    }

    const client = getGenAIClient();

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a social media content analyzer.
Analyze the following text and return JSON ONLY (no markdown, no explanations).
The JSON must have this structure:

{
  "sentiment": "positive | negative | neutral",
  "sentimentScore": number (0-1),
  "tone": "casual | formal | humorous | angry | etc.",
  "toneScore": number (0-1),
  "tones": {
    "casual": number (0-1),
    "formal": number (0-1),
    "humorous": number (0-1),
    "angry": number (0-1),
    "neutral": number (0-1)
  },
  "keywords": ["keyword1", "keyword2", ...],
  "summary": "short summary of the text"
}

Text to analyze:
${text}`,
      maxOutputTokens: 500,
    });

    // Gemini may return outputs as an array
    let rawText = "";

    if (response?.outputs && response.outputs.length > 0) {
      rawText = response.outputs.map(o => o.content?.[0]?.text || "").join("\n").trim();
    } else if (response?.text) {
      rawText = response.text.trim();
    }

    if (!rawText) {
      return { error: "No response from AI" };
    }

    // Remove ```json wrappers if present
    rawText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    //console.log(rawText);
    return JSON.parse(rawText);

  } catch (error) {
    console.error("Error analyzing text:", error);
    return { error: error.message || "Something went wrong" };
  }
};
