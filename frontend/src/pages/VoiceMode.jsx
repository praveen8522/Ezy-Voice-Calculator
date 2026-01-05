import { useState } from "react";
import { Mic, Brain, Volume2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function VoiceMode() {
  return (
    <main className="relative w-full bg-white text-gray-900 overflow-x-hidden mt-1 scroll-smooth">
      {/* 🌈 Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-10 w-[420px] h-[420px] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-30 blur-3xl rounded-full animate-blob" />
        <div className="absolute top-1/2 -right-40 w-[480px] h-[480px] bg-gradient-to-tr from-indigo-400 via-pink-400 to-purple-500 opacity-25 blur-3xl rounded-full animate-blob animation-delay-2000" />
      </div>

      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center text-center relative z-10 bg-gradient-to-b from-white via-pink-50 to-purple-50 px-4 sm:px-10 py-24 sm:py-28">
        <div className="text-center mb-5 animate-fade-in">
          <p className="uppercase tracking-[0.25em] text-[12px] sm:text-sm text-pink-600 font-semibold">
            SPEAK. CALCULATE. SIMPLIFY EVERYTHING.
          </p>
          <div className="w-28 h-[3px] mx-auto mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"></div>
        </div>

        <h1 className="text-[2rem] sm:text-5xl md:text-6xl font-extrabold leading-tight text-[#0F172A] mb-5 animate-fade-up">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            Human Voice Meets
          </span>{" "}
          Machine Logic
        </h1>

        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto animate-fade-up delay-200">
          Speak or type your math — powered by real-time AI understanding.
          Whether it’s equations, conversions, or logic, the calculator listens,
          thinks, and responds naturally.
        </p>

        <div className="mt-8 animate-fade-up delay-300">
          <Link
            to="/voice-popup"
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Try Voice Calculation
          </Link>
        </div>

        {/* FEATURES */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 sm:px-8 text-center animate-fade-up delay-500">
          <FeatureCard
            icon={<Mic size={38} className="text-pink-500" />}
            title="Natural Voice Input"
            text="Speak your math aloud — it understands everyday language and converts it into equations instantly."
          />
          <FeatureCard
            icon={<Brain size={38} className="text-purple-500" />}
            title="AI Precision Engine"
            text="Advanced AI ensures accuracy by interpreting your words contextually and mathematically."
          />
          <FeatureCard
            icon={<Volume2 size={38} className="text-indigo-500" />}
            title="Instant Voice Feedback"
            text="Hear your answers spoken back to you, creating a true conversational math experience."
          />
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative w-full py-16 sm:py-20 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white px-6 sm:px-10 md:px-20 overflow-hidden">
        <Sparkles className="absolute top-6 left-6 opacity-20" size={48} />
        <Sparkles className="absolute bottom-6 right-8 opacity-20" size={48} />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Experience the Future of Math Interaction
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          From classrooms to labs, EzyVoiceCalc makes math natural — just talk,
          listen, and calculate.
        </p>
        <Link
          to="/voice-popup"
          className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          Launch Voice Mode
        </Link>
      </section>
    </main>
  );
}

/* --- FEATURE CARD --- */
function FeatureCard({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
      {icon}
      <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A]">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base max-w-xs">{text}</p>
    </div>
  );
}

/* ✨ Animations */
const styles = `
@keyframes fade-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(30px, -20px) scale(1.05); }
}
.animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
.animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
.animate-gradient-x { background-size: 200% 200%; animation: gradient-x 5s ease infinite; }
.animate-blob { animation: blob 10s ease-in-out infinite; }
.animation-delay-2000 { animation-delay: 2s; }
`;

if (typeof document !== "undefined" && !document.getElementById("voice-animations")) {
  const style = document.createElement("style");
  style.id = "voice-animations";
  style.innerHTML = styles;
  document.head.appendChild(style);
}
