import { ArrowDown, ArrowRight, Download, Sparkles } from "lucide-react";
import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/lib/data";
import NeuralSphere from "./NeuralSphere";

// Only offer the download once the PDF has actually been added to /public.
const hasResume = existsSync(path.join(process.cwd(), "public", profile.resume));

const rise = (delay: number) => ({ animationDelay: `${delay}ms` });

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-8 px-6 pt-28 pb-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative z-10">
          <span
            className="animate-rise inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur-sm"
            style={rise(0)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            {profile.status}
          </span>

          <h1
            className="animate-rise mt-6 bg-linear-to-br from-white via-white to-cyan-300 bg-clip-text pb-2 text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
            style={rise(100)}
          >
            {profile.name}
          </h1>

          <p
            className="animate-rise mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-slate-400 sm:text-base"
            style={rise(200)}
          >
            {profile.headline.map((part, i) => (
              <span key={part} className="flex items-center gap-3">
                {i > 0 && <span className="text-cyan-500/60">|</span>}
                <span className={i === profile.headline.length - 1 ? "text-cyan-300" : undefined}>
                  {part}
                </span>
              </span>
            ))}
          </p>

          <p
            className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-slate-300"
            style={rise(300)}
          >
            {profile.intro}
          </p>

          <div className="animate-rise mt-10 flex flex-col gap-4 sm:flex-row" style={rise(400)}>
            {hasResume && (
              <a
                href={profile.resume}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-400/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            )}
            <a
              href="#projects"
              className={
                hasResume
                  ? "group inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/40 px-6 py-3 font-semibold text-slate-200 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800/60"
                  : "group inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-400/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              }
            >
              <Sparkles className="h-4 w-4" />
              View My Work
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/40 px-6 py-3 font-semibold text-slate-200 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800/60"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* On small screens the sphere sits faintly behind the text; on large screens it gets its own column. */}
        <div className="pointer-events-none absolute inset-0 opacity-30 lg:pointer-events-auto lg:relative lg:inset-auto lg:aspect-square lg:opacity-100">
          <div className="animate-rise h-full w-full" style={rise(250)}>
            <NeuralSphere className="h-full w-full" />
          </div>
          <p className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 font-mono text-xs text-slate-500 lg:block">
            drag to rotate
          </p>
        </div>
      </div>

      <a
        href="#education"
        aria-label="Scroll to Education"
        className="animate-float absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full border border-slate-800 p-2 text-slate-500 transition-colors hover:border-cyan-500/50 hover:text-cyan-300 sm:block"
      >
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
}
