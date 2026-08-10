# Muideen Jamiu — Frontend Engineer Portfolio

A modern, responsive portfolio showcasing Muideen Jamiu's professional experience, technical capabilities, and selected frontend engineering work.

Built with Next.js, TypeScript, and Tailwind CSS, the site prioritizes accessibility, performance, maintainability, and a polished experience across devices.

## Overview

This project is a personal portfolio built on the Next.js App Router. It presents professional experience and project case studies through reusable, data-driven components, while providing a validated contact workflow backed by Resend.

Live site: [muideenjamiu.dev](https://muideenjamiu.dev)

## Key features

- Responsive, mobile-first interface
- Light and dark themes with persisted user preference
- Accessible landmarks, focus states, skip navigation, and reduced-motion support
- Animated page sections and interactions using Framer Motion
- Active-section navigation and reading-progress indicator
- Filterable, data-driven project showcase
- Client- and server-side contact-form validation with Zod
- Transactional email delivery through Resend
- SEO-ready metadata, Open Graph, and Twitter card configuration
- Privacy-friendly traffic insights through Vercel Analytics
- Strict TypeScript configuration and reusable UI primitives

## Technology stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| UI | React 18 |
| Styling | Tailwind CSS 3, CSS custom properties |
| Animation | Framer Motion |
| Forms | React Hook Form, Zod |
| Icons | Lucide React, React Icons |
| Notifications | Sonner |
| Email | Resend |
| Analytics | Vercel Analytics |
| Deployment | Vercel-ready |

## Getting started

### Prerequisites

- Node.js 18.17 or later
- npm 9 or later
- A Resend account, only if real contact-form email delivery is required

### Installation

```bash
git clone <repository-url>
cd my-portofolio
npm ci
```

Create `.env.local` when email delivery is required, using the variables shown in the [Environment variables](#environment-variables) section.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Production only | Resend API key used by the contact endpoint to send messages. |
| `CONTACT_EMAIL` | No | Destination address for contact submissions. Defaults to the portfolio owner's email address. |

Example `.env.local`:

```dotenv
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=hello@example.com
```

When `RESEND_API_KEY` is not set, the contact endpoint runs in preview mode: it validates the request and returns a successful response without sending an email. This keeps local and preview deployments functional without exposing credentials.

> Never commit `.env.local` or any API key to source control. Configure production secrets in the hosting provider's environment settings.
 
## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the local development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Runs the production server after a successful build. |
| `npm run lint` | Runs the Next.js lint checks. The first run prompts for an ESLint configuration if one has not been created. |

Before opening a pull request or deploying a release, run:

```bash
npm run lint
npm run build
```

> **Current build status:** the production build is blocked by the legacy `src/app/draft.tsx` file, which references `react-reveal/Fade` and image modules that are not part of the active portfolio implementation. Remove the unused draft from TypeScript compilation or migrate its imports before treating the build as release-ready.

## Project structure

```text
.
├── public/                      # Static images, documents, and project media
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts # Validated contact email endpoint
│   │   ├── globals.css          # Theme tokens and global styles
│   │   ├── layout.tsx           # Root layout, metadata, and providers
│   │   └── page.tsx             # Portfolio landing page
│   ├── components/
│   │   ├── layout/              # Navbar and footer
│   │   ├── sections/            # Page-level portfolio sections
│   │   └── ui/                  # Reusable interface primitives
│   ├── data/                    # Projects, experience, and skills content
│   ├── hooks/                   # Navigation and scroll behavior
│   ├── lib/                     # Site configuration and shared utilities
│   └── types/                   # Shared TypeScript contracts
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

The content model is deliberately separated from presentation. Most portfolio updates can be completed in `src/data` or `src/lib/constants.ts` without changing component logic.

## Customization

### Personal and social information

Update `src/lib/constants.ts` to change the name, title, location, availability, contact details, CV path, and social profiles.

### Portfolio content

- `src/data/projects.ts` — project descriptions, technology tags, links, and media
- `src/data/experience.ts` — employment history, responsibilities, and achievements
- `src/data/skills.ts` — technical competencies and proficiency groups

Store related media under `public/` and reference each asset using an absolute public path such as `/projects/project-name.png`.

### Branding and metadata

- Update SEO and social-sharing metadata in `src/app/layout.tsx`.
- Adjust theme tokens and shared visual styles in `src/app/globals.css`.
- Extend design tokens and animations in `tailwind.config.ts`.
- Add `public/og-image.png` at `1200 × 630` for social previews.
- Add the résumé file referenced by `SITE_CONFIG.cvUrl` to `public/`.

### Contact email delivery

The API route uses `onboarding@resend.dev` as its sender, which is suitable for initial Resend testing. For production delivery, verify a sending domain in Resend and update the `from` address in `src/app/api/contact/route.ts`.

## Engineering considerations

### Accessibility

The interface includes semantic sections, accessible form feedback, keyboard-visible focus states, a skip link, descriptive labels, and a global `prefers-reduced-motion` fallback. Any new interaction should remain fully operable without a mouse and preserve meaningful focus order.

### Performance

Next.js font optimization, server rendering, optimized production builds, and component-level client boundaries are used to keep the initial experience efficient. Compress new media before adding it and prefer Next.js image optimization for content images.

### Security

Contact submissions are validated on the server before delivery. Secrets remain server-side and must be supplied through environment variables. For a high-traffic public deployment, consider adding rate limiting, bot protection, and a stricter Content Security Policy.

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Keep the detected framework preset as **Next.js**.
3. Add `RESEND_API_KEY` and `CONTACT_EMAIL` under project environment variables.
4. Deploy and verify the contact form from the production domain.

The application can also run on any platform that supports a Node.js-hosted Next.js application:

```bash
npm ci
npm run build
npm run start
```

## Contributing

This repository represents a personal portfolio, but focused improvements are welcome where collaboration is enabled.

1. Create a branch from the latest default branch.
2. Keep changes scoped and follow the existing TypeScript and component conventions.
3. Validate responsive behavior, keyboard navigation, and both color themes.
4. Run the lint and production build checks.
5. Open a pull request with a concise description and screenshots for visual changes.

## Contact

**Muideen Muhammed Jamiu** — Senior Frontend Engineer

- Website: [muideenjamiu.dev](https://muideenjamiu.dev)
- LinkedIn: [muideen-muhammed-jamiu](https://linkedin.com/in/muideen-muhammed-jamiu)
- GitHub: [muideenjamiu01](https://github.com/muideenjamiu01)
- Email: [muideenjamiu01@gmail.com](mailto:muideenjamiu01@gmail.com)

## License

No open-source license is currently provided. Unless stated otherwise, the source code and portfolio content are copyright © Muideen Muhammed Jamiu. All rights reserved.
