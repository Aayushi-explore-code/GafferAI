import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserRound } from "lucide-react";
import Logo from "../common/Logo";
import TypingIndicator from "./TypingIndicator";

const messageMotion = {
  hidden: { opacity: 0, y: 12, scale: 0.985, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function FormattedContent({ content }) {
  return (
    <div className="space-y-3">
      {content.split(/\n\n+/).map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className="leading-6">
          {paragraph.split("\n").map((line, lineIndex, lines) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function GafferAvatar({ size = 28, animate = false }) {
  return (
    <motion.div
      className="flex shrink-0 items-center justify-center rounded-xl border border-yellow-300/20 bg-yellow-300/[0.09]"
      style={{ width: size, height: size }}
      {...(animate
        ? {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 0.3, ease: "easeOut" },
          }
        : {})}
    >
      <Logo variant="icon" size={Math.round(size * 0.62)} />
    </motion.div>
  );
}

export default function ChatMessages({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="chat-scrollbar relative min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6">
      {/* The empty state adds product context while staying vertically centered and unobtrusive. */}
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex h-full flex-col items-center justify-center px-5 pb-8 text-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-yellow-300/10 blur-2xl" />
              <GafferAvatar size={64} />
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-yellow-200">Your matchday assistant</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">How can I help today?</h3>
            <p className="mt-3 max-w-[18rem] text-sm leading-6 text-slate-400">
              Ask about gates, parking, food, queues, fixtures, or what is happening around the stadium.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          return (
            <motion.article
              key={`msg-${index}`}
              variants={messageMotion}
              initial="hidden"
              animate="visible"
              layout
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {isUser ? (
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-yellow-300/25 bg-yellow-300/15 text-yellow-100">
                  <UserRound size={15} />
                </div>
              ) : (
                <GafferAvatar size={32} animate />
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm shadow-[0_10px_25px_rgba(0,0,0,0.14)] sm:max-w-[76%] ${
                  isUser
                    ? "rounded-tr-md bg-gradient-to-br from-[#F5D76E] to-[#D4AF37] font-medium text-[#14110a]"
                    : "rounded-tl-md border border-white/[0.08] bg-white/[0.055] text-slate-100 backdrop-blur-md"
                }`}
              >
                {isUser ? <p className="leading-6">{message.content}</p> : <FormattedContent content={message.content} />}
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>

      <AnimatePresence>{loading && <TypingIndicator key="typing" />}</AnimatePresence>
      <div ref={bottomRef} className="h-px" />
    </div>
  );
}
