const API_URL = "http://localhost:5000";

export async function sendMessage(message) {
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

  if (!data.success) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.data.reply;
}