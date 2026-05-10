import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SupportChat from "./components/SupportChat";
import Auth from "./pages/Auth";
import MoodPage from "./pages/MoodPage";
import VotePage from "./pages/VotePage";
import SplashScreen from "./components/SplashScreen";

// Home/Landing page component
function Home() {
  return <SplashScreen />;
}

export default function App() {
  // The Router wraps the app and provides navigation between pages.
  return (
    <Router>
      <Routes>
        {/* Landing page route */}
        <Route path="/" element={<Home />} />
        {/* Auth page route (Sign In & Register) */}
        <Route path="/auth" element={<Auth />} />
        {/* Support chat route */}
        <Route path="/support" element={<SupportChat />} />
        {/* Mood vote route */}
        <Route path="/mood-vote" element={<MoodPage />} />
        {/* Vote page route */}
        <Route path="/vote" element={<VotePage />} />
      </Routes>
    </Router>
  );
}
