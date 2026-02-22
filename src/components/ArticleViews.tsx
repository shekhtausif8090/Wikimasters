"use client";
import { incrementPageview } from "@/app/actions/pageviews";
import { Eye } from "lucide-react";
import React from "react";
import Spinner from "./ui/spinner";

const ArticleViews = ({ articleId }: { articleId: number }) => {
  const [localPageviews, setLocalPageviews] = React.useState<number | null>(
    null,
  );

  React.useEffect(() => {
    async function fetchPageview() {
      const newCount = await incrementPageview(articleId);
      setLocalPageviews(newCount ?? null);
    }
    fetchPageview();
  }, [articleId]);

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
      <Eye className="h-4 w-4" />
      <span className="flex gap-1 items-center">
        {typeof localPageviews === "number" ? (
          localPageviews
        ) : (
          <Spinner size="16" />
        )}{" "}
        views
      </span>
    </div>
  );
};

export default ArticleViews;
