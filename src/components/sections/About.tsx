"use client";

import { motion } from "framer-motion";
import { MapPin, Globe, GraduationCap, Zap } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const FUN_FACTS = [
  { Icon: MapPin, label: "Lagos, Nigeria" },
  { Icon: Globe, label: "Open to Remote" },
  { Icon: GraduationCap, label: "HND Computer Science" },
  { Icon: Zap, label: "5+ Years Experience" },
];

const PARAGRAPHS = [
  "I'm Muideen, a Senior Frontend Engineer based in Lagos, Nigeria, with over 5 years of professional experience building scalable web products used by thousands of people across Africa and beyond.",
  "I've worked across fintech, edtech, and social platforms — collaborating with cross-functional teams to turn complex UI/UX designs into high-performance, accessible web applications. I'm passionate about clean code, great developer experience, and pixel-perfect interfaces.",
  "Beyond the frontend, I'm actively learning backend development with Node.js and Express, working toward becoming a well-rounded full-stack engineer.",
];

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-wide">
        <SectionHeader
          title="About Me"
          subtitle="A little more about who I am and what drives me"
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main card */}
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden border border-[var(--border)]",
                "bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]",
                "p-8 min-h-[380px] flex flex-col justify-between"
              )}
            >
              {/* Abstract background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-600/8 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-600/8 blur-3xl" />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, var(--accent-primary) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              </div>

              {/* Profile monogram */}
              <div className="relative z-10">
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-6",
                    "bg-gradient-to-br from-indigo-600 to-purple-600",
                    "text-white text-3xl font-bold font-mono shadow-glow-md"
                  )}
                >
                  MJ
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                  Muideen Jamiu
                </h3>
                <p className="text-indigo-400 font-medium text-sm mb-1">
                  Senior Frontend Engineer
                </p>
                <p className="text-[var(--text-tertiary)] text-sm">
                  Lagos, Nigeria · Available Remotely
                </p>
              </div>

              {/* Tech highlight row */}
              <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                {["React", "Next.js", "TypeScript", "Vue.js"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative accent lines */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-indigo-500/40 rounded-tl-2xl pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-purple-500/40 rounded-br-2xl pointer-events-none" />
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-5">
              {PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="text-[var(--text-secondary)] leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Fun facts */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className={cn(
                "grid grid-cols-2 gap-3 mt-2"
              )}
            >
              {FUN_FACTS.map(({ Icon, label }) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl",
                    "border border-[var(--border)] bg-[var(--bg-secondary)]",
                    "hover:border-indigo-500/30 hover:bg-[var(--bg-tertiary)]",
                    "transition-all duration-200 group"
                  )}
                >
                  <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm text-[var(--text-secondary)] font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
