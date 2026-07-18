import { motion } from "framer-motion";
import Logo from "../common/Logo";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3"
    >
      {/* The same GAFFER logo used for messages reinforces assistant identity during loading. */}
      <motion.div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-yellow-300/20 bg-yellow-300/[0.09]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Logo variant="icon" size={20} />
      </motion.div>
      <div className="flex items-center gap-3 rounded-2xl rounded-tl-md border border-white/[0.08] bg-white/[0.055] px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-yellow-200"
              animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 0.85,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot * 0.14,
              }}
            />
          ))}
        </div>
        <span className="shimmer-text text-sm">Gaffer is thinking</span>
      </div>
    </motion.div>
  );
}
