"use client";

import { useEffect, useState } from "react";

const DEFAULT_SPEED = 25; // ms per character

export function useTypingEffect(
  text: string | null,
  speed = DEFAULT_SPEED,
  enabled = true
): string {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text || !enabled) {
      setDisplayed("");
      return;
    }

    setDisplayed("");
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return displayed;
}
