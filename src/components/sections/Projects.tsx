"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { projects, featuredProjects, otherProjects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredOther =
    activeCategory === "All"
      ? otherProjects
      : otherProjects.filter((p) => p.category === activeCategory);

  const filteredFeatured =
    activeCategory === "All"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="section bg-[var(--bg-secondary)]"
      aria-labelledby="projects-heading"
    >
      <div className="container-wide">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of work I'm proud of"
          align="center"
        />

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                activeCategory === cat
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-glow-sm"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border)] hover:border-indigo-500/40 hover:text-[var(--text-primary)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        <AnimatePresence mode="wait">
          {filteredFeatured.length > 0 && (
            <motion.div
              key={`featured-${activeCategory}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5"
            >
              {filteredFeatured.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  featured={false}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other Projects */}
        <AnimatePresence>
          {showAll && filteredOther.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <p className="text-sm text-[var(--text-tertiary)] font-medium mb-5 flex items-center gap-2">
                  <span className="h-px flex-1 bg-[var(--border)]" />
                  Other Projects
                  <span className="h-px flex-1 bg-[var(--border)]" />
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredOther.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        {filteredOther.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <Button
              variant="ghost"
              size="md"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All Projects ({filteredOther.length} more){" "}
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
