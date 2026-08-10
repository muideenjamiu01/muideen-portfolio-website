import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "YouVerify Website",
    featured: true,
    category: "React",
    description:
      "Official marketing website for YouVerify, Nigeria's leading identity verification and KYC compliance platform. Rebuilt key pages for speed and responsiveness, and architected a reusable component library that accelerated future feature development.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    live: "https://www.youverify.co/",
    github: null,
    image: "/projects/youverify.png",
  },
  {
    id: 2,
    title: "Woozeee Platform",
    featured: true,
    category: "React",
    description:
      "Feature engineering on Woozeee, a social and lifestyle super-app for African millennials. Delivered end-to-end features — from design handoff to production deploy — while maintaining a shared component library used across the entire web frontend.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    live: "https://www.woozeee.com/",
    github: null,
    image: "/projects/woozeee.png",
  },
  {
    id: 3,
    title: "Youstore E-Commerce",
    featured: true,
    category: "Full Stack",
    description:
      "Multi-merchant e-commerce platform where vendors can manage independent storefronts and product catalogues. Built with a React frontend, Redux for cart and auth state, and a Node.js/MongoDB backend supporting full CRUD and order management.",
    stack: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    live: "https://youstore-staging.netlify.app/",
    github: "https://github.com/muideenjamiu01/multi-merchant_e-commerce",
    image: "/projects/youstore.png",
  },
  {
    id: 4,
    title: "Slack Clone",
    featured: false,
    category: "Full Stack",
    description:
      "Real-time team messaging application replicating core Slack UX: workspace channels, direct messages, and Google OAuth — all powered by Firebase's real-time database and authentication SDK.",
    stack: ["React", "Firebase", "CSS"],
    live: "https://slack-clone-7fa06.web.app/",
    github: "https://github.com/muideenjamiu01/slack-clone",
    image: "/projects/slack.png",
  },
  {
    id: 5,
    title: "Netflix Clone",
    featured: false,
    category: "React",
    description:
      "Faithful Netflix UI recreation with dynamic content pulled from the TMDB API. Features genre-based browsing, movie detail modals, and a responsive grid layout that adapts gracefully from mobile to widescreen.",
    stack: ["React", "TMDB API", "CSS"],
    live: "https://netflixclone-with-reactjs.netlify.app/",
    github: "https://github.com/muideenjamiu01/netflix-react",
    image: "/projects/netflix.png",
  },
  {
    id: 6,
    title: "Veerge Dashboard",
    featured: false,
    category: "React",
    description:
      "Property management dashboard built as a technical assessment, showcasing attention to detail in data-dense UI: sortable tables, status filters, and a clean sidebar navigation — all implemented from a Figma spec with zero framework shortcuts.",
    stack: ["React", "CSS"],
    live: "https://veerge-for-maintenance.netlify.app/",
    github: "https://github.com/muideenjamiu01/Matador-trust-front-end-Assesment",
    image: "/projects/veerge.png",
  },
  {
    id: 7,
    title: "LaslesVPN Landing Page",
    featured: false,
    category: "Landing Pages",
    description:
      "Pixel-perfect responsive landing page converted from a Figma design for a VPN service. Demonstrates precise CSS layout skills, custom SVG illustrations, and a clean SCSS architecture with no utility framework.",
    stack: ["HTML", "SCSS", "Vanilla JS"],
    live: "https://laslessvpndesign.netlify.app/",
    github: "https://github.com/muideenjamiu01/lasless-figma-design",
    image: "/projects/laslesvpn.png",
  },
  {
    id: 8,
    title: "OmniFood Landing Page",
    featured: false,
    category: "Landing Pages",
    description:
      "Modern food delivery service landing page built as a deep-dive CSS project. Focuses on fluid grid layouts, smooth scroll behaviors, and a mobile-first approach — all without a single line of JavaScript framework.",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "https://omifoodclone.netlify.app/",
    github: "https://github.com/muideenjamiu01/OmniFood-sample-web",
    image: "/projects/omnifood.png",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];
