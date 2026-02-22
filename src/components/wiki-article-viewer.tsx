"use client";

import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Edit,
  Eye,
  Home,
  Trash,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { deleteArticleForm } from "@/app/actions/articles";
import { incrementPageview } from "@/app/actions/pageviews";
import ClientOnly from "@/components/ClientOnly";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ViewerArticle {
  title: string;
  author: string | null;
  id: number;
  content: string;
  createdAt: string;
  imageUrl?: string | null;
}

interface WikiArticleViewerProps {
  article: ViewerArticle;
  canEdit?: boolean;
  pageviews?: number | null;
}

export default function WikiArticleViewer({
  article,
  canEdit = false,
}: WikiArticleViewerProps) {
  // local state to show updated pageviews after increment
  const [localPageviews, setLocalPageviews] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPageview() {
      const newCount = await incrementPageview(article.id);
      setLocalPageviews(newCount ?? null);
    }
    fetchPageview();
  }, [article.id]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero header for the article */}
      <div className="relative bg-linear-to-br from-primary/10 via-background to-accent/10 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="relative max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link
              href="/"
              className="flex items-center hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
              {article.title}
            </span>
          </nav>

          {/* Article Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Article Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <User className="h-4 w-4" />
                  <span>{article.author ?? "Unknown"}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Calendar className="h-4 w-4" />
                  <ClientOnly>
                    <span>{formatDate(article.createdAt)}</span>
                  </ClientOnly>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-medium">
                    Article
                  </Badge>
                  <div className="flex items-center gap-1.5 text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Eye className="h-4 w-4" />
                    <ClientOnly>
                      <span>{localPageviews ? localPageviews : "—"} views</span>
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button - Only shown if user has edit permissions */}
            {canEdit && (
              <div className="flex items-center gap-2">
                <Link href={`/wiki/edit/${article.id}`}>
                  <Button variant="outline" className="shadow-sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>

                {/* Delete form calls the server action wrapper */}
                <form action={deleteArticleForm}>
                  <input type="hidden" name="id" value={String(article.id)} />
                  <Button
                    type="submit"
                    variant="destructive"
                    className="shadow-sm"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-2 shadow-lg shadow-primary/5">
          <CardContent className="pt-6 pb-8">
            {/* Article Image - Display if exists */}
            {article.imageUrl && (
              <div className="mb-8">
                <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={article.imageUrl}
                    alt={`Image for ${article.title}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Rendered Markdown Content */}
            <div className="prose prose-stone dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary">
              <ReactMarkdown
                components={{
                  // Customize heading styles
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">
                      {children}
                    </h3>
                  ),
                  // Customize paragraph styles
                  p: ({ children }) => (
                    <p className="mb-4 text-foreground leading-7">{children}</p>
                  ),
                  // Customize list styles
                  ul: ({ children }) => (
                    <ul className="mb-4 ml-6 list-disc text-foreground">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 ml-6 list-decimal text-foreground">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1 text-foreground">{children}</li>
                  ),
                  // Customize code styles
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                        {children}
                      </code>
                    ) : (
                      <code className={className}>{children}</code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm">
                      {children}
                    </pre>
                  ),
                  // Customize blockquote styles
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-4 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  // Customize link styles
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className="text-primary hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  // Customize table styles
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border-collapse border border-border">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-4 py-2">
                      {children}
                    </td>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="mt-8 pb-8">
          <Link href="/">
            <Button variant="outline" className="shadow-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
