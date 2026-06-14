import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/landing/Features";
import { LANDING } from "@/constants/testIds";

const FAQS = [
  {
    q: "How are captions generated?",
    a: "CaptionCraft AI uses a fine-tuned prompt over GPT-5.2 (via Emergent's universal LLM key). Each request bundles your topic, category, tone, and length into a structured brief — the model returns a viral-ready caption, 10–15 hashtags, and a CTA.",
  },
  {
    q: "Will the hashtags actually help me grow?",
    a: "Yes. We blend niche, medium, and broad-reach hashtags so your posts get discovered by your real audience — not lost in 5M-post tags. You can edit or regenerate the set anytime.",
  },
  {
    q: "Can I use it for client work or commercial brands?",
    a: "Absolutely. Pro plans support unlimited generations, brand voice consistency across accounts, and saved caption history — built for social media managers and agencies.",
  },
  {
    q: "Do I need to sign up to try it?",
    a: "No. The live demo above is fully functional without an account. Sign up only when you want unlimited generations and saved history.",
  },
  {
    q: "What's the difference between Free and Pro?",
    a: "Free gives you 10 captions/day with basic hashtags. Pro unlocks unlimited captions, advanced hashtag intelligence, multiple variations per topic, all five tone presets, and priority generation.",
  },
  {
    q: "Will my captions sound like AI?",
    a: "No — that's the entire point. We prompt-engineer for hook-first writing, natural emoji placement, and brand-specific tone. Most users say their CaptionCraft posts get more engagement than the ones they wrote themselves.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Questions, Answered"
          title={
            <>
              Everything you{" "}
              <span className="cc-gradient-text">need to know</span>
            </>
          }
          subtitle="Still curious? Reach out — we reply within a day."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full divide-y divide-zinc-100 bg-white rounded-3xl border border-zinc-100 px-2 md:px-4">
            {FAQS.map((item, idx) => (
              <AccordionItem
                key={item.q}
                value={`item-${idx}`}
                className="border-0 px-3 md:px-4"
                data-testid={`${LANDING.faqItemPrefix}-${idx}`}
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold py-5 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-zinc-600 leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
