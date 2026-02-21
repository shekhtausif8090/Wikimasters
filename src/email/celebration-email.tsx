import { eq } from "drizzle-orm";
import db from "@/db";
import { articles, user } from "@/db/schema";
import resend from "@/email";
import CelebrationTemplate from "@/email/templates/celebration-template";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default async function sendCelebrationEmail(
  articleId: number,
  pageviews: number,
) {
  const response = await db
    .select({
      email: user.email,
      id: user.id,
      title: articles.title,
      name: user.name,
    })
    .from(articles)
    .leftJoin(user, eq(articles.authorId, user.id))
    .where(eq(articles.id, articleId));

  const { email, id, title, name } = response[0];
  if (!email) {
    console.log(
      `❌ skipping sending a celebration for getting ${pageviews} on article ${articleId}, could not find email`,
    );
    return;
  }

  const emailRes = await resend.emails.send({
    from: "Wikimasters <onboarding@resend.dev>", // replace with your domain when ready
    to: email,
    subject: `✨ Your article got ${pageviews} views! ✨`,
    react: (
      <CelebrationTemplate
        articleTitle={title}
        articleUrl={`${BASE_URL}/wiki/${articleId}`}
        name={name ?? "Friend"}
        pageviews={pageviews}
      />
    ),
  });

  if (!emailRes.error) {
    console.log(
      `📧 sent ${id} a celebration for getting ${pageviews} on article ${articleId}`,
    );
  } else {
    console.log(
      `❌ error sending ${id} a celebration for getting ${pageviews} on article ${articleId}`,
      emailRes.error,
    );
  }
}
