import { motion } from "framer-motion";
import Logo from "./common/Logo";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Match Center", href: "#match-center" },
  { label: "Services", href: "#services" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

const linkVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

export default function Footer() {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="relative mt-4 border-t border-yellow-300/20 bg-[#03050a]/80">
      {/* Subtle gold glow along the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.35) 50%, transparent 90%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-24 w-96 rounded-full blur-[60px]"
        style={{ background: "rgba(212,175,55,0.06)" }}
      />

      {/* The two-column layout keeps the close of the experience minimal and uncluttered. */}
      <div className="footer-shell py-14 sm:py-18">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid gap-12 md:grid-cols-[1.3fr_0.7fr]"
        >
          <div>
            <div className="flex items-center gap-3">
              <Logo variant="icon" size={36} />
              <span className="text-lg font-bold tracking-[0.1em] text-yellow-300">GAFFER</span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              A more composed, more informed way to experience every matchday.
            </p>
          </div>
          <div className="md:justify-self-end">
            <p className="section-kicker">Explore</p>
            <motion.ul
              className="mt-5 space-y-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.06 }}
            >
              {quickLinks.map(({ label, href }) => (
                <motion.li key={href} variants={linkVariants}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-sm text-slate-400 transition-colors hover:text-yellow-200"
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 text-xs text-slate-500 sm:flex-row">
          <p>Copyright {new Date().getFullYear()} Gaffer. All rights reserved.</p>
          <p>Built for matchday fans.</p>
        </div>
      </div>
    </footer>
  );
}
