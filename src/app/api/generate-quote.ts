"use server";

import type { QuoteResponse } from "../generate/utils/types";

export const generateQuote = async (tone: string) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured.");
    }
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "assistant",
            content: `write a ${tone} quote in 1-2 sentences. Keep it concise and impactful.`,
          },
        ],
      }),
    });
    const data: QuoteResponse = await result.json();
    const quote = data.choices[0]?.message.content.trim();
    if (!quote) return "Sorry! No quote found.";
    return quote;
  } catch (error) {
    console.error("Error generating quote:", error);
    return "Error generating quote.";
  }
};
