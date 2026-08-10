"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Paintbrush,
  GitBranch,
  TestTube2,
  Settings,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SkillCategory } from "@/types";

const ICONS: Record<string, React.ElementType> = {
  Code2,
  Paintbrush,
  GitBranch,
  TestTube2,
  Settings,
  Rocket,
};

const LEVEL_CONFIG = {
  Expert:    { label: "Expert",      dots: 5, filled: 5 },
  Advanced:  { label: "Advanced",    dots: 5, filled: 4 },
  Proficient:{ label: "Proficient",  dots: 5, filled: 3 },
  Learning:  { label: "In Progress", dots: 5, filled: 2 },
};

// Explicit Tailwind-safe colour maps (no dynamic class generation)
const DOT_COLORS: Record<string, string> = {
  indigo: "#818cf8",
  purple: "#c084fc",
  blue:   "#60a5fa",
  green:  "#4ade80",
  orange: "#fb923c",
  yellow: "#facc15",
};

interface SkillBarProps {
  skill: SkillCategory;
  index: number;
}

export function SkillBar({ skill, index }: SkillBarProps) {
  const Icon = ICONS[skill.icon] || Code2;
  const levelConfig = LEVEL_CONFIG[skill.level];
  const isLearning = skill.level === "Learning";
  const dotColor = DOT_COLORS[skill.color] ?? "#818cf8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "card p-6 flex flex-col gap-4",
        isLearning &&
          "border-yellow-500/20 bg-gradient-to-br from-[var(--bg-secondary)] to-yellow-500/5"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
              `badge-${skill.color}`
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-[var(--text-primary)] text-base leading-tight">
            {skill.category}
          </h3>
        </div>

        {/* Level badge + dots */}
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full border",
              `badge-${skill.color}`,
              isLearning && "animate-pulse"
            )}
          >
            {levelConfig.label}
          </span>

          <div className="flex gap-0.5">
            {Array.from({ length: levelConfig.dots }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i < levelConfig.filled ? dotColor : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Skills pills */}
      <div className="flex flex-wrap gap-2">
        {skill.skills.map((s) => (
          <span
            key={s}
            className={cn(
              "text-xs px-2.5 py-1 rounded-lg font-mono border",
              "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border)]",
              "hover:border-indigo-500/40 hover:text-[var(--text-primary)]",
              "transition-all duration-200"
            )}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
