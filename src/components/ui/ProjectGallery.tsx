"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "./ProjectPreview";

const surfaces = ["from-indigo-500/15 to-violet-500/5", "from-cyan-500/15 to-blue-500/5", "from-emerald-500/15 to-teal-500/5"];

export function ProjectGallery({ project, featured = false }: { project: Project; featured?: boolean }) {
  const [active, setActive] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);
  const image = project.images[active];
  const multiple = project.images.length > 1;
  const change = (direction: number) => setActive((current) => (current + direction + project.images.length) % project.images.length);

  if (!image) return null;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${project.title} screenshots`} className="flex h-full min-w-0 flex-col" onKeyDown={(event) => {
      if (!previewOpen && multiple && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault(); change(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
      <div className={cn("flex flex-1 items-center bg-gradient-to-br p-4 sm:p-6", surfaces[project.id % surfaces.length], featured && "lg:p-8")}>
        <button
          type="button"
          aria-label={`Preview ${project.title} images`}
          aria-haspopup="dialog"
          onClick={(event) => { if (!didSwipe.current || event.detail === 0) setPreviewOpen(true); didSwipe.current = false; }}
          onTouchStart={(event) => { didSwipe.current = false; touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
          onTouchCancel={() => { touchStart.current = null; didSwipe.current = false; }}
          onTouchEnd={(event) => {
            if (!touchStart.current) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            if (multiple && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { didSwipe.current = true; change(dx < 0 ? 1 : -1); }
            touchStart.current = null;
          }}
          className="group/preview relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg touch-pan-y focus-visible:outline-offset-4"
        >
          <Image key={image.src} src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 600px" className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/preview:scale-[1.025]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 bg-black/75 px-4 text-xs font-medium text-white backdrop-blur-md transition-colors group-hover/preview:bg-indigo-600"><Maximize2 className="h-3.5 w-3.5" />Preview images</span>
        </button>
      </div>
      <div className="flex min-h-16 items-center gap-3 border-b border-t border-[var(--border)] px-4 sm:px-6">
        <p aria-live="polite" aria-atomic="true" className="min-w-0 flex-1 truncate text-xs text-[var(--text-secondary)]">{image.alt}</p>
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-[var(--text-secondary)]">{String(active + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</span>
        {multiple && <div className="flex shrink-0 gap-1">
          <button type="button" onClick={() => change(-1)} aria-label={`Previous screenshot of ${project.title}`} className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => change(1)} aria-label={`Next screenshot of ${project.title}`} className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"><ChevronRight className="h-4 w-4" /></button>
        </div>}
      </div>
      {previewOpen && <ProjectPreview project={project} active={active} onChange={setActive} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}
