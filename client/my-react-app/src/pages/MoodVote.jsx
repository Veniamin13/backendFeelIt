import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Smile,
  Frown,
  Meh,
  Heart,
  Zap,
  Cloud,
  Sun,
  Moon,
  AlertCircle,
  Laugh,
} from "lucide-react";

const emotions = [
  { id: "happy", label: "Happy", icon: Smile, color: "#FFD700" },
  { id: "sad", label: "Sad", icon: Frown, color: "#87CEEB" },
  { id: "neutral", label: "Neutral", icon: Meh, color: "#A9A9A9" },
  { id: "love", label: "Love", icon: Heart, color: "#FF69B4" },
  { id: "energy", label: "Energetic", icon: Zap, color: "#FFD700" },
  { id: "calm", label: "Calm", icon: Cloud, color: "#87CEEB" },
  { id: "sunny", label: "Optimistic", icon: Sun, color: "#FFD700" },
  { id: "tired", label: "Tired", icon: Moon, color: "#696969" },
  { id: "anxious", label: "Anxious", icon: AlertCircle, color: "#FF6347" },
  { id: "joyful", label: "Joyful", icon: Laugh, color: "#FFD700" },
];

export default function MoodVote() {
  const navigate = useNavigate();
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [moodText, setMoodText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEmoji || moodText.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
        padding: "2rem",
        color: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          background: "#111e3e",
          border: "1px solid rgba(148, 163, 184, 0.15)",
          borderRadius: 24,
          padding: "2.5rem",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35)",
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

        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem", textAlign: "center" }}>
          How Are You Feeling?
        </h1>
        <p style={{ color: "#94a3b8", textAlign: "center", marginBottom: "2rem" }}>
          Vote with your mood and share how you're doing.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ color: "#cbd5e1", marginBottom: "1rem" }}>Choose your emotion:</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "1rem",
                }}
              >
                {emotions.map((emotion) => {
                  const IconComponent = emotion.icon;
                  const isSelected = selectedEmoji === emotion.id;
                  return (
                    <button
                      key={emotion.id}
                      type="button"
                      onClick={() => setSelectedEmoji(emotion.id)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "1rem",
                        borderRadius: 16,
                        border: isSelected
                          ? `2px solid ${emotion.color}`
                          : "1px solid rgba(148, 163, 184, 0.25)",
                        background: isSelected
                          ? "rgba(148, 163, 184, 0.1)"
                          : "rgba(255,255,255,0.05)",
                        color: "#f8fafc",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <IconComponent size={28} color={emotion.color} />
                      <span style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>
                        {emotion.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "grid", gap: "0.5rem", color: "#cbd5e1" }}>
                Tell us more (optional):
                <textarea
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                  placeholder="What's on your mind?"
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "0.9rem 1rem",
                    borderRadius: 16,
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                  }}
                />
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1rem 1.2rem",
                borderRadius: 16,
                border: "none",
                background: "#22c55e",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Share Your Mood
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
              ✨ Thank you for sharing!
            </p>
            <p style={{ color: "#cbd5e1" }}>Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
}
