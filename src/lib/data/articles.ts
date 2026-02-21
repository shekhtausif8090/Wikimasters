import { eq } from "drizzle-orm";
import redis from "@/cache";
import db from "@/db/index";
import { articles, user } from "@/db/schema";

// The list view selects only a subset of Article fields and adds the author's
// resolved name. Use a dedicated type for the list response.
export type ArticleList = {
  id: number;
  title: string;
  createdAt: string;
  summary: string | null;
  content: string;
  author: string | null;
  imageUrl?: string | null;
};

export async function getArticles(): Promise<ArticleList[]> {
  const cached = await redis.get<ArticleList[]>("articles:all");
  if (cached) {
    console.log("🎯 Get Articles Cache Hit!");
    return cached;
  }

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      summary: articles.summary,
      content: articles.content,
      author: user.name,
    })
    .from(articles)
    .leftJoin(user, eq(articles.authorId, user.id));

  console.log("🏹 Get Articles Cache Miss!");
  // Store cache as JSON so we can retrieve a typed array later
  try {
    await redis.set("articles:all", JSON.stringify(response), {
      ex: 60,
    });
  } catch (err) {
    console.warn("Failed to set articles cache", err);
  }
  return response as unknown as ArticleList[];
}

export type ArticleWithAuthor = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imageUrl?: string | null;
  author: string | null;
};

export async function getArticleById(id: number) {
  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: user.name,
      imageUrl: articles.imageUrl,
    })
    .from(articles)
    .where(eq(articles.id, id))
    .leftJoin(user, eq(articles.authorId, user.id));
  // Cast the DB response to the shape we selected above.
  return response[0] ? (response[0] as unknown as ArticleWithAuthor) : null;
}
