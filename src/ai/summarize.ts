import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const summarizeArticle = async (
  title: string,
  article: string,
): Promise<string> => {
  if (!article?.trim()) {
    throw new Error("Article content is required to generate a summary.");
  }

  const prompt = `Summarize the following wiki article in 1-2 concise sentences. Focus on the main idea and the most important details a reader should remember. Do not add opinions or unrelated information. Your goal is inform users of what the gist of a wiki article is so they can decide if they want to read more or not.

<title>
${title}</title>

<wiki_content>
${article}</wiki_content>`;

  try {
    const { text } = await generateText({
      model: openrouter("deepseek/deepseek-chat"),
      system: "You are an assistant that writes concise factual summaries.",
      prompt: prompt,
    });
    console.log(text);

    return text?.trim() ?? "";
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw new Error("Failed to generate summary. Please try again.");
  }
};

export default summarizeArticle;
