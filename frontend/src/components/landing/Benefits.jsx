import React from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap, Palette } from "lucide-react";
import { SectionHeader } from "@/components/landing/Features";

const BENEFITS = [
  {
    icon: Clock,
    stat: "10x",
    label: "Save Hours of Writing",
    desc: "Captions that used to take 20 minutes now ship in under 60 seconds.",
  },
  {
    icon: TrendingUp,
    stat: "+218%",
    label: "Increase Engagement",
    desc: "Hook-first captions and smart hashtags drive measurable lift.",
  },
  {
    icon: Zap,
    stat: "60s",
    label: "Create Better Content Faster",
    desc: "Brief in, polished caption out — no more staring at a blank screen.",
  },
  {
    icon: Palette,
    stat: "100%",
    label: "Improve Brand Consistency",
    desc: "Lock in a tone once, ship on-brand captions every single day.",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Why Creators Switch"
          title={
            <>
              Real outcomes,{" "}
              <span className="cc-gradient-text">not just words</span>
            </>
          }
          subtitle="What you actually get when you stop wrestling with caption blocks."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl bg-gradient-to-br from-white to-zinc-50 border border-zinc-100 p-7 md:p-8 hover:shadow-xl hover:border-violet-100 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-2xl bg-violet-50 grid place-items-center text-violet-600 mb-4">
                <b.icon className="w-5 h-5" />
              </div>
              <div className="text-4xl md:text-5xl font-black tracking-tighter cc-gradient-text">
                {b.stat}
              </div>
              <div className="mt-2 text-base font-bold text-zinc-900">{b.label}</div>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
