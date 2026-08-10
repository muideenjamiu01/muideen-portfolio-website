import { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    category: "Frontend Core",
    icon: "Code2",
    level: "Expert",
    color: "indigo",
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Vue.js", "Nuxt.js"],
  },
  {
    category: "Styling & Design",
    icon: "Paintbrush",
    level: "Expert",
    color: "purple",
    skills: ["Tailwind CSS", "SASS/SCSS", "CSS-in-JS", "Styled Components", "Responsive Design", "Figma"],
  },
  {
    category: "State Management",
    icon: "GitBranch",
    level: "Advanced",
    color: "blue",
    skills: ["Redux Toolkit", "Context API", "Vuex", "React Query", "Zustand"],
  },
  {
    category: "Testing & Quality",
    icon: "TestTube2",
    level: "Advanced",
    color: "green",
    skills: ["React Testing Library", "Jest", "Cypress", "K6", "ESLint", "Prettier"],
  },
  {
    category: "Tools & DevOps",
    icon: "Settings",
    level: "Proficient",
    color: "orange",
    skills: ["Git", "GitHub", "GitLab", "Webpack", "Vite", "Vercel", "Netlify", "CI/CD"],
  },
  {
    category: "Currently Learning",
    icon: "Rocket",
    level: "Learning",
    color: "yellow",
    skills: ["Node.js", "Express.js", "REST API Design", "MongoDB", "PostgreSQL"],
  },
];
