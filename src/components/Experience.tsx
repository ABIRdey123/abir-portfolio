import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="03 /" title="Experience" />
        <ol className="relative space-y-6 border-l border-slate-800 pl-8 sm:pl-10">
          {experience.map(({ role, organization, period, description, icon: Icon }, i) => (
            <li key={role} className="relative">
              <span
                className="absolute top-7 -left-8 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-500/50 bg-slate-950 sm:-left-10"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              <Reveal delay={i * 100}>
                <TiltCard
                  max={4}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-600 sm:p-7"
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="tilt-pop flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-lg font-semibold text-white">{role}</h3>
                        {period && <p className="font-mono text-xs text-slate-500">{period}</p>}
                      </div>
                      <p className="text-cyan-300">{organization}</p>
                      <p className="mt-3 leading-relaxed text-slate-400">{description}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
