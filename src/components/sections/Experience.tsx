"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StackBadge } from "@/components/ui/Badge";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

function TimelineCard({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[number];
  index: number;
  isLast: boolean;
}) {
  const shouldReduce = useReducedMotion();
  const isFirst = index === 0;

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6 pl-8 md:pl-12"
    >
      {/* Timeline left rail */}
      <div className="absolute left-0 top-0 flex flex-col items-center" aria-hidden="true">
        {/* Dot */}
        <div
          className={cn(
            "w-4 h-4 rounded-full border-2 flex-shrink-0 z-10 mt-1.5",
            isFirst
              ? "bg-indigo-500 border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              : "bg-[var(--bg-secondary)] border-[var(--border)]"
          )}
        />
        {/* Line */}
        {!isLast && (
          <motion.div
            initial={shouldReduce ? {} : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            style={{ transformOrigin: "top" }}
            className="w-px flex-1 mt-1 min-h-[40px] bg-gradient-to-b from-[var(--accent-primary)] via-[var(--border)] to-[var(--border)]"
          />
        )}
      </div>

      {/* Card */}
      <div
        className={cn(
          "card p-6 flex-1 mb-8",
          isFirst && "border-indigo-500/30 hover:border-indigo-400/50"
        )}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isFirst && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                  Current
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-snug">
              {exp.role}
            </h3>
            <p className="text-indigo-400 font-medium text-sm mt-0.5">
              {exp.company}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
              <Calendar className="w-3.5 h-3.5" />
              {exp.period}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
              <MapPin className="w-3.5 h-3.5" />
              {exp.location}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
          {exp.description}
        </p>

        {/* Achievements */}
        <ul className="flex flex-col gap-2 mb-5" role="list">
          {exp.achievements.map((achievement) => (
            <li key={achievement} className="flex gap-2.5 text-sm text-[var(--text-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[var(--border)]">
          {exp.stack.map((tech) => (
            <StackBadge key={tech} tech={tech} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-heading"
    >
      <div className="container-wide">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional journey"
          align="center"
        />

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <TimelineCard
              key={exp.company + exp.period}
              exp={exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
