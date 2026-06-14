import React from "react";
import { motion } from "framer-motion";
import { Pencil, Sliders, Sparkles, Instagram } from "lucide-react";
import { SectionHeader } from "@/components/landing/Features";

const STEPS = [
  {
    icon: Pencil,
    title: "Enter your post topic",
    desc: "Drop in a quick brief — a product, moment, mood, or message.",
  },
  {
    icon: Sliders,
    title: "Choose tone & length",
    desc: "Pick from 5 tones and 3 lengths. Match your brand voice in one click.",
  },
  {
    icon: Sparkles,
    title: "Generate instantly",
    desc: "GPT-5.2 crafts a caption, hashtag set, and call-to-action in seconds.",
  },
  {
    icon: Instagram,
    title: "Copy & post on Instagram",
    desc: "One-click copy. Paste straight into the Instagram app and ship it.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="How It Works"
          title={
            <>
              From blank screen to{" "}
              <span className="cc-gradient-text">posted in 60 seconds</span>
            </>
          }
          subtitle="Four lightweight steps. No prompts to memorise, no playbooks to read."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {/* Dotted connector for large screens */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] border-t-2 border-dashed border-zinc-200" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white rounded-3xl border border-zinc-100 p-7 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-pink-100 grid place-items-center text-violet-700">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full cc-gradient-bg text-white text-[11px] font-bold grid place-items-center shadow-md">
                    {i + 1}
                  </span>
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-zinc-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
