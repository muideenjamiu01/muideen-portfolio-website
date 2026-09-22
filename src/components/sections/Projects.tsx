"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const filtered = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);
  const selected = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  const visible = activeCategory === "All" && !showAll ? selected.filter((project) => project.featured) : selected;

  return (
    <section id="projects" className="section border-y border-[var(--border)] bg-[var(--bg-secondary)]" aria-labelledby="projects-heading">
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--text-secondary)]"><span className="h-2 w-2 rounded-full bg-indigo-400" />Selected work</p>
            <h2 id="projects-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl">Ideas brought<br className="sm:hidden" /> to life<span className="text-indigo-400">.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[var(--text-secondary)]">Websites, platforms, and the details that make them work. Explore the projects and take a closer look inside.</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {projectCategories.map((category) => (
              <button key={category} type="button" onClick={() => { setActiveCategory(category); setShowAll(false); }} aria-pressed={activeCategory === category} className={cn("min-h-11 rounded-full border px-4 text-xs font-medium transition-colors", activeCategory === category ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]" : "border-[var(--border)] text-[var(--text-secondary)] hover:border-indigo-400 hover:text-[var(--text-primary)]")}>{category}</button>
            ))}
          </div>
          <p aria-live="polite" aria-atomic="true" className="shrink-0 font-mono text-[11px] text-[var(--text-secondary)]">{String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} projects</p>
        </div>

        <div id="project-grid" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {visible.map((project, index) => <ProjectCard key={project.id} project={project} index={index} featured={index === 0 && activeCategory === "All"} />)}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[var(--border)] pt-7 sm:flex-row">
          <p className="text-sm text-[var(--text-secondary)]">Have something in mind? <a href="#contact" className="inline-flex min-h-11 items-center gap-1 font-medium text-[var(--text-primary)] hover:text-indigo-400">Let’s build it <ArrowUpRight className="h-4 w-4" /></a></p>
          {activeCategory === "All" && selected.some((project) => !project.featured) && <button type="button" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll} aria-controls="project-grid" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[var(--border)] px-5 text-sm font-medium text-[var(--text-primary)] hover:border-indigo-400">{showAll ? "Show selected work" : `View all ${projects.length} projects`}{showAll ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}</button>}
        </div>
      </div>
    </section>
  );
}
