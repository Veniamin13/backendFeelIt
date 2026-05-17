import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VotePage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();

  const pollOptions = [
    { id: 1, text: "Да, определенно!", emoji: "✅" },
    { id: 2, text: "Нет, не согласен", emoji: "❌" },
    { id: 3, text: "Возможно, подумаю", emoji: "🤔" },
    { id: 4, text: "Не знаю, без мнения", emoji: "🤷‍♂️" },
  ];

  const handleVote = () => {
    if (selectedOption) {
      setHasVoted(true);
      // Here you would typically send the vote to your backend
      setTimeout(() => {
        alert(`Спасибо за голос! Вы выбрали: ${pollOptions.find(opt => opt.id === selectedOption).text}`);
      }, 500);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "#f8fafc",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          padding: "0.75rem 1.5rem",
          borderRadius: 8,
          border: "1px solid rgba(148, 163, 184, 0.3)",
          background: "rgba(255,255,255,0.08)",
          color: "#cbd5e1",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 24,
          padding: "3rem",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35)",
          background: "#111e3e",
          border: "1px solid rgba(148, 163, 184, 0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: 700 }}>
            Голосование
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#cbd5e1", maxWidth: 500, margin: "0 auto" }}>
            Что вы думаете о новой функции чата поддержки в нашем приложении?
          </p>
        </div>

        {!hasVoted ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {pollOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                style={{
                  padding: "1.5rem",
                  borderRadius: 12,
                  border: selectedOption === option.id
                    ? "2px solid #22c55e"
                    : "1px solid rgba(148, 163, 184, 0.3)",
                  background: selectedOption === option.id
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(15, 23, 42, 0.5)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{option.emoji}</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                  {option.text}
                </span>
              </div>
            ))}

            <button
              onClick={handleVote}
              disabled={!selectedOption}
              style={{
                marginTop: "1rem",
                padding: "1rem 2rem",
                borderRadius: 12,
                border: "none",
                background: selectedOption ? "#22c55e" : "rgba(148, 163, 184, 0.3)",
                color: selectedOption ? "#fff" : "#64748b",
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: selectedOption ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
              }}
            >
              Проголосовать
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#22c55e" }}>
              Спасибо за голос!
            </h2>
            <p style={{ color: "#cbd5e1", marginBottom: "2rem" }}>
              Ваш голос учтен. Мы ценим ваше мнение!
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "1rem 2rem",
                borderRadius: 12,
                border: "none",
                background: "#2563eb",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Вернуться на главную
            </button>
          </div>
        )}
      </div>
    </div>
  );
}