"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 rounded-xl", className)} aria-hidden />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "relative w-9 h-9 flex items-center justify-center rounded-xl",
        "bg-[var(--bg-secondary)] border border-[var(--border)]",
        "hover:border-[var(--border-hover)] hover:bg-[var(--bg-tertiary)]",
        "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        className
      )}
    >
      <div
        className="transition-all duration-300"
        style={{
          transform: isDark ? "rotate(0deg)" : "rotate(180deg)",
          opacity: 1,
        }}
      >
        {isDark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </div>
    </button>
  );
}
