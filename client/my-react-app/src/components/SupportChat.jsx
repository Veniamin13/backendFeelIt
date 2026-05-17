import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BOT_RESPONSES = [
  "Я здесь, чтобы поддержать тебя. Всё будет хорошо.",
  "Ты не один(одна), и твои чувства важны.",
  "Сделай глубокий вдох. Ты уже многое сделал(а).",
  "Ты сильнее, чем думаешь.",
  "Если хочешь, просто напиши, что тебя беспокоит.",
];

function getBotResponse() {
  return BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
}

export default function SupportChat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Привет, я твой чат поддержки. Расскажи, как ты себя чувствуешь?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMessage = { sender: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage = { sender: "bot", text: getBotResponse() };
      setMessages((prev) => [...prev, botMessage]);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div style={{ maxWidth: 520, margin: "2rem auto", padding: "1rem" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
      >
        Назад
      </button>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Чат поддержки</h2>
      <div
        style={{
          minHeight: 320,
          border: "1px solid #ccc",
          borderRadius: 16,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          background: "#f9f9f9",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf: message.sender === "bot" ? "flex-start" : "flex-end",
              maxWidth: "85%",
              background: message.sender === "bot" ? "#fff" : "#000",
              color: message.sender === "bot" ? "#111" : "#fff",
              padding: "0.75rem 1rem",
              borderRadius: 16,
            }}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напиши, что тебя тревожит..."
          style={{ flex: 1, padding: "0.75rem", borderRadius: 12, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{ padding: "0.75rem 1rem", borderRadius: 12, border: "none", background: "#000", color: "#fff" }}
        >
          Отправить
        </button>
      </form>
      <footer
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          borderTop: "1px solid #e0e0e0",
          textAlign: "center",
          color: "#666",
          fontSize: "0.9rem",
        }}
      >
        <p>Чат работает в демонстрационном режиме и не заменяет профессиональную помощь.</p>
        <p style={{ marginTop: "0.5rem" }}>Если тебе нужна срочная поддержка, обратись к специалисту.</p>
      </footer>
    </div>
  );
}
