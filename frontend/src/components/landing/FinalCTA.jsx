import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { LANDING } from "@/constants/testIds";

export default function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-zinc-900 text-white px-8 md:px-16 py-16 md:py-24 text-center"
        >
          {/* Gradient orbs */}
          <div className="absolute -top-32 -left-20 w-[400px] h-[400px] rounded-full bg-violet-600/40 blur-[120px]" />
          <div className="absolute -bottom-32 -right-20 w-[420px] h-[420px] rounded-full bg-pink-500/40 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-blue-500/25 blur-[120px]" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white/80 mb-6">
              <Sparkles className="w-3.5 h-3.5" /> No credit card required
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">
              Ready to Create Better{" "}
              <span className="cc-gradient-text">Instagram Content?</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Join 10,000+ creators using CaptionCraft to ship faster, post more, and
              grow without burning out.
            </p>
            <div className="mt-8">
              <button
                data-testid={LANDING.finalCtaButton}
                onClick={() =>
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center gap-2 cc-gradient-bg text-white font-semibold rounded-full px-8 py-4 text-base shadow-[0_14px_40px_rgba(139,92,246,0.55)] hover:shadow-[0_18px_55px_rgba(236,72,153,0.55)] hover:-translate-y-1 transition-all duration-300"
              >
                Start Generating Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
