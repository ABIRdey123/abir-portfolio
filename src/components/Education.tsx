import { BookOpen, GraduationCap, Target } from "lucide-react";
import { education } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-20 border-t border-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="01 /" title="Education & Goals" />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <TiltCard
              max={5}
              className="h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-slate-600"
            >
              <div className="tilt-pop flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{education.degree}</h3>
              <p className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 text-cyan-300">
                {education.institution}
                <span className="font-mono text-xs text-slate-500">{education.period}</span>
              </p>
              <div className="mt-6 flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Undergraduate Thesis
                  </p>
                  <p className="mt-1 text-slate-300">{education.thesis}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={120}>
            <TiltCard
              max={5}
              className="h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-slate-600"
            >
              <div className="tilt-pop flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                Next Step: Graduate Research
              </h3>
              <p className="mt-3 leading-relaxed text-slate-400">{education.objective}</p>
              <p className="mt-6 text-xs font-medium uppercase tracking-wider text-slate-500">
                Research Interests
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {education.interests.map((interest) => (
                  <li
                    key={interest}
                    className="relative z-10 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-200 transition hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-violet-500/20"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
