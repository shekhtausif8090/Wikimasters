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
import { deleteArticleForm } from "@/app/actions/articles";
import ClientOnly from "@/components/ClientOnly";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MarkDown from "./MarkDown";
import ArticleViews from "./ArticleViews";
import FormatDate from "./FormatDate";
import { Suspense } from "react";

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
                  <FormatDate date={article.createdAt} />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-medium">
                    Article
                  </Badge>
                  <ArticleViews articleId={article.id} />
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

            <MarkDown content={article.content} />
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
