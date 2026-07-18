import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./common/Logo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Match Center", href: "#match-center" },
  { label: "Services", href: "#services" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-500 ${
        scrolled
          ? "border-yellow-300/[0.08] bg-[#05070D]/90 shadow-[0_12px_40px_rgba(0,0,0,0.25),0_1px_0_rgba(212,175,55,0.06)]"
          : "border-white/[0.08] bg-black/20"
      }`}
    >
      {/* Shared shell keeps navigation perfectly aligned with every homepage section. */}
      <div className="site-header-shell flex items-center justify-between py-4 sm:py-5">
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group">
          <Logo variant="icon" size={42} />
          <span className="text-left">
            <span className="block text-xl font-black tracking-[0.08em] text-yellow-300 sm:text-2xl transition-colors group-hover:text-yellow-200">GAFFER</span>
            <span className="mt-0.5 hidden text-[0.65rem] font-medium uppercase tracking-[0.12em] text-slate-400 sm:block">AI Matchday Assistant</span>
          </span>
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className="relative text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-yellow-200 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("#home")}
          className="button-secondary hidden min-h-0 border-yellow-300/40 px-4 py-2 text-xs text-yellow-200 md:inline-flex"
        >
          Try Chat <ArrowRight size={14} />
        </button>
        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-xl border border-white/10 p-2 text-slate-200 transition-colors hover:border-yellow-300/40 hover:text-yellow-200 md:hidden"
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Motion keeps the mobile navigation smooth without changing its behavior. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#05070D]/95 md:hidden"
          >
            <div className="site-header-shell flex flex-col gap-1 py-5">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-yellow-200"
                >
                  {label}
                </button>
              ))}
              <button onClick={() => scrollTo("#home")} className="button-primary mt-3 w-full">
                Try Chat <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
