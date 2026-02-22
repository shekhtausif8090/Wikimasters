"use client";

import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";

export function UserButton() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (isPending) {
    return <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />;
  }

  if (!session?.user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 hover:bg-primary/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center overflow-hidden shadow-sm">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-4 h-4 text-primary-foreground" />
          )}
        </div>
        <span className="hidden sm:inline">{session.user.name}</span>
      </Button>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-xl border-2 z-20 overflow-hidden">
            <div className="px-4 py-3 border-b bg-muted/30">
              <p className="text-sm font-medium text-foreground">
                {session.user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session.user.email}
              </p>
            </div>
            <div className="p-1">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
