import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import TiltCard from "./TiltCard";

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <TiltCard
      className={`group flex h-full flex-col rounded-2xl border bg-slate-900/50 p-7 hover:bg-slate-900/80 ${
        project.featured
          ? "border-cyan-500/40 hover:border-cyan-400/70"
          : "border-slate-800 hover:border-slate-600"
      }`}
    >
      {project.featured && (
        <div
          className="pointer-events-none absolute inset-x-8 -top-px h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent"
          aria-hidden="true"
        />
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="tilt-pop flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20 transition group-hover:bg-cyan-500/20 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
          <Icon className="h-6 w-6" />
        </div>
        <span
          className={`rounded-full px-3 py-1 font-mono text-xs ${
            project.featured
              ? "bg-cyan-400 font-semibold text-slate-950"
              : "border border-slate-700 text-slate-400"
          }`}
        >
          {project.label}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-semibold text-white transition-colors group-hover:text-cyan-50">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 hover:text-cyan-300"
          >
            {project.title}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-slate-400">{project.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors group-hover:bg-slate-800"
          >
            {tag}
          </li>
        ))}
      </ul>
    </TiltCard>
  );
}
