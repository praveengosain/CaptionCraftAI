import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, MessageCircle, Send } from "lucide-react";
import { LANDING } from "@/constants/testIds";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="cc-blob cc-float-slow bg-violet-300/45 w-[480px] h-[480px] -top-32 -left-24" />
        <div className="cc-blob cc-float-slower bg-pink-300/40 w-[520px] h-[520px] top-10 -right-32" />
        <div className="cc-blob cc-float-slow bg-blue-300/35 w-[420px] h-[420px] top-72 left-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 cc-grid-bg opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div
            data-testid={LANDING.heroBadge}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs md:text-sm font-semibold text-violet-700 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            CaptionCraft AI · Powered by GPT-5.2
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-zinc-900">
            Generate <span className="cc-gradient-text">Viral Instagram</span> Captions in Seconds
          </h1>

          <p className="mt-6 text-base md:text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Create engaging captions, hashtags, and call-to-actions powered by AI.
            Perfect for creators, influencers, businesses, and marketers who want to
            grow without staring at a blank screen.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              data-testid={LANDING.heroPrimaryCta}
              onClick={() => scrollTo("demo")}
              className="inline-flex items-center justify-center gap-2 cc-gradient-bg text-white font-semibold rounded-full px-7 py-4 text-base shadow-[0_10px_30px_rgba(139,92,246,0.35)] hover:shadow-[0_14px_40px_rgba(139,92,246,0.5)] hover:-translate-y-1 transition-all duration-300"
            >
              Generate Free Captions
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              data-testid={LANDING.heroSecondaryCta}
              onClick={() => scrollTo("examples")}
              className="inline-flex items-center justify-center bg-white text-zinc-900 border-2 border-zinc-200 hover:border-zinc-900 font-semibold rounded-full px-7 py-4 text-base transition-all duration-300 hover:-translate-y-1"
            >
              See Examples
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-xs text-zinc-500">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=80&h=80&fit=crop",
                "https://images.unsplash.com/photo-1603217039863-aa0c865404f7?w=80&h=80&fit=crop",
                "https://images.unsplash.com/photo-1582152629442-4a864303fb96?w=80&h=80&fit=crop",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="font-medium">Loved by 10,000+ creators worldwide</span>
          </div>
        </motion.div>

        {/* Visual mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <FloatingCaptionCard />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCaptionCard() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-[0_20px_60px_rgba(139,92,246,0.18)] border border-zinc-100 p-4 w-56 z-10"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-700">
          <Sparkles className="w-3.5 h-3.5" /> AI Hashtags
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {["#sunset", "#wanderlust", "#explore", "#vibes", "#travelgram"].map((t) => (
            <span key={t} className="text-[11px] font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-8 -right-4 bg-white rounded-2xl shadow-[0_20px_60px_rgba(236,72,153,0.18)] border border-zinc-100 p-4 w-60 z-10"
      >
        <div className="text-[11px] font-semibold text-pink-600 uppercase tracking-wider">Engagement</div>
        <div className="mt-1 text-2xl font-black cc-gradient-text">+218%</div>
        <div className="text-[11px] text-zinc-500 mt-1">vs. your last 30 posts</div>
      </motion.div>

      <div className="relative bg-white rounded-3xl border border-zinc-100 shadow-[0_30px_80px_rgba(24,24,27,0.10)] p-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 cc-gradient-bg" />
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=120&h=120&fit=crop"
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-bold">@captioncraft</div>
            <div className="text-[11px] text-zinc-500">Sponsored · AI Generated</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl aspect-[4/5] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-blue-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_50%)]" />
          <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium drop-shadow">
            Golden hour magic ✨
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-zinc-700">
          <Heart className="w-5 h-5" />
          <MessageCircle className="w-5 h-5" />
          <Send className="w-5 h-5" />
        </div>

        <p className="mt-3 text-sm leading-relaxed">
          <span className="font-bold">@captioncraft</span>{" "}
          Chasing sunsets and rewriting the rules ✨ The world doesn&apos;t slow down — but
          your scroll-stopping caption can.
        </p>
        <p className="mt-2 text-xs text-violet-600 font-medium">
          #wanderlust #goldenhour #createwithcaption
        </p>
      </div>
    </div>
  );
}
