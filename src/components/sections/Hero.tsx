"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/ui/AnimatedText";
import { SITE_CONFIG, SOCIAL_LINKS, STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CODE_LINES = [
  'role: "Senior Frontend Engineer"',
  'stack: ["React", "Next.js", "TypeScript"]',
  "yearsExp: 5",
  "openToRemote: true",
];

const SOCIAL_ITEMS = [
  { href: SOCIAL_LINKS.github, Icon: FiGithub, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, Icon: FiLinkedin, label: "LinkedIn" },
  { href: SOCIAL_LINKS.twitter, Icon: FiTwitter, label: "Twitter/X" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
      className={cn(
        "px-4 py-3 rounded-xl border border-[var(--border)]",
        "bg-[var(--bg-secondary)]/80 backdrop-blur-sm",
        "hover:border-indigo-500/40 hover:shadow-glow-sm",
        "transition-all duration-300 text-center"
      )}
    >
      <div className="text-2xl font-bold gradient-text leading-none mb-0.5">{value}</div>
      <div className="text-xs text-[var(--text-tertiary)] font-medium">{label}</div>
    </motion.div>
  );
}

function CodeBlock() {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "relative w-full max-w-md mx-auto",
        "bg-[var(--bg-secondary)] border border-[var(--border)]",
        "rounded-2xl overflow-hidden shadow-card",
        "hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-shadow duration-500"
      )}
      style={!shouldReduce ? {
        animation: "float 6s ease-in-out infinite",
      } : {}}
    >
      {/* Editor chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-primary)]">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-[var(--text-tertiary)] font-mono">engineer.ts</span>
      </div>

      {/* Code */}
      <div className="p-5 font-mono text-sm leading-7">
        <span className="text-purple-400">const</span>{" "}
        <span className="text-blue-400">engineer</span>{" "}
        <span className="text-[var(--text-secondary)]">= {"{"}</span>
        <br />
        <span className="pl-5 text-[var(--text-tertiary)]">
          {"  "}name:{" "}
          <span className="text-green-400">&quot;Muideen Jamiu&quot;</span>,
        </span>
        <br />
        <span className="pl-5 text-[var(--text-tertiary)]">
          {"  "}{" "}
          <Typewriter
            lines={CODE_LINES}
            className="text-[var(--text-secondary)]"
            speed={55}
            deleteSpeed={25}
          />
        </span>
        <br />
        <span className="text-[var(--text-secondary)]">{"}"}</span>
        <span className="text-[var(--text-tertiary)]">;</span>
      </div>

      {/* Glow accent */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-600/20 blur-2xl pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-purple-600/10 blur-2xl pointer-events-none" />
    </motion.div>
  );
}

export function Hero() {
  const shouldReduce = useReducedMotion();

  const scrollToWork = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-wide w-full py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                {SITE_CONFIG.availability}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.05]"
            >
              Senior
              <br />
              <span className="gradient-text">Frontend</span>
              <br />
              Engineer
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-[var(--text-secondary)] font-medium leading-relaxed max-w-lg"
            >
              I build fast, accessible, and beautiful web products.
            </motion.p>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] leading-relaxed max-w-lg"
            >
              With 5+ years of experience crafting production-grade web
              applications, I specialise in React, Next.js, TypeScript, and
              Vue.js ecosystems. Currently expanding into full-stack territory
              with Node.js.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3"
            >
              <Button variant="primary" size="md" onClick={scrollToWork}>
                View My Work
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="md"
                href={SITE_CONFIG.cvUrl}
                external
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2"
            >
              <span className="text-xs text-[var(--text-tertiary)] font-medium uppercase tracking-wider">
                Connect
              </span>
              <div className="h-px w-8 bg-[var(--border)]" />
              <div className="flex items-center gap-3">
                {SOCIAL_ITEMS.map(({ href, Icon, label }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={shouldReduce ? {} : { scale: 1.15, y: -2 }}
                    whileTap={shouldReduce ? {} : { scale: 0.95 }}
                    className={cn(
                      "text-[var(--text-tertiary)] hover:text-indigo-400",
                      "transition-colors duration-200"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-2"
            >
              {STATS.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={0.6 + i * 0.1}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <div className="relative hidden lg:flex flex-col items-center gap-8">
            <CodeBlock />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-[var(--text-tertiary)] font-medium tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
