import { Home, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-accent/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <Card className="relative w-full max-w-md text-center border-2 shadow-xl shadow-primary/5">
        <CardContent className="pt-10 pb-10">
          {/* Icon illustration */}
          <div className="relative mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br from-muted to-muted/50">
            <Search className="h-12 w-12 text-muted-foreground" />
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-destructive font-bold text-lg">?</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>

          {/* Subheading */}
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>

          {/* Friendly explanation */}
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm mx-auto">
            The wiki page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>

          {/* Call-to-action button */}
          <Link href="/">
            <Button className="w-full shadow-md shadow-primary/20" size="lg">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
