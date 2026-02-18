import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

function isTestEnv() {
  return (
    process.env.NODE_ENV === "test" ||
    process.env.VITEST ||
    process.env.PLAYWRIGHT
  );
}

export async function summarizeArticle(
  title: string,
  article: string,
): Promise<string> {
  if (isTestEnv()) {
    return "This is a test summary.";
  }
  if (!article || !article.trim()) {
    throw new Error("Article content is required to generate a summary.");
  }
  const prompt = `Summarize the following wiki article in 1-2 concise sentences. Focus on the main idea and the most important details a reader should remember. Do not add opinions or unrelated information. Your goal is inform users of what the gist of a wiki article is so they can decide if they want to read more or not.\n\n<title>\n${title}</title>\n\n<wiki_content>\n${article}</wiki_content>`;
  const { text } = await generateText({
    model: openrouter("deepseek/deepseek-chat"),
    system: "You are an assistant that writes concise factual summaries.",
    prompt: prompt,
  });
  return (text ?? "").trim();
}

export default summarizeArticle;
