import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [moodText, setMoodText] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      if (formData.email && formData.password) {
        navigate("/");
      }
    } else {
      // Register logic
      if (formData.email && formData.password && formData.confirmPassword) {
        if (formData.password === formData.confirmPassword) {
          setRegistrationSuccess(true);
        } else {
          alert("Passwords do not match");
        }
      }
    }
  };

  const handleMoodSubmit = () => {
    if (moodText.trim()) {
      // Here you would send the mood data to your backend
      alert(`Спасибо! Ваш настрой: "${moodText}"`);
      navigate("/");
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
          maxWidth: 500,
          borderRadius: 24,
          padding: "3rem",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35)",
          background: "#111e3e",
          border: "1px solid rgba(148, 163, 184, 0.15)",
        }}
      >
        {/* Toggle Buttons */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <button
            onClick={() => {
              setIsLogin(true);
              setFormData({ email: "", password: "", confirmPassword: "" });
            }}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: 12,
              border: "none",
              background: isLogin ? "#22c55e" : "rgba(255,255,255,0.08)",
              color: isLogin ? "#fff" : "#cbd5e1",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: "1rem",
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setFormData({ email: "", password: "", confirmPassword: "" });
            }}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: 12,
              border: "none",
              background: !isLogin ? "#2563eb" : "rgba(255,255,255,0.08)",
              color: !isLogin ? "#fff" : "#cbd5e1",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: "1rem",
            }}
          >
            Register
          </button>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "0.5rem",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {registrationSuccess ? "Добро пожаловать!" : (isLogin ? "Welcome Back" : "Create Account")}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "0.95rem",
            color: "#cbd5e1",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {registrationSuccess
            ? "Расскажите, как вы себя чувствуете сегодня?"
            : (isLogin
              ? "Sign in to your account to continue."
              : "Join FeelIt to share your feelings and get moral support from our community. Express yourself and connect with others.")}
        </p>

        {/* Content */}
        {registrationSuccess ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#cbd5e1",
                }}
              >
                Как вы себя чувствуете сегодня?
              </label>
              <textarea
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                placeholder="Расскажите о своем настроении..."
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: 8,
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  background: "rgba(15, 23, 42, 0.5)",
                  color: "#f8fafc",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  minHeight: "120px",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              onClick={handleMoodSubmit}
              disabled={!moodText.trim()}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: 8,
                border: "none",
                background: moodText.trim() ? "#22c55e" : "rgba(148, 163, 184, 0.3)",
                color: moodText.trim() ? "#fff" : "#64748b",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: moodText.trim() ? "pointer" : "not-allowed",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              Продолжить
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#cbd5e1",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid rgba(148, 163, 184, 0.3)",
                background: "rgba(15, 23, 42, 0.5)",
                color: "#f8fafc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#cbd5e1",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid rgba(148, 163, 184, 0.3)",
                background: "rgba(15, 23, 42, 0.5)",
                color: "#f8fafc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          {!isLogin && (
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#cbd5e1",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: 8,
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  background: "rgba(15, 23, 42, 0.5)",
                  color: "#f8fafc",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: 8,
              border: "none",
              background: isLogin ? "#22c55e" : "#2563eb",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>
        )}
      </div>
    </div>
  );
}
