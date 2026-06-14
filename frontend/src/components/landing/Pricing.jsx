import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/landing/Features";
import { LANDING } from "@/constants/testIds";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "For creators trying CaptionCraft and posting casually.",
    features: [
      "10 captions per day",
      "Basic hashtag generation",
      "3 tone presets",
      "One-click copy",
    ],
    cta: "Start Free",
    testId: LANDING.pricingFreeCta,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    cadence: "/ month",
    description: "For creators and brands shipping content every day.",
    features: [
      "Unlimited captions",
      "Advanced hashtag intelligence",
      "Multiple caption variations",
      "All 5 tone presets",
      "Priority generation",
      "Save & organise caption history",
    ],
    cta: "Go Pro",
    testId: LANDING.pricingProCta,
    highlight: true,
  },
];

const scrollToDemo = () => {
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
};

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Simple pricing.{" "}
              <span className="cc-gradient-text">No surprises.</span>
            </>
          }
          subtitle="Start free. Upgrade when CaptionCraft becomes part of your daily routine."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative p-[2px] rounded-3xl ${p.highlight ? "" : ""}`}
            >
              {p.highlight ? (
                <div className="cc-tracing-border rounded-3xl">
                  <PricingBody plan={p} />
                </div>
              ) : (
                <div className="bg-white border border-zinc-100 rounded-3xl">
                  <PricingBody plan={p} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Need a team or enterprise plan?{" "}
          <a href="#contact" className="font-semibold text-violet-700 hover:text-violet-900">
            Talk to us
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function PricingBody({ plan }) {
  return (
    <div className={`relative p-8 md:p-10 ${plan.highlight ? "" : ""}`}>
      {plan.highlight && (
        <span className="absolute -top-3 right-6 inline-flex items-center gap-1 cc-gradient-bg text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_8px_20px_rgba(139,92,246,0.35)]">
          <Sparkles className="w-3 h-3" /> Most Popular
        </span>
      )}

      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
      </div>
      <p className="mt-2 text-sm text-zinc-600">{plan.description}</p>

      <div className="mt-6 flex items-end gap-2">
        <div
          className={`text-5xl md:text-6xl font-black tracking-tighter ${
            plan.highlight ? "cc-gradient-text" : "text-zinc-900"
          }`}
        >
          {plan.price}
        </div>
        <div className="text-sm text-zinc-500 mb-2">{plan.cadence}</div>
      </div>

      <button
        data-testid={plan.testId}
        onClick={scrollToDemo}
        className={`mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
          plan.highlight
            ? "cc-gradient-bg text-white shadow-[0_10px_30px_rgba(139,92,246,0.35)] hover:shadow-[0_14px_40px_rgba(139,92,246,0.5)]"
            : "bg-zinc-900 text-white hover:bg-zinc-800"
        }`}
      >
        {plan.cta}
      </button>

      <ul className="mt-7 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-zinc-700">
            <span
              className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center ${
                plan.highlight
                  ? "cc-gradient-bg text-white"
                  : "bg-zinc-100 text-zinc-700"
              }`}
            >
              <Check className="w-3 h-3" strokeWidth={3} />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
