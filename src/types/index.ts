export interface Project {
  id: number;
  title: string;
  featured: boolean;
  category: string;
  description: string;
  stack: string[];
  live: string | null;
  github: string | null;
  images: { src: string; alt: string }[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  level: "Expert" | "Advanced" | "Proficient" | "Learning";
  color: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  logo?: string;
  description: string;
  achievements: string[];
  stack: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ButtonVariant = "primary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";
