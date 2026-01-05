import { useState } from "react";
import { CheckCircle2, Rocket, Star, Crown, Infinity } from "lucide-react";

export default function Plan() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      title: "Go",
      price: "₹149 - month",
      icon: <Star className="text-pink-500 w-9 h-9" />,
      features: [
        "Basic voice calculations",
        "Up to 100 per day",
        "Voice input access",
        "Community support",
      ],
      gradient: "from-gray-100 to-gray-200",
      buttonColor: "from-gray-700 to-gray-800",
    },
    {
      title: "Pro",
      price: "₹499 - 6 months",
      icon: <Rocket className="text-purple-500 w-9 h-9" />,
      features: [
        "Unlimited calculations",
        "AI precision mode",
        "Voice feedback",
        "Priority email support",
      ],
      gradient: "from-pink-100 via-purple-100 to-indigo-100",
      buttonColor: "from-pink-500 to-purple-600",
    },
    {
      title: "Plus",
      price: "₹899 - year",
      icon: <Crown className="text-indigo-500 w-9 h-9" />,
      features: [
        "AI-powered insights",
        "Faster response speed",
        "History sync",
        "Feature previews",
      ],
      gradient: "from-indigo-100 to-purple-200",
      buttonColor: "from-indigo-500 to-purple-600",
    },
    {
      title: "Elite",
      price: "₹1999 - lifetime",
      icon: <Infinity className="text-pink-600 w-9 h-9" />,
      features: [
        "Lifetime access",
        "Offline mode",
        "Personal assistant",
        "24/7 premium support",
      ],
      gradient: "from-pink-50 via-white to-purple-50",
      buttonColor: "from-pink-500 to-indigo-600",
    },
  ];

  return (
    <main className="relative w-full bg-gradient-to-b from-white via-pink-50 to-purple-50 text-gray-900 overflow-x-hidden scroll-smooth">
      {/* 🌈 Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-10 w-[420px] h-[420px] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-30 blur-3xl rounded-full animate-blob" />
        <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-gradient-to-tr from-indigo-400 via-pink-400 to-purple-500 opacity-25 blur-3xl rounded-full animate-blob animation-delay-2000" />
      </div>

      {/* HERO SECTION */}
      <section className="w-full text-center pt-24 sm:pt-28 pb-12 px-4 sm:px-10">
        <p className="uppercase tracking-[0.25em] text-[12px] sm:text-sm text-pink-600 font-semibold mb-2">
          PLAN IT. PICK IT. POWER UP.
        </p>
        <div className="flex justify-center mb-4">
          <span className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
        </div>
        <h1 className="text-[2rem] sm:text-5xl font-extrabold text-[#0F172A] mb-4 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
            EzyVoice Plans
          </span>{" "}
          that fit the way you create.
        </h1>
        <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
          Unlock smarter features, faster performance, and unlimited creativity — choose the plan that’s right for you.
        </p>
      </section>

      {/* PLAN CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 sm:px-10 md:px-24 pb-20 max-w-[1600px] mx-auto">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            {...plan}
            selected={selectedPlan === plan.title}
            onSelect={() =>
              setSelectedPlan(selectedPlan === plan.title ? null : plan.title)
            }
          />
        ))}
      </section>
    </main>
  );
}

/* --- PLAN CARD COMPONENT --- */
function PlanCard({
  title,
  price,
  features,
  gradient,
  buttonColor,
  icon,
  selected,
  onSelect,
}) {
  return (
    <div
      onClick={onSelect}
      className={`relative flex flex-col justify-between bg-gradient-to-br ${gradient} p-6 sm:p-8 rounded-2xl shadow-md backdrop-blur-lg border border-white/60 cursor-pointer transition-all duration-300 ${
        selected ? "ring-4 ring-pink-500 shadow-xl" : ""
      }`}
      style={{
        minHeight: "340px",
        width: "100%",
        maxWidth: "400px", // ✨ Slightly extra width
        margin: "0 auto",
      }}
    >
      <div className="flex flex-col items-center text-center mb-4">
        <div className="mb-3">{icon}</div>
        <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
        <p className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mt-1">
          {price}
        </p>
      </div>

      <ul className="space-y-2 text-gray-700 mb-6 text-sm sm:text-base">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle2 className="text-pink-500 w-5 h-5" /> {f}
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`w-full py-2.5 rounded-full text-white font-semibold shadow-md bg-gradient-to-r ${buttonColor} hover:opacity-90 transition-all duration-300`}
      >
        {selected ? "Proceed to Checkout →" : "Choose Plan"}
      </button>
    </div>
  );
}

/* ✨ Background Animation Styles */
const styles = `
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(25px, -15px) scale(1.05); }
}
.animate-blob { animation: blob 12s ease-in-out infinite; }
.animation-delay-2000 { animation-delay: 2s; }
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("plan-animations")
) {
  const style = document.createElement("style");
  style.id = "plan-animations";
  style.innerHTML = styles;
  document.head.appendChild(style);
}
