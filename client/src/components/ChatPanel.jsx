import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import ChatHeader from "./chat/ChatHeader";
import ChatMessages from "./chat/ChatMessages";
import SuggestionChips from "./chat/SuggestionChips";
import ChatInput from "./chat/ChatInput";

function ChatPanel({ messages, loading, send, hasUserMessages }) {
  return (
    <section className="relative isolate flex h-[580px] w-full flex-col overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#0B0F18]/78 shadow-[0_30px_90px_rgba(0,0,0,0.5),0_0_50px_rgba(212,175,55,0.1)] backdrop-blur-2xl sm:h-[620px] lg:h-[680px] animated-border-glow">
      {/* Glass highlights and a gold halo create depth without affecting chat behavior. */}
      <div className="pointer-events-none absolute inset-x-10 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -right-28 -top-32 h-64 w-64 rounded-full bg-yellow-300/10 blur-[90px]" />

      {/* Slow shimmer across the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.4) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 4s linear infinite",
        }}
      />

      <ChatHeader />

      {/* This remains the only scrollable area, preserving natural sticky chips and input. */}
      <ChatMessages messages={messages} loading={loading} />

      <AnimatePresence>
        {!hasUserMessages && <SuggestionChips send={send} />}
      </AnimatePresence>

      <ChatInput send={send} loading={loading} />
    </section>
  );
}

export default memo(ChatPanel);
