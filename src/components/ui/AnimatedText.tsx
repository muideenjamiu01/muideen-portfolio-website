"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  lines: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export function Typewriter({
  lines,
  className,
  speed = 60,
  deleteSpeed = 30,
  pauseTime = 2000,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timer);
    }

    const currentLine = lines[lineIndex];

    if (!isDeleting && charIndex <= currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentLine.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
        if (charIndex === currentLine.length) {
          setIsPaused(true);
        }
      }, speed);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex >= 0) {
      const timer = setTimeout(() => {
        setDisplayText(currentLine.slice(0, charIndex));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % lines.length);
        }
      }, deleteSpeed);
      return () => clearTimeout(timer);
    }
  }, [charIndex, isDeleting, isPaused, lineIndex, lines, speed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {displayText}
      <span className="code-cursor" />
    </span>
  );
}
