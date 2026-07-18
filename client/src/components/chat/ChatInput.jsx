import { useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";

export default function ChatInput({ send, loading }) {
  const [text, setText] = useState("");
  const isDisabled = text.trim().length === 0 || loading;

  async function handleSend() {
    if (isDisabled) return;
    const message = text.trim();
    setText("");
    await send(message);
  }

  return (
    <div className="sticky bottom-0 z-20 shrink-0 border-t border-white/[0.08] bg-[#0B0F18]/94 px-5 py-4 backdrop-blur-2xl sm:px-6 sm:py-5">
      {/* A single raised input surface improves focus while retaining all keyboard and send behavior. */}
      <div className={`flex items-center gap-3 rounded-2xl border bg-white/[0.055] px-3 py-2 transition-all duration-300 ${loading ? "border-yellow-300/30 shadow-[0_0_24px_rgba(212,175,55,0.08)]" : "border-white/[0.1] focus-within:border-yellow-300/55 focus-within:bg-white/[0.07] focus-within:shadow-[0_0_30px_rgba(212,175,55,0.12)]"}`}>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleSend(); } }} disabled={loading} placeholder={loading ? "Gaffer is responding..." : "Ask Gaffer about your matchday"} className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:placeholder:text-slate-600" />
        <button onClick={handleSend} disabled={isDisabled} aria-label="Send message" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${isDisabled ? "cursor-not-allowed bg-white/[0.05] text-slate-600" : "bg-gradient-to-br from-[#F5D76E] to-[#D4AF37] text-[#161208] shadow-[0_7px_18px_rgba(212,175,55,0.28)] hover:scale-105 hover:shadow-[0_10px_24px_rgba(212,175,55,0.4)] active:scale-95"}`}>{loading ? <Loader2 size={17} strokeWidth={2.5} className="animate-spin" /> : <ArrowUp size={18} strokeWidth={2.7} />}</button>
      </div>
      <p className="mt-2 px-2 text-[0.65rem] text-slate-500">Press Enter to send</p>
    </div>
  );
}
