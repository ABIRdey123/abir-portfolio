import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ index, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12">
      <p className="flex items-center gap-3 font-mono text-sm text-cyan-400">
        {index}
        <span className="h-px w-12 bg-linear-to-r from-cyan-400/60 to-transparent" aria-hidden="true" />
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-slate-400">{subtitle}</p>}
    </Reveal>
  );
}
