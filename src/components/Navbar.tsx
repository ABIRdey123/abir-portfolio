"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Written straight to the DOM so scrolling doesn't re-render the navbar.
      progressRef.current?.style.setProperty(
        "transform",
        `scaleX(${max > 0 ? window.scrollY / max : 0})`,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for whichever section is crossing the middle of the viewport.
  useEffect(() => {
    // "#top" (the hero) has no link, so reaching it clears the highlight.
    const sections = ["#top", ...navLinks.map((link) => link.href)]
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-semibold text-white">
          {profile.name.split(" ").map((p) => p[0]).join("")}
          <span className="text-cyan-400">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "location" : undefined}
                className={`text-sm transition-colors hover:text-white ${
                  active === link.href ? "text-cyan-300" : "text-slate-400"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-slate-300 hover:bg-slate-800 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        ref={progressRef}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-linear-to-r from-cyan-400 to-violet-500"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      {open && (
        <ul className="space-y-1 border-t border-slate-800 px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.href ? "location" : undefined}
                className={`block rounded-md px-3 py-2 hover:bg-slate-800 hover:text-white ${
                  active === link.href ? "text-cyan-300" : "text-slate-300"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
