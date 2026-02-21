"use client";

import type React from "react";
import useHasMounted from "@/hooks/use-has-hydrated";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function ClientOnly({ children, ...delegated }: Props) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

export default ClientOnly;
