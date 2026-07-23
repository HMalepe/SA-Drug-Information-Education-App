"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fire a single analytics event on mount (Doc 20). */
export function TrackPage({
  name,
  props,
}: {
  name: string;
  props?: Record<string, string | number | boolean | undefined>;
}) {
  useEffect(() => {
    track(name, props);
    // Intentionally once per mount for page-level events
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  return null;
}
