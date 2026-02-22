import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WikiCardProps {
  title: string;
  author: string;
  date: string;
  summary: string;
  href: string;
}

export function WikiCard({
  title,
  author,
  date,
  summary,
  href,
}: WikiCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="card-hover h-full border-2 border-transparent hover:border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
            <span className="inline-flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {author}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
          </div>
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <CardDescription className="line-clamp-2 leading-relaxed">
            {summary}
          </CardDescription>
        </CardContent>
        <CardFooter className="pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-300">
            Read article
            <ArrowRight className="w-4 h-4" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
