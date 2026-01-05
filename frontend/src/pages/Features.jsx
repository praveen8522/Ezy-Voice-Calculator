import { Mic, Brain, Zap, Languages, Cpu, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();

  return (
    <main className="relative w-full bg-white text-gray-900 overflow-x-hidden scroll-smooth mt-[50px] sm:mt-0">

      {/* --- Floating Gradient Background Layers --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-25 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-indigo-400 via-pink-400 to-purple-500 opacity-25 blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* 🌟 HERO SECTION */}
      <section className="relative w-full text-center py-12 sm:py-20 md:py-28 bg-gradient-to-b from-pink-50 via-white to-purple-50 overflow-hidden">

        {/* Floating Icons */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <Mic className="absolute top-10 left-4 sm:left-16 w-8 sm:w-10 h-8 sm:h-10 text-pink-400 opacity-20 animate-float" />
          <Brain className="absolute bottom-12 right-6 sm:right-20 w-10 sm:w-12 h-10 sm:h-12 text-purple-400 opacity-20 animate-float-slow" />
          <Cpu className="absolute top-1/2 left-8 sm:left-12 w-9 sm:w-12 h-9 sm:h-12 text-indigo-400 opacity-20 animate-float" />
          <Zap className="absolute bottom-10 left-1/3 w-6 sm:w-8 h-6 sm:h-8 text-yellow-400 opacity-25 animate-float-slow" />
        </div>

        <p className="text-xs sm:text-sm md:text-base font-semibold tracking-widest text-pink-600 uppercase mb-3 animate-fade-in">
          Say it. Solve it. Simplify everything.
        </p>

        <div className="mx-auto mb-6 w-20 sm:w-28 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full animate-gradient-x"></div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0F172A] opacity-0 animate-fade-up max-w-6xl mx-auto px-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            EzyVoiceCalc
          </span>{" "}
          redefines how you think, speak, and calculate in real time
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl mx-auto mt-6 leading-relaxed opacity-0 animate-fade-up delay-200 px-4">
          Turn your thoughts into accurate results with next-gen AI-driven computation.
          Speak naturally, skip typing, and experience math as fast as your mind works.
        </p>

        <div className="mt-8 sm:mt-10 opacity-0 animate-fade-up delay-400">
          <a
            href="#features"
            className="px-8 sm:px-10 py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg hover:opacity-90 transition-all duration-300 relative overflow-hidden group"
          >
            🚀 Explore Features
          </a>
        </div>

        {/* Hero Highlights */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-6xl mx-auto px-6 sm:px-10 text-left sm:text-center animate-fade-up delay-400">
          <HighlightCard
            icon={<Mic className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />}
            title="Natural Speech Input"
            desc="Understand spoken math effortlessly — no strict commands, just your natural language."
          />
          <HighlightCard
            icon={<Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />}
            title="AI Precision Engine"
            desc="Calculations powered by advanced models — smart, instant, and always accurate."
          />
          <HighlightCard
            icon={<Languages className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500" />}
            title="Global Accessibility"
            desc="Seamlessly adapts to your language, tone, and accent for a truly human experience."
          />
        </div>
      </section>

      {/* 🔹 FEATURES GRID */}
      <section
        id="features"
        className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-20 md:py-24 animate-fade-up"
      >
        <FeatureCard
          icon={<Mic className="w-8 sm:w-9 h-8 sm:h-9 text-pink-500" />}
          title="Voice-Activated Intelligence"
          desc="Speak naturally — no commands needed. EzyVoiceCalc understands and executes instantly."
        />
        <FeatureCard
          icon={<Brain className="w-8 sm:w-9 h-8 sm:h-9 text-purple-500" />}
          title="Context-Aware AI"
          desc="Understands context from your ongoing conversation — like a real human assistant."
        />
        <FeatureCard
          icon={<Cpu className="w-8 sm:w-9 h-8 sm:h-9 text-indigo-500" />}
          title="Lightning-Precise Computation"
          desc="Utilizes optimized AI algorithms for unmatched accuracy and processing speed."
        />
        <FeatureCard
          icon={<Volume2 className="w-8 sm:w-9 h-8 sm:h-9 text-blue-500" />}
          title="Human-Like Speech"
          desc="Get answers spoken naturally, clearly, and in your preferred voice tone."
        />
        <FeatureCard
          icon={<Zap className="w-8 sm:w-9 h-8 sm:h-9 text-yellow-500" />}
          title="Real-Time Feedback"
          desc="Ultra-fast recognition ensures you get instant results — perfect for multitasking minds."
        />
        <FeatureCard
          icon={<Languages className="w-8 sm:w-9 h-8 sm:h-9 text-green-500" />}
          title="Multilingual Adaptability"
          desc="Supports multiple languages and adapts seamlessly to your accent and rhythm."
        />
      </section>

      {/* 💎 GLASS HIGHLIGHT SECTION */}
      <section className="relative w-full py-12 sm:py-18 md:py-20 bg-gradient-to-r from-pink-50/70 via-white/80 to-purple-50/70 backdrop-blur-md text-center overflow-hidden animate-fade-up delay-400">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 opacity-20 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Empowering Minds, One Voice at a Time
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
            EzyVoiceCalc isn’t just about solving equations — it’s redefining how we
            communicate with technology, creating a more human and intuitive experience.
          </p>

          {/* ✅ ONLY UPDATED PART */}
          <button
            onClick={() => navigate("/voice-popup")}
            className="px-8 sm:px-10 py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition-all duration-300 relative overflow-hidden group"
          >
            🎙️ Try Voice Mode Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#0F172A] text-gray-400 text-center py-6 sm:py-8 mt-2 sm:mt-4 text-xs sm:text-sm animate-fade-in">
        <p>© 2025 EzyVoiceCalc — Where Intelligence Speaks Naturally.</p>
      </footer>
    </main>
  );
}

/* 🔸 FEATURE CARD COMPONENT */
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 sm:p-8 bg-white/90 border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group transform-gpu hover:scale-[1.02] animate-fade-up">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 bg-gradient-to-tr from-pink-100 to-purple-100 p-4 rounded-full shadow-sm animate-float-slow">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* 🌟 HIGHLIGHT CARD COMPONENT */
function HighlightCard({ icon, title, desc }) {
  return (
    <div className="flex sm:flex-col items-start sm:items-center sm:text-center gap-3 sm:gap-4 p-4 rounded-xl hover:bg-white/70 transition-all duration-300 animate-fade-up">
      <div className="flex-shrink-0 animate-float">{icon}</div>
      <div>
        <h4 className="font-semibold text-[#0F172A] text-base sm:text-lg mb-1">{title}</h4>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
