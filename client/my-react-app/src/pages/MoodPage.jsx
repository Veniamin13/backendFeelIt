import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOODS = [
  { id: "terrible", emoji: "😢", label: "Terrible", color: "#ef4444" },
  { id: "bad", emoji: "😟", label: "Bad", color: "#f97316" },
  { id: "okay", emoji: "😐", label: "Okay", color: "#eab308" },
  { id: "good", emoji: "🙂", label: "Good", color: "#84cc16" },
  { id: "amazing", emoji: "😄", label: "Amazing", color: "#22c55e" },
];

const EMOTIONS = [
  "😢", "😢", "😟", "🥺", "😤", "😠", "😔", "😞", "😭", "😫",
  "😐", "😑", "😶", "😏", "🤐", "😒", "😬", "🤥", "😌", "😔",
  "😊", "☺️", "🙂", "😇", "🥰", "😍", "😘", "😚", "😙", "😗",
  "😄", "😃", "😀", "😁", "😆", "😅", "🤣", "😂", "🙃", "😉",
  "😍", "🥳", "🤩", "😘", "🥹", "😌", "😍", "🫠", "🫠", "😎",
];

export default function MoodPage() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodText, setMoodText] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState([]);

  const handleEmojiClick = (emoji) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
    } else {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const handleSubmit = () => {
    alert(
      `Mood: ${selectedMood}, Text: ${moodText}, Emojis: ${selectedEmojis.join(" ")}`
    );
    setSelectedMood(null);
    setMoodText("");
    setSelectedEmojis([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        padding: "2rem",
        color: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          background: "#111e3e",
          borderRadius: 24,
          padding: "2.5rem",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35)",
          border: "1px solid rgba(148, 163, 184, 0.15)",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            padding: "0.65rem 1rem",
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.75rem", textAlign: "center" }}>
          How Are You Feeling?
        </h1>
        <p style={{ color: "#94a3b8", textAlign: "center", marginBottom: "2rem" }}>
          Share your mood with us.
        </p>

        {/* Mood Selection */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ textAlign: "center", marginBottom: "1rem", color: "#cbd5e1" }}>
            Pick your mood:
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                style={{
                  padding: "1rem",
                  borderRadius: 16,
                  border:
                    selectedMood === mood.id
                      ? `3px solid ${mood.color}`
                      : "2px solid rgba(148, 163, 184, 0.25)",
                  background: "rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontSize: "2rem",
                }}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "grid", gap: "0.5rem", color: "#cbd5e1" }}>
            What's on your mind?
            <textarea
              value={moodText}
              onChange={(e) => setMoodText(e.target.value)}
              placeholder="Tell us how you're feeling..."
              style={{
                padding: "1rem",
                borderRadius: 16,
                border: "1px solid rgba(148, 163, 184, 0.25)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "1rem",
                fontFamily: "inherit",
                resize: "vertical",
                minHeight: "100px",
              }}
            />
          </label>
        </div>

        {/* Emoji Selection */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ color: "#cbd5e1", marginBottom: "1rem" }}>
            Add stickers:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
              gap: "0.5rem",
              background: "rgba(255,255,255,0.02)",
              padding: "1rem",
              borderRadius: 12,
              border: "1px solid rgba(148, 163, 184, 0.15)",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {EMOTIONS.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => handleEmojiClick(emoji)}
                style={{
                  padding: "0.5rem",
                  fontSize: "1.5rem",
                  border: selectedEmojis.includes(emoji)
                    ? "2px solid #22c55e"
                    : "1px solid rgba(148, 163, 184, 0.15)",
                  borderRadius: 8,
                  background: selectedEmojis.includes(emoji)
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Emojis Display */}
        {selectedEmojis.length > 0 && (
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <p style={{ color: "#cbd5e1", marginBottom: "0.5rem" }}>
              Selected stickers:
            </p>
            <div style={{ fontSize: "2rem" }}>
              {selectedEmojis.map((emoji, idx) => (
                <span key={idx} style={{ display: "inline-block", margin: "0.25rem" }}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedMood || !moodText.trim()}
          style={{
            width: "100%",
            padding: "1rem 1.2rem",
            borderRadius: 16,
            border: "none",
            background: selectedMood && moodText.trim() ? "#22c55e" : "#64748b",
            color: "#fff",
            fontWeight: 700,
            cursor: selectedMood && moodText.trim() ? "pointer" : "not-allowed",
            fontSize: "1rem",
            transition: "background 0.2s ease",
          }}
        >
          Share Your Mood
        </button>
      </div>
    </div>
  );
}
