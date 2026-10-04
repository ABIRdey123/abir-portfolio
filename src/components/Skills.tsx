import { skillGroups, softSkills, spokenLanguages } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="04 /" title="Technical Arsenal" />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map(({ category, icon: Icon, skills }, i) => (
            <Reveal key={category} delay={(i % 2) * 120}>
              <TiltCard
                max={5}
                className="group h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-7 hover:border-slate-600"
              >
                <div className="flex items-center gap-3">
                  <div className="tilt-pop flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/20">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-white">{category}</h3>
                  <span className="ml-auto font-mono text-xs text-slate-600">
                    {String(skills.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="relative z-10 cursor-default rounded-lg border border-slate-700/80 bg-slate-950/60 px-3 py-1.5 text-sm text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-500/50 hover:text-cyan-200 hover:shadow-md hover:shadow-cyan-500/10"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          <p>
            <span className="font-mono text-xs tracking-wider text-slate-500 uppercase">Soft skills</span>
            <span className="ml-3 text-slate-300">{softSkills.join(" · ")}</span>
          </p>
          <p>
            <span className="font-mono text-xs tracking-wider text-slate-500 uppercase">Languages</span>
            <span className="ml-3 text-slate-300">{spokenLanguages.join(" · ")}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
