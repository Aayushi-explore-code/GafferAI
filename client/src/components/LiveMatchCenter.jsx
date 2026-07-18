import { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Clock,
  Cloud,
  Thermometer,
  Car,
  Users,
  DoorOpen,
  LogOut,
  Target,
  CornerDownRight,
  AlertTriangle,
  Eye,
} from "lucide-react";

/* ── Mock Data ───────────────────────────────────── */
const matchData = {
  competition: "UEFA Champions League — Semi-Final",
  status: "LIVE",
  minute: 67,
  home: { name: "Arsenal", short: "ARS", score: 2, color: "#EF4444" },
  away: { name: "Barcelona", short: "BAR", score: 1, color: "#1D4ED8" },
  goals: [
    { player: "Saka", minute: 34, team: "home" },
    { player: "Pedri", minute: 41, team: "away" },
    { player: "Havertz", minute: 62, team: "home" },
  ],
  stats: {
    possession: { home: 46, away: 54 },
    shots: { home: 12, away: 9 },
    corners: { home: 5, away: 7 },
    yellowCards: { home: 2, away: 3 },
  },
  stadium: {
    attendance: "62,450",
    weather: "Clear",
    temperature: "22°C",
    parking: "67%",
    crowdDensity: "High",
    gateStatus: "Gates A–D Open",
    expectedExit: "~18 min delay",
  },
};

/* ── Animated Counter ────────────────────────────── */
function AnimatedCounter({ target, duration = 1.8 }) {
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
          const num = parseInt(target.toString().replace(/[^0-9]/g, ""), 10);
          if (isNaN(num)) { setCount(target); return; }
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = (now - startTime) / (duration * 1000);
            if (elapsed >= 1) { setCount(num); return; }
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

  return <span ref={ref}>{typeof target === "string" && target.includes(",") ? count.toLocaleString() : count}</span>;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ── Stat Bar ────────────────────────────────────── */
function PossessionBar({ home, away }) {
  return (
    <div className="flex items-center gap-3 mt-3">
      <span className="text-sm font-bold text-white w-8 text-right">{home}%</span>
      <div className="match-stat-bar flex-1 flex">
        <motion.div
          className="match-stat-bar-fill bg-red-500/80"
          initial={{ width: 0 }}
          whileInView={{ width: `${home}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="match-stat-bar-fill bg-blue-500/80"
          initial={{ width: 0 }}
          whileInView={{ width: `${away}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
      <span className="text-sm font-bold text-white w-8">{away}%</span>
    </div>
  );
}

/* ── Stadium Intelligence Card ───────────────────── */
function StadiumCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="match-stat-card flex items-center gap-3 group">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent || "bg-yellow-300/10 text-yellow-300"}`}>
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.1em] text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-white truncate">{value}</p>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function LiveMatchCenter() {
  const { competition, status, minute, home, away, goals, stats, stadium } = matchData;

  return (
    <section id="match-center" className="match-center-section scroll-mt-24">
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-kicker"
        >
          Live Match Center
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Today's Match
        </motion.h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* ── Scoreboard ───────────────────────────── */}
        <motion.div variants={reveal} className="match-scoreboard">
          {/* Competition bar */}
          <div className="flex items-center justify-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <Trophy size={13} className="text-yellow-300" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-400">{competition}</span>
          </div>

          {/* Score area */}
          <div className="relative px-6 py-8 sm:px-10 sm:py-12">
            {/* Ambient glow behind score */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 rounded-full bg-yellow-300/[0.06] blur-[80px] pointer-events-none" />

            <div className="relative flex items-center justify-center gap-6 sm:gap-12">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[120px]">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]" style={{ borderLeftColor: home.color, borderLeftWidth: 3 }}>
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-white">{home.short}</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-300">{home.name}</span>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-3 sm:gap-5">
                  <span className="text-5xl sm:text-7xl font-black tracking-tight text-white" style={{ animation: "score-pulse 3s ease-in-out infinite" }}>
                    {home.score}
                  </span>
                  <span className="text-2xl sm:text-3xl font-light text-slate-600">–</span>
                  <span className="text-5xl sm:text-7xl font-black tracking-tight text-white" style={{ animation: "score-pulse 3s ease-in-out infinite" }}>
                    {away.score}
                  </span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-500/15 border border-red-500/20 px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-300">{status} {minute}'</span>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[120px]">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]" style={{ borderRightColor: away.color, borderRightWidth: 3 }}>
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-white">{away.short}</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-300">{away.name}</span>
              </div>
            </div>

            {/* Goal Scorers */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {goals.map((goal, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] px-3 py-1.5 text-xs"
                >
                  <span className="text-yellow-300">⚽</span>
                  <span className="font-semibold text-white">{goal.player}</span>
                  <span className="text-slate-500">{goal.minute}'</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Match Stats ──────────────────────────── */}
        <motion.div variants={reveal} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Stats Panel */}
          <div className="match-scoreboard p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 mb-6">Match Statistics</h3>

            {/* Possession */}
            <div className="mb-5">
              <p className="text-xs font-medium text-slate-400 text-center mb-1">Possession</p>
              <PossessionBar home={stats.possession.home} away={stats.possession.away} />
            </div>

            {/* Other stats */}
            <div className="space-y-4 mt-6">
              {[
                { label: "Shots", home: stats.shots.home, away: stats.shots.away },
                { label: "Corners", home: stats.corners.home, away: stats.corners.away },
                { label: "Yellow Cards", home: stats.yellowCards.home, away: stats.yellowCards.away },
              ].map(({ label, home: h, away: a }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white w-8 text-center">
                    <AnimatedCounter target={h} />
                  </span>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
                  <span className="font-bold text-white w-8 text-center">
                    <AnimatedCounter target={a} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stadium Intelligence */}
          <div className="match-scoreboard p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 mb-6">Stadium Intelligence</h3>
            <div className="grid grid-cols-2 gap-3">
              <StadiumCard icon={Eye} label="Attendance" value={stadium.attendance} />
              <StadiumCard icon={Cloud} label="Weather" value={stadium.weather} accent="bg-sky-400/10 text-sky-300" />
              <StadiumCard icon={Thermometer} label="Temperature" value={stadium.temperature} accent="bg-orange-400/10 text-orange-300" />
              <StadiumCard icon={Car} label="Parking" value={`${stadium.parking} Full`} accent="bg-violet-400/10 text-violet-300" />
              <StadiumCard icon={Users} label="Crowd" value={stadium.crowdDensity} accent="bg-red-400/10 text-red-300" />
              <StadiumCard icon={DoorOpen} label="Gates" value={stadium.gateStatus} accent="bg-emerald-400/10 text-emerald-300" />
              <StadiumCard icon={LogOut} label="Exit Delay" value={stadium.expectedExit} accent="bg-amber-400/10 text-amber-300" />
              <StadiumCard icon={Clock} label="Kickoff" value="20:00 CET" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(LiveMatchCenter);
