import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-accent/10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated logo */}
        <div className="relative">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-primary/70 text-primary-foreground shadow-xl shadow-primary/25 animate-float">
            <BookOpen className="w-10 h-10" />
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0 -m-2 rounded-3xl border-4 border-primary/20 border-t-primary animate-spin" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Loading</h2>
          <p className="text-sm text-muted-foreground">
            Preparing your content...
          </p>
        </div>
      </div>
    </div>
  );
}
