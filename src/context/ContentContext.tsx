"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mergeContent } from "@/lib/contentDefaults";
import type { ContentConfig } from "@/types/content";

type ContentContextValue = {
  content: ContentConfig | null;
  loading: boolean;
  refreshContent: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentConfig | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshContent() {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      const data = await res.json();
      setContent(mergeContent(data));
    } catch (error) {
      console.error("Failed to load content:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const initialLoad = window.setTimeout(refreshContent, 0);
    const interval = window.setInterval(refreshContent, 5000);
    window.addEventListener("content-updated", refreshContent);

    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
      window.removeEventListener("content-updated", refreshContent);
    };
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
