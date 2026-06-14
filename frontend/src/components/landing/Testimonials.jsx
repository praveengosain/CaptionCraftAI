import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/landing/Features";

const TESTIMONIALS = [
  {
    name: "Maya Chen",
    role: "Travel Creator · 184k followers",
    avatar:
      "https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=160&h=160&fit=crop",
    quote:
      "My captions used to take 30 minutes. With CaptionCraft I'm posting twice as often and my saves are up 3x. It actually sounds like me.",
  },
  {
    name: "Jordan Hayes",
    role: "Social Media Manager · Bloom Studio",
    avatar:
      "https://images.unsplash.com/photo-1603217039863-aa0c865404f7?w=160&h=160&fit=crop",
    quote:
      "I manage 6 brand accounts. The tone presets keep each voice unique — clients can't believe the same tool wrote them all.",
  },
  {
    name: "Priya Raghavan",
    role: "Founder · Lumen Wellness",
    avatar:
      "https://images.unsplash.com/photo-1582152629442-4a864303fb96?w=160&h=160&fit=crop",
    quote:
      "The hashtag mix is the real unlock. We're finally reaching people outside our bubble — engagement on Reels jumped 218% in 4 weeks.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Loved by Creators"
          title={
            <>
              Trusted by creators,{" "}
              <span className="cc-gradient-text">studios, and brands</span>
            </>
          }
          subtitle="Real stories from people shipping content with CaptionCraft AI every day."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`bg-white rounded-3xl border border-zinc-100 p-7 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 ${
                i === 1 ? "md:translate-y-6" : ""
              }`}
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-base md:text-[17px] text-zinc-800 leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-violet-100"
                />
                <div>
                  <div className="text-sm font-bold text-zinc-900">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
