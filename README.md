# Muideen Jamiu — Frontend Engineer Portfolio

A modern, responsive portfolio showcasing Muideen Jamiu's professional experience, technical capabilities, and selected frontend engineering work.

Built with Next.js, TypeScript, and Tailwind CSS, the site prioritizes accessibility, performance, maintainability, and a polished experience across devices.

## Overview

This project is a personal portfolio built on the Next.js App Router. It presents professional experience and project case studies through reusable, data-driven components, while providing a validated contact workflow backed by Resend.

Live site: [muideenjamiu-is-a.dev](https://muideenjamiu-is-a.dev)

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
| `RESEND_API_KEY` | For sending mail | Resend API key used by the contact endpoint to send messages. |
| `CONTACT_FROM_EMAIL` | For sending mail | Sender address on your verified Resend domain. |
| `CONTACT_EMAIL` | No | Destination address for contact submissions. Defaults to the portfolio owner's email address. |

Example `.env.local`:

```dotenv
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=muideenjamiu01@gmail.com
CONTACT_FROM_EMAIL="Portfolio Contact <contact@muideenjamiu-is-a.dev>"
```

When the API key or sender address is missing, the endpoint returns HTTP 503 and the form offers a direct email link. A successful response requires Resend to accept the message; final inbox delivery can be checked in Resend.

> Never commit `.env.local` or any API key to source control. Configure production secrets in the hosting provider's environment settings.
 
## Available commands

| Command | Purpose |
| --- | --- |
| `npm test` | Runs contact endpoint and public asset regression tests without sending email. |
| `npm run dev` | Starts the local development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Runs the production server after a successful build. |
| `npm run lint` | Runs the Next.js lint checks. The first run prompts for an ESLint configuration if one has not been created. |

Before opening a pull request or deploying a release, run:

```bash
npm run lint
npm run build
```

The active project listing lives in `src/data/projects.ts`; `src/app/draft.tsx` is an archived reference.

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

1. In [Resend Domains](https://resend.com/domains), add `muideenjamiu-is-a.dev` and enable sending. Copy the exact DNS records Resend provides.
2. In Porkbun, open **Domain Management → DNS** for this domain and add those records. If you changed your nameservers to Vercel, add the records in Vercel DNS instead. Preserve the records that connect your website to Vercel. You only need sending enabled in Resend for this form.
3. Wait for Resend to show the domain as verified, then create a sending API key.
4. In **Vercel → Project → Settings → Environment Variables**, add these for Production (and Preview if wanted):
   - `RESEND_API_KEY`: your private Resend key.
   - `CONTACT_EMAIL`: `muideenjamiu01@gmail.com`.
   - `CONTACT_FROM_EMAIL`: `Portfolio Contact <contact@muideenjamiu-is-a.dev>`.
5. Redeploy this code after saving the variables. Submit the form, check Resend's delivery status, and check your Gmail inbox/spam folder. Replying to the notification addresses the visitor automatically.

See [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction) and [Vercel environment variables](https://vercel.com/docs/environment-variables).

The direct Gmail link already opens the visitor's email app. If you also want people to email `hello@muideenjamiu-is-a.dev`, click the envelope icon in Porkbun, choose **Email Forwarding**, and forward `hello` to `muideenjamiu01@gmail.com`. This is separate from the website form. Follow [Porkbun's forwarding guide](https://kb.porkbun.com/article/10-how-to-set-up-email-forwarding-service), including its instructions for externally hosted DNS when applicable. Forwarding receives mail; replies from Gmail use your Gmail address.

### Resume and project screenshots

`public/Muideen_Jamiu_CV.pdf` is a snapshot exported from the supplied Google Doc. The existing Download CV buttons now serve this file. Replace the PDF after future resume edits.

Each project in `src/data/projects.ts` has an `images` array of `{ src, alt }` entries. Add screenshots to `public/` and list them there. Galleries support previous/next buttons, left/right keys, and swipes. Clicking a screenshot opens an accessible on-page dialog with thumbnails, image navigation, Escape/backdrop dismissal, and a full-width mode for reading tall screenshots. Closing restores focus and the page scroll position. Single-image projects also support preview. Card images and thumbnails use Next.js optimization; full-resolution originals load only when the viewer opens.

Run `npm run build` then `npm run test:e2e` for gallery browser tests (install Chromium once with `npx playwright install chromium`). These cover focus, scrolling, keyboard and swipe navigation, filtering, light/dark themes, and image failures.

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
3. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_EMAIL` under project environment variables.
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

- Website: [muideenjamiu-is-a.dev](https://muideenjamiu-is-a.dev)
- LinkedIn: [muideen-muhammed-jamiu](https://linkedin.com/in/muideen-muhammed-jamiu)
- GitHub: [muideenjamiu01](https://github.com/muideenjamiu01)
- Email: [muideenjamiu01@gmail.com](mailto:muideenjamiu01@gmail.com)

## License

No open-source license is currently provided. Unless stated otherwise, the source code and portfolio content are copyright © Muideen Muhammed Jamiu. All rights reserved.
