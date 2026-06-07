import React, { useEffect, useRef } from "react";

export default function ProChatMessages({ messages = [] }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const roleColors = {
    user: "#60a5fa",
    professional: "#34d399",
    system: "#f59e0b",
  };

  const containerStyle = {
    background: "#ffffff",
    border: "1px dashed #93c5fd",
    borderRadius: "14px",
    padding: "1rem",
  };

  const listStyle = { display: "grid", gap: "0.6rem", maxHeight: "40vh", overflow: "auto" };

  const messageBox = {
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "0.6rem",
    background: "#fbfdff",
    boxShadow: "0 1px 2px rgba(2,6,23,0.04)",
  };

  return (
    <section style={containerStyle}>
      <h2 style={{ margin: 0, color: "#0f172a" }}>אזור הודעות</h2>
      <p style={{ margin: "0 0 0.75rem", color: "#64748b" }}>
        כרגע קיימות {messages.length} הודעות.
      </p>

      <div style={listStyle}>
        {messages.map((message) => {
          const senderName = message.senderName || message.sender || message.from || "Unknown";
          // prefer explicit sender field (set in TalkToProfessional)
          const roleRaw = message.sender || message.senderRole || message.role || message.type || "user";
          const role = String(roleRaw).toLowerCase();

          // Normalize role to one of: professional, user, system
          let roleKey = "user";
          if (role === "professional" || role.includes("pro") || role.includes("professional") || role.includes("psych") || role.includes("therap")) {
            roleKey = "professional";
          } else if (role === "system" || role.includes("sys") || role.includes("system") || role.includes("bot")) {
            roleKey = "system";
          }

          const badgeColor = roleColors[roleKey] || "#94a3b8";

          // role label: for professional show 'Doctor' if name looks like a doctor, else 'Professional'
          let roleLabel = "User";
          let roleEmoji = "👤";
          if (roleKey === "professional") {
            roleEmoji = "🧑‍⚕️";
            const lowerName = String(senderName).toLowerCase();
            if (lowerName.includes("dr ") || lowerName.includes("dr.") || lowerName.startsWith("dr")) {
              roleLabel = "Doctor";
            } else {
              roleLabel = "Professional";
            }
          } else if (roleKey === "system") {
            roleEmoji = "⚙️";
            roleLabel = "System";
          }

          return (
            <div key={message.id || Math.random()} style={messageBox}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <div style={{ fontWeight: 700, color: "#0f172a" }}>{senderName}</div>
                <div
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.75rem",
                    color: "#0f172a",
                    background: badgeColor,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "999px",
                    opacity: 0.95,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span>{roleEmoji}</span>
                  <span style={{ textTransform: "none" }}>{roleLabel}</span>
                </div>
              </div>
              <div style={{ color: "#0f172a", lineHeight: 1.4 }}>{message.text}</div>
            </div>
          );
        })}
      </div>

      <div ref={endRef} />
    </section>
  );
}