import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { LANDING } from "@/constants/testIds";

const links = [
  { id: "features", label: "Features", testId: LANDING.navFeatures },
  { id: "how-it-works", label: "How It Works", testId: LANDING.navHowItWorks },
  { id: "pricing", label: "Pricing", testId: LANDING.navPricing },
  { id: "faq", label: "FAQ", testId: LANDING.navFaq },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid={LANDING.navLogo}
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="w-9 h-9 rounded-xl cc-gradient-bg grid place-items-center shadow-[0_8px_20px_rgba(139,92,246,0.35)] group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </span>
          <span className="font-bold text-lg tracking-tight">
            CaptionCraft <span className="cc-gradient-text">AI</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={l.testId}
              onClick={() => handleNav(l.id)}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          data-testid={LANDING.navCta}
          onClick={() => handleNav("demo")}
          className="hidden md:inline-flex cc-gradient-bg text-white font-semibold rounded-full px-5 py-2.5 text-sm shadow-[0_8px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_10px_30px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Try Free
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg border border-zinc-200 bg-white"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="block w-full text-left text-sm font-medium text-zinc-700"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("demo")}
            className="block w-full cc-gradient-bg text-white font-semibold rounded-full px-5 py-2.5 text-sm text-center"
          >
            Try Free
          </button>
        </div>
      )}
    </header>
  );
}
