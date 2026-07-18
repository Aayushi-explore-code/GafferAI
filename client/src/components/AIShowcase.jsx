import { memo } from "react";
import { motion } from "framer-motion";
import {
  Navigation,
  Utensils,
  Droplets,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowDown,
  Sparkles,
} from "lucide-react";

const conversations = [
  {
    id: "gate",
    user: "Where is Gate B?",
    icon: Navigation,
    response: {
      title: "Gate B",
      subtitle: "North Stand Entrance",
      chips: [
        { icon: MapPin, label: "Distance", value: "140m" },
        { icon: Clock, label: "Walking", value: "2 min" },
        { icon: Users, label: "Crowd", value: "Low" },
      ],
    },
  },
  {
    id: "food",
    user: "Where should I eat?",
    icon: Utensils,
    response: {
      title: "Italian Kitchen",
      subtitle: "Recommended for you",
      chips: [
        { icon: Clock, label: "Queue", value: "4 min" },
        { icon: MapPin, label: "Distance", value: "60m" },
        { icon: Star, label: "Rating", value: "4.8" },
      ],
    },
  },
  {
    id: "washroom",
    user: "Find nearest washroom",
    icon: Droplets,
    response: {
      title: "Block D Restrooms",
      subtitle: "Nearest available facility",
      chips: [
        { icon: MapPin, label: "Distance", value: "35m" },
        { icon: Users, label: "Availability", value: "High" },
        { icon: Clock, label: "Wait", value: "< 1 min" },
      ],
    },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function AIShowcase() {
  return (
    <section className="ai-showcase-section scroll-mt-24">
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16 relative">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-kicker relative"
        >
          AI in Action
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="relative mt-4 text-4xl font-semibold tracking-tight md:text-6xl"
        >
          See GAFFER in Action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="relative mt-6 text-slate-300 max-w-2xl mx-auto text-base leading-7 md:text-lg"
        >
          Real conversations. Instant answers. Every detail at your fingertips.
        </motion.p>
      </div>

      {/* Conversation Cards */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.12 }}
      >
        {conversations.map(({ id, user, icon: UserIcon, response }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="ai-convo-card group"
          >
            {/* Hover glow */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-300/0 blur-3xl transition-colors duration-500 group-hover:bg-yellow-300/[0.08] pointer-events-none" />

            <div className="relative z-10">
              {/* User Message */}
              <div className="ai-convo-user-msg flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-slate-400 mt-0.5">
                  <UserIcon size={14} />
                </div>
                <p className="font-medium leading-snug">"{user}"</p>
              </div>

              {/* Flow Arrow */}
              <div className="flex items-center justify-center py-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-1.5 text-yellow-300/50"
                >
                  <ArrowDown size={14} />
                </motion.div>
              </div>

              {/* GAFFER Response */}
              <div className="ai-convo-response">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-yellow-300/15">
                    <Sparkles size={10} className="text-yellow-300" />
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-yellow-300/80">GAFFER</span>
                </div>

                <h4 className="text-base font-semibold text-white">{response.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{response.subtitle}</p>

                {/* Data Chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {response.chips.map(({ icon: ChipIcon, label, value }) => (
                    <div key={label} className="ai-convo-data-chip">
                      <ChipIcon size={12} className="text-yellow-300/70" />
                      <span className="text-slate-500">{label}:</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default memo(AIShowcase);
