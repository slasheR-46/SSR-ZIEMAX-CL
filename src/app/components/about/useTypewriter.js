"use client";
import { useEffect, useState } from "react";

export function useTypewriter(words, speed = 70, pause = 1800) {
  const [index, setIndex] = useState(0); // palabra
  const [subIndex, setSubIndex] = useState(0); // letra
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const current = words[index];
    if (!deleting && subIndex <= current.length) {
      setDisplay(current.slice(0, subIndex));
      const t = setTimeout(() => setSubIndex((s) => s + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && subIndex > current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex >= 0) {
      setDisplay(current.slice(0, subIndex));
      const t = setTimeout(() => setSubIndex((s) => s - 1), speed * 0.6);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex < 0) {
      setDeleting(false);
      setSubIndex(0);
      setIndex((i) => (i + 1) % words.length);
    }
  }, [subIndex, deleting, index, words, speed, pause]);
  return display;
}
