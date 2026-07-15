import { useState } from "react";

const API_URL = "http://localhost:5000";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function handleSend() {
    if (!message.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setReply(data.data.reply);
      } else {
        setReply(data.message);
      }
    } catch (error) {
      console.error(error);
      setReply("Something went wrong.");
    }
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
      }}
    >
      <h1>⚽ Gaffer AI</h1>

      <input
        type="text"
        placeholder="Ask Gaffer..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
        }}
      >
        Send
      </button>

      {reply && (
        <div
          style={{
            marginTop: "25px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <strong>Gaffer:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

export default App;