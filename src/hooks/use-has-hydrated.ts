import React from "react";

export default function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = React.useState(false);

  React.useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
}
