import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        "transition-colors duration-200",
        variant === "default" &&
          "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border)]",
        variant === "accent" &&
          "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        variant === "outline" &&
          "bg-transparent text-[var(--text-secondary)] border-[var(--border)]",
        className
      )}
    >
      {children}
    </span>
  );
}

interface StackBadgeProps {
  tech: string;
  size?: "sm" | "md";
}

export function StackBadge({ tech, size = "sm" }: StackBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg font-mono font-medium border",
        "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border)]",
        "hover:border-indigo-500/40 hover:text-indigo-400 hover:bg-indigo-500/5",
        "transition-all duration-200",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {tech}
    </span>
  );
}
