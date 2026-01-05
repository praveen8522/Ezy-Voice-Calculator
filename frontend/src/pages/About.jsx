import { Mic, Brain, Cpu, Sparkles, Globe2, Users, Volume2 } from "lucide-react";

export default function About() {
  return (
    <main className="relative w-full bg-white text-gray-900 overflow-x-hidden scroll-smooth mt-[35px] md:mt-[1px]">
      {/* 🌈 Floating Gradient Backgrounds */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-30 blur-3xl rounded-full animate-blob" />
        <div className="absolute -bottom-20 right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-indigo-400 via-pink-400 to-purple-500 opacity-30 blur-3xl rounded-full animate-blob animation-delay-2000" />
      </div>

      {/* HERO SECTION */}
      <section className="w-full flex flex-col justify-center items-center text-center relative z-10 bg-gradient-to-br from-white via-pink-50 to-purple-50 px-5 sm:px-8 py-16 sm:py-24 md:py-28">
        <p className="uppercase tracking-[0.25em] text-[12px] sm:text-sm text-pink-600 font-semibold mb-[10px] sm:mb-[11px]">
          Get to Know the Intelligence Behind the Voice
        </p>
        <div className="mx-auto mb-[22px] sm:mb-[28px] w-16 sm:w-24 md:w-28 h-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-full animate-gradient-x opacity-90"></div>
        <h1 className="text-[1.8rem] sm:text-4xl md:text-5xl font-extrabold leading-snug sm:leading-tight text-[#0F172A] mb-3 opacity-0 animate-fade-up px-3">
          EzyVoiceCalc — The world’s first{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            truly conversational calculator
          </span>
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl sm:max-w-2xl mx-auto opacity-0 animate-fade-up delay-200 px-3">
          Where computation meets cognition — a calculator that listens, understands,
          and responds like a human.
        </p>
      </section>

      {/* ABOUT SECTION */}
      <section className="w-full bg-white py-12 sm:py-20 px-5 sm:px-10 md:px-20 text-center relative z-10">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 animate-fade-up">
          What Is{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            EzyVoiceCalc
          </span>
          ?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed animate-fade-up delay-200">
          <strong>EzyVoiceCalc</strong> isn’t just a calculator — it’s a bridge between
          natural language and mathematical logic. It listens to human tone and phrasing,
          letting users compute complex operations with their voice. From students to scientists,
          it makes calculation conversational.
        </p>

        {/* Feature Icons */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto animate-fade-up delay-400">
          <AboutCard
            icon={<Mic className="w-8 h-8 text-pink-500" />}
            title="Voice First"
            desc="Speak naturally — no syntax, no typing. Just say what you need."
          />
          <AboutCard
            icon={<Cpu className="w-8 h-8 text-purple-500" />}
            title="Powered by AI"
            desc="Driven by neural networks that understand, compute, and learn continuously."
          />
          <AboutCard
            icon={<Volume2 className="w-8 h-8 text-indigo-500" />}
            title="Talks Back"
            desc="Instant spoken feedback that feels warm and human."
          />
        </div>
      </section>

      {/* OUR VISION */}
      <section className="w-full py-12 sm:py-20 bg-gradient-to-r from-pink-50 via-white to-purple-50 px-5 sm:px-10 md:px-20 text-center relative z-10">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 animate-fade-up">
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            Vision
          </span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-10 animate-fade-up delay-200">
          At EzyVoiceCalc, our mission is to make intelligence feel natural. We believe
          voice is the most human way to interact — and when merged with computation, it
          eliminates all barriers between thought and action.
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-up delay-400">
          <VisionCard
            icon={<Sparkles className="w-8 h-8 text-pink-500" />}
            title="Innovation Meets Simplicity"
            desc="Making advanced AI simple enough for everyone to use daily."
          />
          <VisionCard
            icon={<Globe2 className="w-8 h-8 text-purple-500" />}
            title="Universal Accessibility"
            desc="Technology that speaks every language and adapts to every user."
          />
          <VisionCard
            icon={<Brain className="w-8 h-8 text-indigo-500" />}
            title="Human-Like Intelligence"
            desc="AI that doesn’t just calculate — it understands and evolves."
          />
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="w-full bg-white py-12 sm:py-20 px-5 sm:px-10 md:px-20 text-center relative z-10">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3 text-[#0F172A] animate-fade-up">
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            People
          </span>{" "}
          Behind the Precision
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-10 animate-fade-up delay-200">
          A team of developers, designers, and AI engineers who believe technology should
          feel as human as possible.
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-up delay-400">
          <TeamCard name="Praveenkumar" role="Front-end Developer" />
          <TeamCard name="Kiruthika" role="Back-end Developer" />
          <TeamCard name="Kowsika" role="Flutter Developer" />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full bg-gradient-to-r from-pink-100 via-white to-purple-100 py-12 sm:py-16 text-center relative z-10 px-5 sm:px-10 md:px-20">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 animate-fade-up">
          Let’s Build the Future of Intelligent Interaction
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-5 max-w-xl sm:max-w-2xl mx-auto animate-fade-up delay-200">
          Whether you're curious, inspired, or ready to collaborate — EzyVoiceCalc is
          the beginning of a smarter way to think, talk, and calculate.
        </p>
        <button className="px-6 sm:px-10 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base animate-fade-up delay-400">
          🤝 Join the Conversation
        </button>
      </section>
    </main>
  );
}

/* ---- COMPONENTS ---- */
function AboutCard({ icon, title, desc }) {
  return (
    <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-[#0F172A] mb-1">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{desc}</p>
    </div>
  );
}

function VisionCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{desc}</p>
    </div>
  );
}

function TeamCard({ name, role }) {
  return (
    <div className="p-6 bg-gradient-to-b from-white to-pink-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
      <Users className="w-8 h-8 mx-auto text-pink-500 mb-3" />
      <h4 className="text-lg font-semibold text-[#0F172A]">{name}</h4>
      <p className="text-sm text-gray-600">{role}</p>
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
.animate-gradient-x { background-size: 200% 200%; animation: gradient-x 5s ease infinite; }
.animate-blob { animation: blob 10s ease-in-out infinite; }
.animation-delay-2000 { animation-delay: 2s; }
`;

if (typeof document !== "undefined" && !document.getElementById("about-animations")) {
  const style = document.createElement("style");
  style.id = "about-animations";
  style.innerHTML = styles;
  document.head.appendChild(style);
}
