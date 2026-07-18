import { useRef, useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Navigation,
  Radio,
  Users,
  Landmark,
  Clock,
  Star,
  Sparkles,
} from "lucide-react";
import useChat from "../hooks/useChat";
import Navbar from "../components/Navbar";
import LiveTicker from "../components/LiveTicker";
import Hero from "../components/Hero";
import ChatPanel from "../components/ChatPanel";
import LiveMatchCenter from "../components/LiveMatchCenter";
import QuickActions from "../components/QuickActions";
import AIShowcase from "../components/AIShowcase";
import FloatingMatchWidget from "../components/FloatingMatchWidget";
import AtmosphericEffects from "../components/AtmosphericEffects";
import Footer from "../components/Footer";
import stadium from "../assets/images/stadium.png";

/* ── Animated Counter Hook ────────────────────────── */
function useAnimatedCounter(target, duration = 1.6) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numStr = target.replace(/[^0-9]/g, "");
          const num = parseInt(numStr, 10);
          if (isNaN(num)) return;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = (now - startTime) / (duration * 1000);
            if (elapsed >= 1) {
              setCount(num);
              return;
            }
            setCount(Math.round(num * easeOutCubic(elapsed)));
            requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  /* Format the number to match original style (e.g., "1,000+") */
  const formatted = (() => {
    const numStr = target.replace(/[^0-9]/g, "");
    if (!numStr) return target;
    const suffix = target.replace(/[0-9,]/g, "");
    return count.toLocaleString() + suffix;
  })();

  return { ref, formatted };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ── Animated Stat Card ──────────────────────────── */
function StatCard({ value, label, icon: Icon, index }) {
  const isNumeric = /\d/.test(value);
  const counter = useAnimatedCounter(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="premium-surface relative rounded-2xl px-5 py-6 text-center sm:px-6 sm:py-7 group transition-all duration-300 hover:border-yellow-300/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.06)]"
    >
      <Icon
        size={20}
        className="mx-auto mb-4 text-yellow-300 transition-transform duration-300 group-hover:scale-110"
      />
      <div
        ref={isNumeric ? counter.ref : undefined}
        className="text-3xl font-bold tracking-tight text-yellow-300 md:text-4xl"
      >
        {isNumeric ? counter.formatted : value}
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </div>
    </motion.div>
  );
}

const MemoStatCard = memo(StatCard);

const stats = [
  { value: "1,000+", label: "Fans Helped", icon: Users },
  { value: "50+", label: "Stadiums", icon: Landmark },
  { value: "24/7", label: "Support", icon: Clock },
  { value: "98%", label: "Satisfaction", icon: Star },
];

const features = [
  {
    icon: MessageSquare,
    title: "AI-Powered Chat",
    description: "Clear, contextual help for every part of your matchday.",
  },
  {
    icon: Navigation,
    title: "Smart Navigation",
    description: "Confident directions from the turnstile to your seat.",
  },
  {
    icon: Radio,
    title: "Live Updates",
    description: "The details that matter, delivered when they matter.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Home() {
  const { messages, loading, send, hasUserMessages } = useChat();

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Keeps the stadium image cinematic while layered gradients protect text contrast. */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${stadium})` }} />
      <div className="absolute inset-0 bg-[#03050a]/72" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(212,175,55,0.14),transparent_25%),linear-gradient(180deg,rgba(3,5,10,0.2),rgba(3,5,10,0.9)_74%,#03050a)]" />

      {/* Atmospheric Effects — fog, floodlights, particles, vignette */}
      <AtmosphericEffects />

      <div className="relative z-10">
        <Navbar />

        {/* Live Ticker — sports-broadcast-style scrolling updates */}
        <LiveTicker />

        <main className="content-shell relative pt-8 sm:pt-12">
          {/* Soft gold lighting adds depth without competing with the stadium image. */}
          <div className="gold-orb -left-48 top-28" />

          <section
            id="home"
            className="hero-section grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center lg:grid-cols-[1.08fr_0.92fr]"
          >
            <Hero />
            <ChatPanel messages={messages} loading={loading} send={send} hasUserMessages={hasUserMessages} />
          </section>

          {/* ── Live Match Center — the heartbeat of the homepage ── */}
          <LiveMatchCenter />

          {/* Service prompts retain their existing chat behavior while receiving a clearer section rhythm. */}
          <QuickActions onServiceClick={send} />

          {/* ── AI Showcase — demonstrate conversations ── */}
          <AIShowcase />

          <section className="stats-section">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {stats.map(({ value, label, icon }, index) => (
                <MemoStatCard key={label} value={value} label={label} icon={icon} index={index} />
              ))}
            </div>
          </section>

          <section id="features" className="feature-section scroll-mt-24">
            <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
              <motion.p {...reveal} viewport={{ once: true }} className="section-kicker">
                The Gaffer advantage
              </motion.p>
              <motion.h2
                {...reveal}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl"
              >
                Designed for the match, not the hassle.
              </motion.h2>
              <motion.p
                {...reveal}
                viewport={{ once: true }}
                transition={{ delay: 0.16 }}
                className="mt-6 text-base leading-7 text-slate-300 md:text-lg"
              >
                Every detail is considered so you can stay present for the moments that matter.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              {features.map(({ icon: Icon, title, description }, index) => (
                <motion.article
                  key={title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="premium-surface premium-feature-card group relative overflow-hidden rounded-3xl animated-border-glow"
                >
                  {/* The hover light keeps the card interaction elegant and intentionally subtle. */}
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-300/0 blur-3xl transition-colors duration-500 group-hover:bg-yellow-300/10" />
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-300/10 text-yellow-300 transition-colors duration-300 group-hover:bg-yellow-300 group-hover:text-black">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
                      {description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="about" className="about-section scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="premium-surface relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-7 py-12 text-center sm:px-12 sm:py-16"
            >
              {/* A small ambient glow gives the closing statement a premium focal point. */}
              <div className="absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 rounded-full bg-yellow-300/10 blur-[90px]" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-200">
                  <Sparkles size={14} /> About Gaffer
                </div>
                <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
                  Your calm, confident companion for the <span className="text-gold-gradient">beautiful game.</span>
                </h2>
                <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                  Gaffer pairs generative AI with stadium intelligence to help you navigate, discover, and enjoy every
                  moment from arrival to the final whistle.
                </p>
              </div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Floating Match Widget — always visible while scrolling */}
      <FloatingMatchWidget />
    </div>
  );
}
