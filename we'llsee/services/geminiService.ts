import { GoogleGenAI } from "@google/genai";

// Initialize the client.
// The API key is expected to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Generates a "Hater" comment or a "Motivator" comment based on the plan.
 * This adds the spicy social flavor to the app.
 */
export const generateAIReaction = async (planTitle: string, planDescription: string, type: 'hater' | 'believer'): Promise<string> => {
  try {
    const prompt = type === 'hater' 
      ? `You are a cynical, realistic, slightly mean "hater" on a social media app called We'llSEE. A user posted this plan: "${planTitle} - ${planDescription}". Write a short, biting, 1-sentence comment doubting they can do it. Be specific to the context.`
      : `You are a high-energy hype man on a social media app called We'llSEE. A user posted this plan: "${planTitle} - ${planDescription}". Write a short, explosive 1-sentence comment believing in them completely.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 60,
        temperature: 1.2, // High creativity/chaos
      }
    });

    return response.text || "I'm watching you...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return type === 'hater' ? "I doubt this API works right now, just like I doubt your plan." : "Keep going!";
  }
};

/**
 * Analyzes the description to see if the goal is SMART (Specific, Measurable, Achievable, Relevant, Time-bound).
 */
export const analyzePlanQuality = async (description: string): Promise<{ score: number; feedback: string }> => {
   try {
    const prompt = `Analyze this goal description for a social accountability app: "${description}". 
    Rate it from 1-10 on how specific and measurable it is. Return JSON: { "score": number, "feedback": "short string" }`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Plan Analysis Error", error);
    return { score: 5, feedback: "Couldn't analyze specificty." };
  }
}
