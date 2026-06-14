import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/landing/Features";
import { LANDING } from "@/constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = ["Travel", "Technology", "Business", "Fitness", "Food", "Personal Brand"];
const TONES = ["Professional", "Casual", "Funny", "Inspirational", "Luxury"];
const LENGTHS = ["Short", "Medium", "Long"];

const SAMPLES = [
  {
    topic: "Sunset hike in Bali",
    category: "Travel",
    tone: "Inspirational",
    length: "Medium",
    caption:
      "Chased the sun until it ran out of sky 🌅 Some moments don't just earn a photo — they earn a pause. Bali reminded me that the best views aren't found, they're climbed.",
    hashtags: ["#bali", "#sunsetchaser", "#travelgram", "#wanderlust", "#hikingadventures", "#nature", "#mindfultravel"],
    cta: "Save this for your next big climb.",
  },
  {
    topic: "Launching a new productivity app",
    category: "Technology",
    tone: "Professional",
    length: "Short",
    caption:
      "Less context-switching. More deep work. Our newest release ships today — built for teams who refuse to lose their flow.",
    hashtags: ["#productapp", "#saas", "#startup", "#productivity", "#technology", "#launchday", "#founders"],
    cta: "Tap the link in bio to try it free for 14 days.",
  },
];

export default function LiveDemo() {
  const [topic, setTopic] = useState("Sunset hike in Bali");
  const [category, setCategory] = useState("Travel");
  const [tone, setTone] = useState("Inspirational");
  const [length, setLength] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(SAMPLES[0]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/captions/generate`, {
        topic: topic.trim(),
        category,
        tone,
        length,
      });
      setResult({
        topic: data.topic,
        category: data.category,
        tone: data.tone,
        length: data.length,
        caption: data.caption,
        hashtags: data.hashtags || [],
        cta: data.cta || "",
      });
      toast.success("Caption ready ✨");
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Something went wrong generating the caption.";
      setError(String(detail));
      toast.error("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const fullText = [
    result?.caption,
    result?.cta ? `\n\n${result.cta}` : "",
    result?.hashtags?.length ? `\n\n${result.hashtags.join(" ")}` : "",
  ].join("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't access clipboard");
    }
  };

  return (
    <section
      id="demo"
      data-testid={LANDING.demoSection}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 cc-soft-gradient" />
      <div className="absolute inset-0 -z-10">
        <div className="cc-blob cc-float-slow bg-violet-200/50 w-[420px] h-[420px] -top-20 left-1/4" />
        <div className="cc-blob cc-float-slower bg-pink-200/50 w-[480px] h-[480px] bottom-0 right-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="Live Demo"
          title={
            <>
              Try CaptionCraft AI{" "}
              <span className="cc-gradient-text">right now</span>
            </>
          }
          subtitle="No signup. Type a topic, pick a vibe, and watch a viral-ready caption appear."
        />

        <div id="examples" className="mt-14 grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_30px_80px_rgba(24,24,27,0.06)] p-7 md:p-9"
          >
            <div className="space-y-5">
              <div>
                <Label htmlFor="topic" className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Topic
                </Label>
                <Textarea
                  id="topic"
                  data-testid={LANDING.demoTopicInput}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Launching a sustainable sneaker line in Tokyo"
                  maxLength={300}
                  className="mt-2 min-h-[88px] rounded-2xl border-zinc-200 focus-visible:ring-violet-500 focus-visible:ring-offset-0 bg-white"
                />
                <div className="mt-1 text-[11px] text-zinc-500 text-right">
                  {topic.length}/300
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectField
                  testId={LANDING.demoCategorySelect}
                  label="Category"
                  value={category}
                  onChange={setCategory}
                  options={CATEGORIES}
                />
                <SelectField
                  testId={LANDING.demoToneSelect}
                  label="Tone"
                  value={tone}
                  onChange={setTone}
                  options={TONES}
                />
                <SelectField
                  testId={LANDING.demoLengthSelect}
                  label="Length"
                  value={length}
                  onChange={setLength}
                  options={LENGTHS}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                data-testid={LANDING.demoGenerateButton}
                className="w-full inline-flex items-center justify-center gap-2 cc-gradient-bg text-white font-semibold rounded-2xl px-6 py-4 text-base shadow-[0_10px_30px_rgba(139,92,246,0.35)] hover:shadow-[0_14px_40px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating caption…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate Caption
                  </>
                )}
              </button>

              {error && (
                <p
                  data-testid={LANDING.demoErrorMessage}
                  className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3"
                >
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
                <span className="text-xs text-zinc-500 mr-1 self-center">Try a sample:</span>
                {SAMPLES.map((s) => (
                  <button
                    key={s.topic}
                    onClick={() => {
                      setTopic(s.topic);
                      setCategory(s.category);
                      setTone(s.tone);
                      setLength(s.length);
                      setResult(s);
                      setError("");
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-violet-100 hover:text-violet-700 text-zinc-700 transition-colors"
                  >
                    {s.topic}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid={LANDING.demoResultCard}
            className="bg-white rounded-3xl border border-zinc-100 shadow-[0_30px_80px_rgba(24,24,27,0.08)] overflow-hidden flex flex-col"
          >
            <div className="cc-gradient-bg px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide">AI-Generated Result</span>
              </div>
              <button
                onClick={handleCopy}
                data-testid={LANDING.demoCopyButton}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy all"}
              </button>
            </div>

            <div className="p-6 md:p-8 flex-1">
              {/* Mock IG header */}
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
                <div className="w-10 h-10 rounded-full p-[2px] cc-gradient-bg">
                  <img
                    src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?w=80&h=80&fit=crop"
                    alt=""
                    className="w-full h-full rounded-full border-2 border-white object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold">@yourbrand</div>
                  <div className="text-[11px] text-zinc-500">
                    {result?.category} · {result?.tone} · {result?.length}
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={result?.caption}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p
                    data-testid={LANDING.demoCaptionText}
                    className="mt-5 text-[15px] leading-relaxed text-zinc-800 whitespace-pre-wrap"
                  >
                    {result?.caption}
                  </p>

                  {result?.cta && (
                    <p className="mt-4 text-sm font-semibold text-violet-700">
                      {result.cta}
                    </p>
                  )}

                  {result?.hashtags?.length > 0 && (
                    <div
                      data-testid={LANDING.demoHashtags}
                      className="mt-5 flex flex-wrap gap-1.5"
                    >
                      {result.hashtags.map((h) => (
                        <span
                          key={h}
                          className="text-[12px] font-medium text-violet-700 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-5 text-zinc-700">
                <Heart className="w-5 h-5" />
                <MessageCircle className="w-5 h-5" />
                <Send className="w-5 h-5" />
                <Bookmark className="w-5 h-5 ml-auto" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SelectField({ testId, label, value, onChange, options }) {
  return (
    <div>
      <Label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          data-testid={testId}
          className="mt-2 rounded-2xl border-zinc-200 focus:ring-violet-500 bg-white h-11"
        >
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt} data-testid={`${testId}-option-${opt.toLowerCase().replace(/\s+/g, "-")}`}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
