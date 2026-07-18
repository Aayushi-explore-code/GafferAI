import { useState, useMemo } from "react";
import { sendMessage } from "../services/api";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const hasUserMessages = useMemo(
    () => messages.some((m) => m.role === "user"),
    [messages]
  );

  async function send(text) {
    if (!text.trim() || loading) return;

    const userMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const reply = await sendMessage(text.trim());
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process that request. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, send, hasUserMessages };
}
