import React from "react";
import { Sparkles, Twitter, Instagram, Linkedin } from "lucide-react";
import { LANDING } from "@/constants/testIds";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="border-t border-zinc-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl cc-gradient-bg grid place-items-center shadow-[0_8px_20px_rgba(139,92,246,0.3)]">
              <Sparkles className="w-5 h-5 text-white" />
            </span>
            <span className="font-bold text-lg tracking-tight">
              CaptionCraft <span className="cc-gradient-text">AI</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-zinc-600 max-w-xs leading-relaxed">
            The AI caption studio for creators, influencers, and brands who want to
            ship content that actually grows.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="w-9 h-9 rounded-full border border-zinc-200 grid place-items-center text-zinc-600 hover:text-violet-700 hover:border-violet-200 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn
          title="Product"
          links={[
            { label: "Features", href: "#features", testId: LANDING.footerFeatures },
            { label: "Pricing", href: "#pricing", testId: LANDING.footerPricing },
            { label: "Live Demo", href: "#demo" },
          ]}
        />
        <FooterColumn
          title="Company"
          links={[
            { label: "About", href: "#", testId: LANDING.footerAbout },
            { label: "Contact", href: "#contact", testId: LANDING.footerContact },
          ]}
        />
        <FooterColumn
          title="Legal"
          links={[
            { label: "Privacy Policy", href: "#", testId: LANDING.footerPrivacy },
            { label: "Terms of Service", href: "#" },
          ]}
        />
      </div>

      <div className="border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <span>© {year} CaptionCraft AI. All rights reserved.</span>
          <span>
            Built with care for creators ·{" "}
            <span className="cc-gradient-text font-semibold">Made with Emergent</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              data-testid={l.testId}
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
