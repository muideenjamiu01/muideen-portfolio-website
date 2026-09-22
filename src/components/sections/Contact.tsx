"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Mail, Linkedin, Github, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, SOCIAL_LINKS, SUBJECT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { contactSchema } from "@/lib/contact";

type ContactFormData = z.infer<typeof contactSchema>;

const CONTACT_LINKS = [
  {
    Icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    display: SITE_CONFIG.email,
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/muideen-muhammed-jamiu",
    href: SOCIAL_LINKS.linkedin,
    display: "muideen-muhammed-jamiu",
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "github.com/muideenjamiu01",
    href: SOCIAL_LINKS.github,
    display: "muideenjamiu01",
  },
];

const inputClasses = cn(
  "w-full px-4 py-3 rounded-xl text-sm",
  "bg-[var(--bg-primary)] text-[var(--text-primary)]",
  "border border-[var(--border)]",
  "placeholder:text-[var(--text-tertiary)]",
  "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50",
  "transition-all duration-200"
);

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok || result.ok !== true) throw new Error("Failed to send message");

      setSubmitted(true);
      reset();
      toast.success("Message sent! I'll get back to you within 24 hours.");
    } catch {
      setSubmitError("Your message could not be sent. Please try again or email me directly below.");
      toast.error("Message not sent. You can email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      aria-labelledby="contact-heading"
    >
      <div className="container-wide">
        <SectionHeader
          title="Let's Work Together"
          subtitle="I'm open to full-time remote roles, contract projects, and exciting collaborations."
          align="center"
        />

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Availability */}
            <div
              className={cn(
                "p-5 rounded-2xl border",
                "border-green-500/20 bg-green-500/5"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">
                  Available for hire
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Remote worldwide · Full-time or contract
              </p>
            </div>

            {/* Meta info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>
                  {SITE_CONFIG.location} · {SITE_CONFIG.timezone}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{SITE_CONFIG.responseTime}</span>
              </div>
            </div>

            {/* Direct contact links */}
            <div className="flex flex-col gap-3">
              <p className="text-xs text-[var(--text-tertiary)] font-medium uppercase tracking-wider">
                Direct Contact
              </p>
              {CONTACT_LINKS.map(({ Icon, label, href, display }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={`${label}: ${display}`}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-xl group",
                    "border border-[var(--border)] bg-[var(--bg-secondary)]",
                    "hover:border-indigo-500/40 hover:bg-[var(--bg-tertiary)]",
                    "transition-all duration-200"
                  )}
                >
                  <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-tertiary)] mb-0.5">{label}</p>
                    <p className="text-sm text-[var(--text-primary)] font-medium truncate group-hover:text-indigo-400 transition-colors duration-200">
                      {display}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="card p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    Message Sent!
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm max-w-sm">
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label="Contact form"
                >
                  <div className="flex flex-col gap-5">
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contact-website">Leave this field empty</label>
                      <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                    </div>
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
                        >
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          autoComplete="name"
                          {...register("name")}
                          className={cn(
                            inputClasses,
                            errors.name && "border-red-500/60 focus:ring-red-500/30"
                          )}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="text-red-400 text-xs mt-1"
                            role="alert"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
                        >
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          autoComplete="email"
                          {...register("email")}
                          className={cn(
                            inputClasses,
                            errors.email && "border-red-500/60 focus:ring-red-500/30"
                          )}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-red-400 text-xs mt-1"
                            role="alert"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
                      >
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="subject"
                        {...register("subject")}
                        className={cn(
                          inputClasses,
                          "cursor-pointer",
                          errors.subject && "border-red-500/60 focus:ring-red-500/30"
                        )}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        aria-invalid={!!errors.subject}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a subject…
                        </option>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p
                          id="subject-error"
                          className="text-red-400 text-xs mt-1"
                          role="alert"
                        >
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
                      >
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell me about your project or opportunity…"
                        {...register("message")}
                        className={cn(
                          inputClasses,
                          "resize-none",
                          errors.message && "border-red-500/60 focus:ring-red-500/30"
                        )}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="text-red-400 text-xs mt-1"
                          role="alert"
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <p role="alert" className="text-sm text-red-400">
                        {submitError}{" "}
                        <a href={`mailto:${SITE_CONFIG.email}`} className="underline underline-offset-4">{SITE_CONFIG.email}</a>
                      </p>
                    )}
                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmitting}
                      className="w-full justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
