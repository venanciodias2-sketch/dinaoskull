"use client";

import { useEffect } from "react";
import { useContent } from "@/context/ContentContext";

export default function FaviconUpdater() {
  const { content } = useContent();

  useEffect(() => {
    if (!content?.hero.favicon) return;

    let icon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }

    icon.href = content.hero.favicon;
  }, [content?.hero.favicon]);

  return null;
}
