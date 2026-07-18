import { motion } from "framer-motion";
import { MapPin, ShieldAlert, Trophy, Utensils } from "lucide-react";

const suggestions = [
  { text: "Find Gate B", icon: MapPin },
  { text: "Nearest Food Court", icon: Utensils },
  { text: "Today's Match", icon: Trophy },
  { text: "Emergency Exit", icon: ShieldAlert },
];

const chipMotion = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

export default function SuggestionChips({ send }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.25 }} className="sticky bottom-0 z-10 shrink-0 border-t border-white/[0.07] bg-[#0B0F18]/90 px-5 py-4 backdrop-blur-2xl sm:px-6">
      {/* This anchored prompt tray stays easy to reach while the welcome conversation is visible. */}
      <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-500">Suggested prompts</p>
      <motion.div initial="hidden" animate="show" className="flex flex-wrap gap-2" transition={{ staggerChildren: 0.06 }}>
        {suggestions.map(({ text, icon: Icon }) => (
          <motion.button key={text} variants={chipMotion} onClick={() => send(text)} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.045] px-3 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-300/35 hover:bg-yellow-300/10 hover:text-yellow-100 hover:shadow-[0_8px_20px_rgba(212,175,55,0.12)]"><Icon size={13} className="text-yellow-200" />{text}</motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
