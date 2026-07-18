import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <motion.button
      onClick={() => onClick?.()}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="
        group
        relative
        text-left
        premium-card w-full
        rounded-2xl
        premium-surface
        backdrop-blur-xl
        border
        border-white/[0.08]
        transition-all
        duration-300
        hover:bg-white/[0.07]
        hover:border-yellow-400/25
        hover:shadow-[0_8px_50px_rgba(212,175,55,0.12),0_0_40px_rgba(212,175,55,0.06)]
        cursor-pointer
        overflow-hidden
        animated-border-glow
      "
    >
      {/* A soft gold wash gives feedback without looking like a game UI. */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-5 inline-flex rounded-2xl bg-yellow-400/10 p-3.5 text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Icon size={26} />
          </motion.div>
        </div>

        {/* Title + Arrow */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <ArrowRight
            size={18}
            className="text-yellow-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          />
        </div>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.button>
  );
}
