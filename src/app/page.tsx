import { BookOpen, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WikiCard } from "@/components/ui/wiki-card";
import { getArticles } from "@/lib/data/articles";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/10 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Your Knowledge Hub
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Welcome to <span className="gradient-text">Wikimasters</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Discover, create, and share knowledge with our collaborative wiki
              platform. Start exploring articles or contribute your own
              expertise.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="shadow-lg shadow-primary/25">
                <Link href="/wiki/edit/new">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Article
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#articles">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Articles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <main id="articles" className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Latest Articles
            </h2>
            <p className="text-muted-foreground mt-1">
              Explore our collection of {articles.length} article
              {articles.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link href="/wiki/edit/new">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-muted">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No articles yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to create an article!
            </p>
            <Button asChild>
              <Link href="/wiki/edit/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Article
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
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
          </div>
        )}
      </main>
    </div>
  );
}
