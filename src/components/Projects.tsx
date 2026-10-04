import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          index="02 /"
          title="Featured Projects"
          subtitle="Research and engineering work across machine learning, computational science, web development, compilers, and embedded systems."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={project.featured ? 0 : ((i + 1) % 2) * 120}
              className={project.featured ? "md:col-span-2" : undefined}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
