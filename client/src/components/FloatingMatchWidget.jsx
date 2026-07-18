import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FloatingMatchWidget() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      /* Show after scrolling past ~700px (below Match Center). */
      setVisible(window.scrollY > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToMatch = () => {
    document.querySelector("#match-center")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="floating-widget"
          onClick={scrollToMatch}
          role="button"
          aria-label="View Live Match Center"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && scrollToMatch()}
        >
          <div className="floating-widget-inner">
            {/* LIVE dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
            </span>

            {/* Match info — hide text on very small screens */}
            <div className="hidden sm:flex items-center gap-2.5">
              <span className="text-xs font-bold text-white tracking-wide">ARS</span>
              <span className="text-base font-black text-yellow-300">2 – 1</span>
              <span className="text-xs font-bold text-white tracking-wide">BAR</span>
            </div>

            {/* Minute */}
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-red-300 hidden sm:inline">67'</span>

            {/* Mobile: compact score only */}
            <span className="sm:hidden text-sm font-black text-yellow-300">2–1</span>

            {/* CTA hint */}
            <span className="text-[0.6rem] font-medium text-slate-500 hidden lg:inline">Tap for Match Center</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(FloatingMatchWidget);
