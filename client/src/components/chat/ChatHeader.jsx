import Logo from "../common/Logo";

export default function ChatHeader() {
  return (
    <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#0B0F18]/55 px-5 py-4 backdrop-blur-xl sm:px-6">
      {/* The logo-led identity makes the assistant feel like a dedicated product, not a generic bot. */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.08]"><Logo variant="icon" size={28} /></div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold tracking-[0.12em] text-white">GAFFER</h2>
          <p className="mt-0.5 truncate text-xs text-slate-400">Matchday intelligence</p>
        </div>
      </div>

      {/* A compact, always-visible status pill replaces a distracting connection treatment. */}
      <div className="ml-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-emerald-300">
        <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" /></span>
        <span className="hidden sm:inline">AI Connected</span><span className="sm:hidden">Live</span>
      </div>
    </header>
  );
}
