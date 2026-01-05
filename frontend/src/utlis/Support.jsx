import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Mail,
  MessageSquare,
  Phone,
  HelpCircle,
  Send,
  ChevronDown,
  X,
  Loader2,
  Trash2, // ⬅️ Added Trash2 icon
} from "lucide-react";

function getBotReply(message) {
  const text = message.toLowerCase().trim();
  if (text.includes("math") || text.includes("calc"))
    return "EzyVoiceCalc lets you state math problems naturally. Just say your equation — and get precise answers instantly.";
  if (text.includes("symbol") || text.includes("variable"))
    return "Speak mathematical symbols or variables as in conversation. EzyVoiceCalc interprets them seamlessly.";
  if (text.includes("precision"))
    return "EzyVoiceCalc’s answers are designed for accuracy and clarity.";
  if (text.includes("human-inspired"))
    return "Our AI focuses on understanding and explaining like a human would.";
  if (text.includes("multi-step"))
    return "You can solve multi-step problems in one go and ask follow-ups.";
  if (text.includes("plan"))
    return "To change your plan, visit the Billing page in your settings.";
  if (text.includes("invoice"))
    return "Invoices are available in the Billing section.";
  if (text.includes("refund"))
    return "Refunds allowed within 7 days if usage is under 30 minutes.";
  if (text.includes("human"))
    return "You can reach a human agent by email: support@ezyvoice.ai";
  if (text.includes("voice preferences"))
    return "Reset voice preferences at the Voice Preferences page by clicking 'Reset Settings'.";
  if (text.includes("microphone"))
    return "Check browser mic permissions under Privacy → Microphone.";
  if (text.includes("accent") || text.includes("language"))
    return "Choose new accent/language in Voice Preferences.";
  return "Thanks for your message! We'll get back to you soon.";
}

export default function Support() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "👋 Hi! Ask anything about EzyVoiceCalc or voice settings." },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const inspiringMsg =
    "EzyVoiceCalc transforms how you connect with math — speak naturally, think clearly, and get instant answers with precision. It’s not just AI-powered; it’s human-inspired.";

  const dropdownQuestions = [
    "How do I use EzyVoiceCalc for math problems?",
    "Can I say math symbols and variables?",
    "How precise are EzyVoiceCalc results?",
    "What does 'human-inspired' mean?",
    "Can I solve multi-step questions with EzyVoiceCalc?",
    "How to change my plan?",
    "Where to find invoices?",
    "What’s the refund policy?",
    "How to contact human support?",
    "How to reset voice preferences?",
    "Why is my microphone not working?",
    "Can I change the AI’s accent or language?",
  ];

  const faqs = [
    {
      q: "How can I reset my voice preferences?",
      a: "Go to the Voice Preferences page → click Reset Settings. Your AI will return to default tone and speed.",
    },
    {
      q: "Why is my microphone not working?",
      a: "Ensure your browser’s mic permissions are enabled. Check settings → Privacy → Microphone.",
    },
    {
      q: "Can I change the AI’s accent or language?",
      a: "Yes! Open the Voice Preferences page and choose from multiple accents and languages.",
    },
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    setChatMessages((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);
    setMessage("");
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "bot", text: getBotReply(message) }]);
      setLoading(false);
    }, 600);
  };

  const handleSelectDropdown = (question) => {
    setChatMessages((prev) => [...prev, { sender: "user", text: question }, { sender: "bot", text: getBotReply(question) }]);
    setDropdownOpen(false);
  };

  const handleClearChat = () =>
    setChatMessages([{ sender: "bot", text: "👋 Hi! Ask anything about EzyVoiceCalc or voice settings." }]);

  const handleCloseChat = () => setChatOpen(false);

  // Animation & style overrides
  const styles = `
  @keyframes slide-up {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .chat-animate-in { animation: slide-up 0.5s cubic-bezier(.5,.8,.3,1) forwards; }
  .chat-animate-out { opacity: 0; transform: translateY(40px); transition: all .45s; }
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  .scrollbar-thumb-pink-400::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-thumb-pink-400::-webkit-scrollbar-thumb {
    background-color: #ec4899;
    border-radius: 12px;
  }
  @media (max-width: 640px) {
    .chat-widget {
      width: 95vw !important;
      bottom: 10px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      max-height: 85vh !important;
      border-radius: 1rem !important;
    }
    .chat-messages {
      max-height: 60vh !important;
    }
    .chat-input, .chat-button {
      font-size: 1.1rem !important;
      padding: 0.75rem 1.25rem !important;
    }
    .dropdown-list {
      width: 100% !important;
      max-height: 240px !important;
    }
    .chat-float-btn {
      bottom: 15px !important;
      right: 15px !important;
      padding: 1rem !important;
    }
  }
  `;
  if (typeof document !== "undefined" && !document.getElementById("support-animations-chat")) {
    const style = document.createElement("style");
    style.id = "support-animations-chat";
    style.innerHTML = styles;
    document.head.appendChild(style);
  }

  return (
    <main className="relative w-full bg-gradient-to-b from-white via-pink-50 to-purple-100 text-gray-900 pt-[90px] sm:pt-[110px] min-h-full scroll-smooth font-sans">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-10 w-[300px] h-[300px] bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 opacity-25 blur-3xl rounded-full animate-blob" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-tr from-purple-400 via-pink-200 to-indigo-300 opacity-25 blur-3xl rounded-full animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <section className="text-center mb-10 px-6 animate-fade-up max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
          💬{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            Support Center
          </span>
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Need help? Get quick answers, contact us directly, or chat with our AI Assistant below.
          <br />
          <span className="block mt-4 text-purple-700 ">{inspiringMsg}</span>
        </p>
      </section>

      {/* Contact Options */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 px-6 animate-fade-up">
        <SupportCard
          icon={<Mail className="text-pink-500" size={30} />}
          title="Email Us"
          desc="Reach our support team anytime."
          link="mailto:support@ezyvoice.ai"
          label="Send Email"
        />
        <SupportCard
          icon={<MessageSquare className="text-purple-500" size={30} />}
          title="Live Chat"
          desc="Chat instantly with our assistant."
          link="#"
          label="Start Chat"
        />
        <SupportCard
          icon={<Phone className="text-indigo-500" size={30} />}
          title="Call Us"
          desc="Mon–Fri, 9AM–6PM IST"
          link="tel:+1800123456"
          label="Call Support"
        />
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl p-8 mb-8 animate-fade-up">
        <div className="text-center mb-8">
          <HelpCircle className="text-pink-500 mx-auto mb-2" size={32} />
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-2 tracking-wide">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-base max-w-lg mx-auto">Find quick answers to common issues.</p>
        </div>
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300 mb-4"
          >
            <button
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-900 hover:text-pink-600 focus:outline-none focus-visible:ring focus-visible:ring-pink-300 rounded-2xl"
              aria-expanded={openFAQ === i}
              aria-controls={`faq-desc-${i}`}
            >
              {faq.q}
              <ChevronDown
                className={`transform transition-transform duration-300 ${openFAQ === i ? "rotate-180 text-pink-600" : "text-gray-400"}`}
              />
            </button>
            <div
              id={`faq-desc-${i}`}
              className={`select-none px-5 pb-5 text-gray-700 leading-relaxed overflow-hidden transition-all duration-500 ${openFAQ === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              aria-hidden={openFAQ !== i}
            >
              {faq.a}
            </div>
          </div>
        ))}
      </section>

      {/* Floating chat icon */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="chat-float-btn fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-5 rounded-full shadow-xl hover:opacity-90 transition-all duration-300 flex items-center gap-3 z-50 sm:p-4 sm:bottom-8 sm:right-8"
          aria-label="Open chat"
          title="Open chat"
        >
          <Bot size={24} />
          <span className="hidden sm:inline text-base font-semibold select-none">Chat</span>
        </button>
      )}

      {/* Chat widget */}
      {chatOpen && (
        <div
          className="chat-widget fixed bottom-20 right-6 w-[340px] sm:w-80 md:w-[340px] bg-white border border-gray-200 rounded-3xl flex flex-col p-5 chat-animate-in backdrop-blur-md z-50 sm:bottom-16 sm:right-4"
          style={{ boxShadow: "0 16px 48px rgba(144, 97, 255, 0.22)" }}
        >
          <header className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-purple-700 flex items-center gap-2 text-lg tracking-wide">
              <Bot size={20} />
              Support Assistant
            </h3>
            <div className="flex gap-1">
              
              {/* 🆕 Updated Delete Button Icon */}
              <button
                onClick={handleClearChat}
                title="Clear chat history"
                aria-label="Clear chat history"
                className="p-2 rounded-full hover:bg-pink-50 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <Trash2 size={18} className="text-pink-500" />
              </button>

              <button
                onClick={handleCloseChat}
                title="Close chat"
                aria-label="Close chat"
                className="p-2 rounded-full hover:bg-pink-50 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <X size={20} />
              </button>
            </div>
          </header>

          {/* Dropdown for quick questions */}
          <div className="mb-3 relative">
            <button
              className="w-full py-2 px-4 border border-pink-300 rounded-2xl bg-pink-50 flex justify-between items-center font-semibold text-pink-600 hover:bg-pink-100 transition focus:outline-none focus:ring-2 focus:ring-pink-400"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label="Select a quick question"
            >
              {dropdownOpen ? "Select a question (hide)" : "Select a quick question"}
              <ChevronDown className={`ml-2 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} size={20} />
            </button>
            {dropdownOpen && (
              <ul
                role="listbox"
                className="dropdown-list absolute z-30 mt-1 w-full max-h-48 overflow-auto rounded-2xl border border-pink-300 bg-white shadow-lg focus:outline-none"
              >
                {dropdownQuestions.map((q, i) => (
                  <li
                    role="option"
                    tabIndex={-1}
                    key={i}
                    className="cursor-pointer px-4 py-2 hover:bg-pink-100 text-gray-800 text-sm select-none"
                    onClick={() => handleSelectDropdown(q)}
                    onKeyDown={(e) => e.key === "Enter" && handleSelectDropdown(q)}
                  >
                    {q}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Chat messages */}
          <div className="chat-messages h-52 overflow-y-auto space-y-3 mb-4 scroll-smooth scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-pink-50">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-2xl break-words text-sm leading-relaxed ${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-gray-900 self-start rounded-tl-none"
                    : "bg-gradient-to-tr from-pink-500 to-purple-600 text-white self-end rounded-br-none ml-auto"
                }`}
                style={{ boxShadow: msg.sender === "user" ? "0 4px 10px rgba(219, 39, 119, 0.5)" : "none" }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 pl-2 text-gray-500 text-xs italic">
                <Loader2 className="animate-spin text-purple-500" size={18} /> Assistant is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="flex gap-3">
            <input
              aria-label="Type a message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="chat-input flex-1 px-4 py-3 border border-gray-300 rounded-3xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              autoComplete="off"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="chat-button bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-3xl shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
              type="button"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom CTA Panel */}
      <section className="w-full flex justify-center px-4 py-14">
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 border border-transparent rounded-3xl shadow-xl max-w-xl w-full text-center py-10 px-6 flex flex-col items-center gap-3 text-white">
          <Bot className="mb-2" size={36} />
          <h3 className="text-2xl font-semibold tracking-wide">Still need help?</h3>
          <p className="text-white text-base mt-1 mb-4 max-w-md mx-auto">
            Our AI Assistant is available 24/7 for instant answers.
          </p>
          <button
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-pink-600 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 font-medium tracking-wide"
            onClick={() => setChatOpen(true)}
            aria-label="Open chat"
          >
            <MessageSquare size={20} className="mr-2" /> Chat Now
          </button>
        </div>
      </section>
    </main>
  );
}

function SupportCard({ icon, title, desc, link, label }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center cursor-pointer select-none">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[#0F172A] mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-600 text-base mb-6">{desc}</p>
      <a
        href={link}
        className="text-pink-600 font-semibold hover:text-pink-700 transition-colors duration-300 tracking-wide"
        target="_blank"
        rel="noopener noreferrer"
      >
        {label} →
      </a>
    </div>
  );
}
