"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { ProjectGallery } from "./ProjectGallery";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  return (
    <article aria-label={`Project: ${project.title}`} className={cn("project-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)]", featured && "md:col-span-2 lg:grid lg:grid-cols-[1.15fr_1fr]")}>
      <ProjectGallery project={project} featured={featured} />
      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "lg:justify-center lg:p-10")}>
        <div className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          <span className="font-mono">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-[var(--border-hover)]" />
          <span>{project.category}</span>
          {featured && <span className="ml-auto rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-1 text-[var(--accent-primary)] dark:text-indigo-300">Featured</span>}
        </div>
        <h3 className={cn("text-xl font-semibold leading-tight tracking-tight sm:text-2xl", featured && "lg:text-3xl")}>{project.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{project.description}</p>
        {project.stack.length > 0 && <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => <li key={tech} className="rounded-md border border-[var(--border)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]">{tech}</li>)}
        </ul>}
        {(project.live || project.github) && <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-7">
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} website (new tab)`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-indigo-400">Visit website <ArrowUpRight className="h-4 w-4" /></a>}
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code (new tab)`} className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><Github className="h-4 w-4" />Source code</a>}
        </div>}
      </div>
    </article>
  );
}
