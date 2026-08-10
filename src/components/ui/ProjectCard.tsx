"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { StackBadge } from "./Badge";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export function ProjectCard({
  project,
  index = 0,
  featured = false,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "card group flex flex-col overflow-hidden",
        featured && "md:flex-row md:min-h-[280px]"
      )}
      aria-label={`Project: ${project.title}`}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-[var(--bg-tertiary)]",
          "flex-shrink-0",
          featured
            ? "md:w-2/5 h-52 md:h-auto"
            : "h-44"
        )}
      >
        {/* Placeholder gradient when no real image */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent",
            "flex items-center justify-center"
          )}
        >
          <span className="text-4xl font-bold text-indigo-400/30 font-mono select-none">
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-indigo-600/80 flex items-center justify-center",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          )}
        >
          <span className="text-white font-semibold flex items-center gap-2 text-sm">
            View Project <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Category pill */}
        <div className="absolute top-3 left-3">
          <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-sm text-[var(--text-secondary)] border border-[var(--border)] font-mono">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-[var(--text-primary)] text-lg leading-snug group-hover:text-indigo-400 transition-colors duration-200">
            {project.title}
          </h3>
          {/* Action links */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg",
                  "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
                  "border border-[var(--border)] hover:border-[var(--border-hover)]",
                  "hover:bg-[var(--bg-tertiary)] transition-all duration-200"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg",
                  "text-[var(--text-tertiary)] hover:text-indigo-400",
                  "border border-[var(--border)] hover:border-indigo-500/40",
                  "hover:bg-indigo-500/10 transition-all duration-200"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <StackBadge key={tech} tech={tech} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
