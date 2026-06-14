import React from "react";
import { motion } from "framer-motion";
import { Wand2, Hash, Mic2, Smile, Megaphone, Copy } from "lucide-react";

const FEATURES = [
  {
    icon: Wand2,
    title: "AI Caption Generator",
    desc: "GPT-powered captions that hook readers in the first 2 lines and keep them scrolling.",
    span: "md:col-span-2",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Hash,
    title: "Smart Hashtag Suggestions",
    desc: "10–15 mixed-volume hashtags blended for niche reach + viral discovery.",
    span: "md:col-span-1",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Mic2,
    title: "Multiple Tone Options",
    desc: "Professional, Casual, Funny, Inspirational or Luxury — switch your voice with one click.",
    span: "md:col-span-1",
    accent: "from-blue-500 to-violet-500",
  },
  {
    icon: Smile,
    title: "Emoji Optimization",
    desc: "Tasteful, on-brand emojis placed naturally — not sprinkled like confetti.",
    span: "md:col-span-1",
    accent: "from-pink-500 to-orange-400",
  },
  {
    icon: Megaphone,
    title: "Engagement Boosting CTAs",
    desc: "Every caption ships with a call-to-action that turns lurkers into followers.",
    span: "md:col-span-2",
    accent: "from-violet-600 to-blue-600",
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    desc: "Copy caption, hashtags, or both — paste directly into Instagram and post.",
    span: "md:col-span-1",
    accent: "from-fuchsia-500 to-violet-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Features"
          title={
            <>
              Everything you need to{" "}
              <span className="cc-gradient-text">ship better content</span>
            </>
          }
          subtitle="A complete caption studio — built for creators who post daily and brands that need to stay consistent."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`group bg-white rounded-3xl border border-zinc-100 p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-violet-100 transition-all duration-500 ${f.span}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.accent} grid place-items-center text-white shadow-[0_10px_24px_rgba(139,92,246,0.25)] mb-5`}
              >
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900">
                {f.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-zinc-600 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center" }) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-violet-600 mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight text-zinc-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-zinc-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
