"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, ImageOff, Loader2, Scan, X } from "lucide-react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectPreviewProps {
  project: Project;
  active: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

export function ProjectPreview({ project, active, onChange, onClose }: ProjectPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const titleId = useId();
  const hintId = useId();
  const [fullWidth, setFullWidth] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const image = project.images[active];
  const multiple = project.images.length > 1;
  const change = (direction: number) => onChange((active + direction + project.images.length) % project.images.length);

  useEffect(() => {
    const dialog = dialogRef.current!;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      Object.assign(body.style, previous);
      window.scrollTo({ top: scrollY, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
    thumbnailRefs.current[active]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
  }, [active, fullWidth]);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={hintId}
      aria-modal="true"
      className="project-preview"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          event.stopPropagation();
          if (multiple) change(event.key === "ArrowLeft" ? -1 : 1);
        }
        if (event.key === "Tab") {
          const controls = Array.from(dialogRef.current!.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex="0"]'));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl sm:rounded-3xl">
        <header className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-secondary)]">Project gallery</p>
            <h2 id={titleId} className="truncate text-base font-semibold sm:text-xl">{project.title}</h2>
          </div>
          <button type="button" onClick={() => setFullWidth((value) => !value)} aria-pressed={fullWidth} aria-label={fullWidth ? "Fit image to screen" : "View image at full width"} className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]">
            {fullWidth ? <Scan className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
            <span className="hidden sm:inline">{fullWidth ? "Fit to screen" : "Full width"}</span>
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close image preview" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"><X className="h-5 w-5" /></button>
        </header>

        <div
          ref={viewportRef}
          className={cn("preview-canvas relative min-h-0 flex-1 overflow-auto overscroll-contain p-3 sm:p-6", !fullWidth && "flex items-center justify-center")}
          tabIndex={0}
          role="region"
          aria-label="Screenshot viewer"
          onTouchStart={(event) => { if (event.touches.length === 1) touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; else touchStart.current = null; }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={(event) => {
            if (!touchStart.current) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            if (!fullWidth && multiple && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) change(dx < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          {loadedSrc !== image.src && failedSrc !== image.src && <div role="status" className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]"><Loader2 className="h-5 w-5 motion-safe:animate-spin" />Loading screenshot…</div>}
          {failedSrc === image.src ? (
            <div role="alert" className="m-auto flex flex-col items-center gap-3 p-8 text-center text-[var(--text-secondary)]"><ImageOff className="h-8 w-8" /><p>This screenshot couldn’t load. Try another image.</p></div>
          ) : (
            // Load the original only when requested, preserving detail in full-width mode.
            // eslint-disable-next-line @next/next/no-img-element
            <img key={image.src} src={image.src} alt={image.alt} onLoad={() => setLoadedSrc(image.src)} onError={() => setFailedSrc(image.src)} draggable={false} className={cn("relative rounded-lg", fullWidth ? "block h-auto w-full" : "h-full w-full object-contain", loadedSrc !== image.src && "opacity-0")} />
          )}
        </div>

        <footer className="shrink-0 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1" aria-live="polite" aria-atomic="true">
              <p className="truncate text-sm font-medium text-[var(--text-primary)]">{image.alt}</p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">{String(active + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</p>
            </div>
            {multiple && <div className="flex gap-2">
              <button type="button" onClick={() => change(-1)} aria-label="Previous image" className="preview-arrow"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => change(1)} aria-label="Next image" className="preview-arrow"><ChevronRight className="h-5 w-5" /></button>
            </div>}
          </div>
          {multiple && <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:px-6" aria-label="Gallery thumbnails">
            {project.images.map((slide, index) => (
              <button key={slide.src} ref={(node) => { thumbnailRefs.current[index] = node; }} type="button" onClick={() => onChange(index)} aria-label={`Preview image ${index + 1}: ${slide.alt}`} aria-current={active === index ? "true" : undefined} className={cn("relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-[var(--bg-tertiary)] transition-opacity sm:h-14 sm:w-24", active === index ? "border-indigo-400" : "border-transparent opacity-60 hover:opacity-100")}>
                <Image src={slide.src} alt="" fill sizes="96px" className="object-cover object-top" />
                <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 rounded bg-black/75 px-1 text-[9px] text-white">{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>}
          <p id={hintId} className="border-t border-[var(--border)] px-4 py-2 text-center text-[10px] text-[var(--text-secondary)] sm:px-6 sm:text-[11px]"><span className="sm:hidden">{multiple ? "Swipe to browse · " : ""}Expand to read the details</span><span className="hidden sm:inline">{multiple ? "← → Browse images · " : ""}Esc to close · Full width to explore the details</span></p>
        </footer>
      </div>
    </dialog>,
    document.body
  );
}
