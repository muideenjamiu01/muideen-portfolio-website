import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 9,
    title: "Institutional Management System",
    featured: true,
    category: "Full Stack",
    description: "A full-stack platform with dedicated admin, student, and applicant portals for admissions, payments, course registration, and institutional operations.",
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Prisma"
    ],
    live: "https://institution-management-system.vercel.app/",
    github: "https://github.com/muideenjamiu01/institution-management-system",
    images: [
      {
        src: "/projects/institution-management-system-vercel-app-2026-08-08-21_55_30.png",
        alt: "Institutional Management System homepage"
      },
      {
        src: "/projects/institutional-management-system/admin portal/screencapture-institution-management-system-vercel-app-dashboard-2026-01-20-11_12_05 (1).png",
        alt: "Admin dashboard"
      },
      {
        src: "/projects/institutional-management-system/admin portal/screencapture-institution-management-system-vercel-app-dashboard-course-management-2026-01-20-11_09_58 (1).png",
        alt: "Admin course management"
      },
      {
        src: "/projects/institutional-management-system/admin portal/screencapture-institution-management-system-vercel-app-dashboard-departments-2026-01-20-11_10_45 (1).png",
        alt: "Admin departments"
      },
      {
        src: "/projects/institutional-management-system/applicant portal/screencapture-institution-management-system-vercel-app-applicant-login-2026-01-25-17_32_58.png",
        alt: "Applicant sign in"
      },
      {
        src: "/projects/institutional-management-system/applicant portal/screencapture-institution-management-system-vercel-app-applicant-register-2026-01-25-17_13_02.png",
        alt: "Applicant registration"
      }
    ]
  },
  {
    id: 10,
    title: "Quiz Fun",
    featured: true,
    category: "Web Platforms",
    description: "Quiz experiences for competitions and corporate learning, with dedicated screens for each audience.",
    stack: [],
    live: null,
    github: null,
    images: [
      {
        src: "/projects/Quiz-fun/competition.png",
        alt: "Quiz Fun competitions"
      },
      {
        src: "/projects/Quiz-fun/corporate.png",
        alt: "Quiz Fun corporate learning"
      }
    ]
  },
  {
    id: 11,
    title: "TestAssessify",
    featured: true,
    category: "Web Platforms",
    description: "A digital assessment platform for skills testing and recruitment.",
    stack: [],
    live: null,
    github: null,
    images: [
      {
        src: "/projects/testassesify/screencapture-testassessify-2026-08-08-22_05_29.png",
        alt: "TestAssessify website"
      }
    ]
  },
  {
    id: 12,
    title: "Service School House",
    featured: false,
    category: "Web Platforms",
    description: "Learning and workshop experiences, including the Value Workshop portal.",
    stack: [],
    live: null,
    github: null,
    images: [
      {
        src: "/projects/service-school-house/image.png",
        alt: "Service School House overview"
      },
      {
        src: "/projects/service-school-house/value-workshop/image.png",
        alt: "Value Workshop overview"
      },
      {
        src: "/projects/service-school-house/value-workshop/value-worksho-login.png",
        alt: "Value Workshop sign in"
      }
    ]
  },
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
    images: [{ src: "/images/yv.png", alt: "YouVerify homepage" },
      { src: "/projects/screencapture-youverify-co-en-2026-08-08-21_57_05.png", alt: "YouVerify website overview" }],
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
    images: [{ src: "/images/woozeee.png", alt: "Woozeee homepage" }],
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
    images: [{ src: "/images/youstore.png", alt: "Youstore storefront" }],
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
    images: [{ src: "/images/slack-clone.png", alt: "Slack Clone workspace" }],
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
    images: [{ src: "/images/netflix-react.png", alt: "Netflix Clone browsing" }],
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
    images: [{ src: "/images/veerge.png", alt: "Veerge dashboard" }],
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
    images: [{ src: "/images/lassless.png", alt: "LaslesVPN landing page" }],
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
    images: [{ src: "/images/omnifood.png", alt: "OmniFood landing page" }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];
