import { motion } from "framer-motion";
import {
  Navigation,
  UtensilsCrossed,
  Car,
  ShieldAlert,
  ShoppingBag,
  Droplets,
} from "lucide-react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Find My Gate",
    description: "Navigate quickly to your seat with step-by-step directions.",
    icon: Navigation,
    prompt: "Help me find my stadium gate based on my ticket.",
  },
  {
    title: "Food & Drinks",
    description: "Discover nearby food courts and skip the longest queues.",
    icon: UtensilsCrossed,
    prompt: "Show me the best food and drink options inside the stadium.",
  },
  {
    title: "Parking",
    description: "Locate the nearest parking area before you arrive.",
    icon: Car,
    prompt: "Help me locate the nearest parking area.",
  },
  {
    title: "Emergency",
    description: "Instant access to medical and security assistance.",
    icon: ShieldAlert,
    prompt: "Where can I find emergency services inside the stadium?",
  },
  {
    title: "Merchandise",
    description: "Find the closest team shop for kits, scarves & more.",
    icon: ShoppingBag,
    prompt: "Where can I buy merchandise inside the stadium?",
  },
  {
    title: "Washrooms",
    description: "Locate the nearest restrooms with real-time availability.",
    icon: Droplets,
    prompt: "Where are the nearest washrooms from my seat?",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function QuickActions({ onServiceClick }) {
  return (
    <section id="services" className="services-section scroll-mt-24">
      {/* Kicker and focused copy establish a premium editorial hierarchy. */}
      <div className="text-center relative">
        {/* Glow behind title */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-kicker relative"
        >
          Matchday, simplified
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-4 text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Matchday Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mt-6 text-slate-300 max-w-2xl mx-auto text-base leading-7 md:text-lg"
        >
          Everything you need before and during the match, powered by Gaffer AI.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <motion.div
        className="mt-12 sm:mt-14 md:mt-16 grid gap-5 sm:gap-6 lg:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={item}>
            <ServiceCard
              {...service}
              onClick={() => onServiceClick(service.prompt)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
