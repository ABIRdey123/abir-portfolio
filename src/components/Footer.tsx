import { Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import CopyEmail from "./CopyEmail";
import Reveal from "./Reveal";

const socials = [
  { label: "GitHub", href: profile.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false },
];

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-slate-900">
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <div
          className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]"
          aria-hidden="true"
        />
        <Reveal className="relative">
          <p className="font-mono text-sm text-cyan-400">05 /</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            I&apos;m open to conversations about graduate research, collaborations, and
            opportunities in AI and machine learning.
          </p>
          <div>
            <CopyEmail email={profile.email} />
          </div>

          <ul className="mt-10 flex justify-center gap-4">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition hover:-translate-y-1 hover:border-cyan-500/60 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="relative mt-16 text-sm text-slate-600">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
