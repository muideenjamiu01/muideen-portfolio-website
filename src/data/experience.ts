import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Lorem Excellentiam (9ijakids)",
    role: "Frontend Engineer",
    period: "2023 – Present",
    location: "Lagos, Nigeria · Remote",
    description:
      "Leading frontend development for an edtech platform serving thousands of young learners across Nigeria.",
    achievements: [
      "Translated UI/UX wireframes into pixel-perfect, responsive web applications using React",
      "Implemented Redux Toolkit for complex application state management, reducing prop-drilling and side effects",
      "Improved application performance by optimizing components and reducing unnecessary re-renders by 40%",
      "Introduced unit and integration tests with Jest and React Testing Library, improving code reliability",
      "Collaborated with DevOps to automate deployments via CI/CD pipelines, cutting release cycle time in half",
      "Participated in Agile/Scrum sprints, ensuring iterative and timely feature delivery",
    ],
    stack: ["React", "Redux Toolkit", "TypeScript", "Jest", "REST APIs", "Agile"],
  },
  {
    company: "eCONNECT (Woozeee)",
    role: "Frontend Engineer",
    period: "2022 – 2023",
    location: "Lagos, Nigeria · Hybrid",
    description:
      "Built new features for Woozeee, a growing social and lifestyle platform targeting young African professionals.",
    achievements: [
      "Built new user-facing features with React, Next.js, TypeScript, and Tailwind CSS",
      "Designed and implemented a modular, reusable component library adopted across the product",
      "Resolved business-critical bugs and improved application stability, reducing error reports",
      "Developed new page layouts and web structures faithfully reproduced from Figma designs",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    company: "YouVerify",
    role: "Frontend Engineer",
    period: "2021 – 2022",
    location: "Lagos, Nigeria · Hybrid",
    description:
      "Contributed to identity verification and KYC compliance products serving thousands of African businesses.",
    achievements: [
      "Built new product features using Vue.js, Nuxt.js, and Tailwind CSS in an agile environment",
      "Followed SDLC best practices to produce rapid, high-quality feature iterations",
      "Fixed critical bugs on business-facing features, directly improving client satisfaction",
      "Built and maintained the official YouVerify public website, increasing organic traffic",
    ],
    stack: ["Vue.js", "Nuxt.js", "Tailwind CSS"],
  },
  {
    company: "Revent Technologies",
    role: "Frontend Engineer Intern",
    period: "2021",
    location: "Lagos, Nigeria · Onsite",
    description:
      "Started professional engineering career building high-performance Angular applications in a product-first team.",
    achievements: [
      "Participated daily in Agile (Scrum) ceremonies, developing strong collaboration habits early",
      "Built responsive, reusable Angular components and applications from scratch",
      "Translated Figma designs into high-quality, production-ready code with pixel accuracy",
    ],
    stack: ["Angular", "HTML", "CSS", "TypeScript"],
  },
];
