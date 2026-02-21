import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WikiCard } from "@/components/ui/wiki-card";
import { getArticles } from "@/lib/data/articles";

export default async function Home() {
  let articles = [];
  try {
    articles = await getArticles();
  } catch (error) {
    console.log("exception occured");
    console.log(error);
  }

  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Wiki Articles</h1>
          <Button asChild>
            <Link href="/wiki/edit/new">
              <Plus className="w-4 h-4 mr-2" />
              Create Article
            </Link>
          </Button>
        </div>
        {articles.map(({ title, id, createdAt, summary, author }) => (
          <WikiCard
            title={title}
            author={author ? author : "Unknown"}
            date={createdAt}
            summary={summary ?? ""}
            href={`/wiki/${id}`}
            key={id}
          />
        ))}
      </main>
    </div>
  );
}
