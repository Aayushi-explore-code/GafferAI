import { useRef, useCallback, memo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const heroMotion = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* Mouse parallax: subtle shift on the heading based on cursor position. */
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2]);
  const translateX = useTransform(mouseX, [-300, 300], [-6, 6]);
  const translateY = useTransform(mouseY, [-300, 300], [-4, 4]);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-4 lg:py-8"
    >
      {/* The controlled radial light gives the hero cinematic depth without visual noise. */}
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-yellow-300/10 blur-[100px]" />

      <motion.div initial="hidden" animate="show" className="relative z-10 max-w-2xl text-center lg:text-left">
        {/* Badge with shimmer */}
        <motion.div
          variants={heroMotion}
          className="inline-flex items-center gap-2 rounded-full border border-yellow-300/25 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-yellow-200 backdrop-blur-xl"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span className="shimmer-text">Powered by Generative AI</span>
        </motion.div>

        {/* A compact wordmark preserves the hierarchy for the product story below it. */}
        <motion.h1
          variants={heroMotion}
          style={{ x: translateX, y: translateY, rotateX, rotateY }}
          className="mt-8 text-5xl font-black leading-none tracking-[-0.06em] sm:text-6xl md:text-7xl"
        >
          GAFFER
        </motion.h1>
        <motion.p variants={heroMotion} transition={{ delay: 0.08 }} className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300 sm:text-base">
          AI Matchday Assistant
        </motion.p>

        <motion.h2
          variants={heroMotion}
          transition={{ delay: 0.16 }}
          className="mt-8 text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Everything you need for a stress-free matchday.
        </motion.h2>
        <motion.p variants={heroMotion} transition={{ delay: 0.24 }} className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
          Beat the crowds, know the lineups, and master the stadium with a focused AI companion before and during every match.
        </motion.p>

        {/* Matching button treatments create a stronger, more Apple-like action hierarchy. */}
        <motion.div variants={heroMotion} transition={{ delay: 0.32 }} className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
          <button onClick={() => scrollTo("#services")} className="button-primary">
            Explore matchday <ArrowRight size={16} />
          </button>
          <button onClick={() => scrollTo("#home")} className="button-secondary">
            <Play size={15} fill="currentColor" /> Watch demo
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(Hero);
