"use client";

import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import { ArrowUp } from "lucide-react";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SOCIAL_ITEMS = [
  { href: SOCIAL_LINKS.github, Icon: FiGithub, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, Icon: FiLinkedin, label: "LinkedIn" },
  { href: SOCIAL_LINKS.twitter, Icon: FiTwitter, label: "Twitter/X" },
  { href: SOCIAL_LINKS.email, Icon: FiMail, label: "Email" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={cn(
        "border-t border-[var(--border)]",
        "bg-[var(--bg-secondary)]"
      )}
    >
      <div className="container-wide py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-[var(--text-tertiary)] text-sm text-center md:text-left">
            &copy; {year}{" "}
            <span className="text-[var(--text-secondary)]">
              {SITE_CONFIG.shortName}
            </span>{" "}
            &middot; Built with{" "}
            <span className="text-indigo-400">Next.js</span> &amp;{" "}
            <span className="text-indigo-400">Tailwind CSS</span>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3" aria-label="Social links">
            {SOCIAL_ITEMS.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-xl",
                  "border border-[var(--border)] hover:border-indigo-500/40",
                  "text-[var(--text-tertiary)] hover:text-indigo-400",
                  "hover:bg-indigo-500/10 transition-all duration-200"
                )}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={cn(
              "flex items-center gap-2 text-sm font-medium",
              "text-[var(--text-tertiary)] hover:text-indigo-400",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
            )}
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
