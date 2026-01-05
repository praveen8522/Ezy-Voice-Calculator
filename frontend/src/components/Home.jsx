import { Brain, Mic, Cpu, Sparkles, Eye, Volume2, Zap } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ For navigation

export default function Home() {
  return (
    // ✅ Full Page Wrapper
    <main className="relative w-full bg-gradient-to-b from-white via-pink-50 to-purple-100 text-gray-900 overflow-x-hidden scroll-smooth pt-[35px] sm:pt-[20px]">
      {/* 🌈 Soft Floating Gradient Blobs (balanced colors) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-1/3 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 opacity-25 blur-3xl rounded-full animate-blob" />
        <div className="absolute -right-40 bottom-1/3 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-purple-300 via-pink-200 to-indigo-300 opacity-25 blur-3xl rounded-full animate-blob animation-delay-2000" />
      </div>

      {/* 🧠 HERO SECTION */}
      <section className="w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center text-center relative z-10 px-4 sm:px-8 py-16 sm:py-24 bg-gradient-to-br from-white via-pink-50 to-purple-50">
        <div className="max-w-5xl">
          <p className="uppercase tracking-[0.25em] text-[12px] sm:text-sm text-pink-600 font-semibold mb-[10px] sm:mb-[11px]">
            The Future of Human–Math Interaction
          </p>

          <div className="mx-auto mb-5 w-20 sm:w-28 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-full animate-gradient-x"></div>

          <h1 className="text-[1.9rem] sm:text-5xl md:text-6xl font-extrabold leading-tight text-[#0F172A] mb-5 sm:mb-6 opacity-0 animate-fade-up">
            Built for minds{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
              that speak{" "}
            </span>
            faster <span className="text-purple-700">than they type</span>...
          </h1>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-1 opacity-0 animate-fade-up delay-200">
            <strong>EzyVoiceCalc</strong> transforms how you connect with math — speak naturally,
            think clearly, and get instant answers with precision. It’s not just AI-powered;
            it’s human-inspired.
          </p>

          {/* 🚀 CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up delay-400">
            <Link
              to="/voice-popup"
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-md shadow-md transition-all duration-300 text-sm sm:text-base"
            >
              🎙️ Speak to Calculate
            </Link>

            <Link
              to="/features"
              className="px-6 sm:px-8 py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-md font-medium transition-all duration-300 text-sm sm:text-base"
            >
              👁️ Experience the AI Flow
            </Link>
          </div>

          {/* 🌌 INTERACTIVE CONCEPT GRID */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 opacity-0 animate-fade-up delay-600">
            <Concept
              icon={<Mic className="w-8 h-8 text-pink-500" />}
              title="Conversational Intelligence"
              desc="Communicate with math as naturally as you speak — no syntax, just speech."
            />
            <Concept
              icon={<Brain className="w-8 h-8 text-purple-500" />}
              title="Cognitive Learning"
              desc="Our AI evolves with your voice, learning your tone, rhythm, and phrasing."
            />
            <Concept
              icon={<Cpu className="w-8 h-8 text-indigo-500" />}
              title="Neural Accuracy"
              desc="Every calculation processed through high-precision neural computation."
            />
            <Concept
              icon={<Zap className="w-8 h-8 text-pink-600" />}
              title="Instant Reasoning"
              desc="Experience zero-latency math logic — powered by adaptive AI engines."
            />
            <Concept
              icon={<Eye className="w-8 h-8 text-purple-600" />}
              title="Visual Thinking"
              desc="See your thought process visualized — math that feels alive and intelligent."
            />
            <Concept
              icon={<Volume2 className="w-8 h-8 text-blue-500" />}
              title="Voice Harmony"
              desc="Hear your answers come alive — voiced back with emotion and clarity."
            />
          </div>

          <p className="mt-10 sm:mt-14 text-xs sm:text-sm md:text-base text-gray-500 animate-fade-in delay-700">
            “Where interaction meets imagination — and numbers become a conversation.”
          </p>
        </div>
      </section>

      {/* 💬 ABOUT SECTION */}
      <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-white via-pink-50 to-purple-100 text-center relative z-10 px-4 sm:px-10 md:px-20">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#0F172A] animate-fade-up">
          Not Just Smart —{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            Truly Conversational
          </span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto mb-6 animate-fade-up delay-200">
          <strong>EzyVoiceCalc</strong> isn’t just a calculator — it’s an experience. It listens,
          learns, and adapts like a human. Built for creators, thinkers, and dreamers who want
          intelligence to keep up with imagination.
        </p>

        <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up delay-400">
          <Highlight
            title="Voice-Centric Design"
            text="Built from the ground up for natural speech input and intuitive results."
          />
          <Highlight
            title="Adaptive Understanding"
            text="Learns your phrasing, tone, and patterns — making it more accurate every time."
          />
          <Highlight
            title="Seamless Flow"
            text="Talk, pause, think, and continue — math flows as naturally as conversation."
          />
        </div>
      </section>

      {/* 🌈 CTA SECTION */}
      <section className="w-full bg-gradient-to-r from-pink-200 via-white to-purple-200 py-16 sm:py-20 text-center relative z-10 px-4 sm:px-10 md:px-20">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 animate-fade-up">
          Ready to Redefine the Way You Think?
        </h2>
        <p className="text-gray-700 text-sm sm:text-base mb-5 max-w-2xl mx-auto animate-fade-up delay-200">
          Let your thoughts speak — EzyVoiceCalc listens, learns, and transforms ideas into numbers.
        </p>
        <Link
          to="/about"
          className="px-8 sm:px-10 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base animate-fade-up delay-400"
        >
          ✨ Start Exploring the Future
        </Link>
      </section>
    </main>
  );
}

/* 🧩 COMPONENTS */
function Concept({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white/90 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-pink-300 transition-all duration-500 flex flex-col items-center text-center group backdrop-blur-md">
      <div className="relative">
        <div className="absolute inset-0 blur-lg opacity-30 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 rounded-full scale-110 group-hover:opacity-60 transition-all duration-300"></div>
        {icon}
      </div>
      <h3 className="mt-3 font-semibold text-base sm:text-lg text-[#0F172A]">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm mt-2">{desc}</p>
    </div>
  );
}

function Highlight({ title, text }) {
  return (
    <div className="p-5 sm:p-6 bg-white/90 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md">
      <h3 className="text-base sm:text-lg font-semibold text-pink-500 mb-2">{title}</h3>
      <p className="text-gray-700 text-sm sm:text-base">{text}</p>
    </div>
  );
}

/* ✨ ANIMATIONS */
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
.animate-fade-up { animation: fade-up 1s ease-out forwards; }
.animate-fade-in { animation: fade-in 1s ease-out forwards; }
.animate-gradient-x { background-size: 200% 200%; animation: gradient-x 6s ease infinite; }
.animate-blob { animation: blob 10s ease-in-out infinite; }
.animation-delay-2000 { animation-delay: 2s; }
`;

if (typeof document !== "undefined" && !document.getElementById("home-animations")) {
  const style = document.createElement("style");
  style.id = "home-animations";
  style.innerHTML = styles;
  document.head.appendChild(style);
}
