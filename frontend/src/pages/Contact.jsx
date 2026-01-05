import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquareHeart, CheckCircle } from "lucide-react";
import api from "../api/axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await api.post("/contact", formData);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-full bg-white text-gray-900 overflow-x-hidden scroll-smooth mt-[30px] sm:mt-[-6px] md:mt-[1px]">
      {/* Floating Gradient Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-10 w-[280px] sm:w-[380px] md:w-[420px] h-[280px] sm:h-[380px] md:h-[420px] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-30 blur-3xl rounded-full animate-blob" />
        <div className="absolute top-1/2 -right-40 w-[300px] sm:w-[420px] md:w-[480px] h-[300px] sm:h-[420px] md:h-[480px] bg-gradient-to-tr from-indigo-400 via-pink-400 to-purple-500 opacity-25 blur-3xl rounded-full animate-blob animation-delay-2000" />
      </div>

      {/* HERO SECTION */}
      <section className="w-full min-h-[65vh] flex flex-col justify-center items-center text-center relative z-10 bg-gradient-to-b from-white via-pink-50 to-purple-50 px-[4px] sm:px-6 md:px-10 py-10 sm:py-16 md:py-24">
        <div className="text-center mb-5 animate-fade-in">
          <p className="uppercase tracking-[0.25em] text-[11px] sm:text-sm text-pink-600 font-semibold mb-[8px] sm:mb-[10px]">
            We'd Love to Hear From You
          </p>
          <div className="w-20 sm:w-24 h-[3px] mx-auto mb-[16px] sm:mb-[20px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-90 animate-gradient-x"></div>
        </div>

        <h1 className="text-[1.6rem] sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#0F172A] mb-4 animate-fade-up">
          Let's Build the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            Future of Voice Intelligence
          </span>{" "}
          Together
        </h1>

        <p className="text-gray-700 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-up delay-200 px-1 sm:px-3">
          Innovation starts with a simple conversation. Whether you're a creator, developer,
          or visionary — your voice matters. Let's shape smarter, more natural communication
          experiences together.
        </p>

        <div className="mt-5 sm:mt-6 flex justify-center items-center gap-2 sm:gap-3 text-pink-600 font-medium text-xs sm:text-base animate-fade-up delay-300">
          <MessageSquareHeart className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>We reply within 24 hours ❤</span>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="w-full py-10 sm:py-16 px-4 sm:px-8 md:px-20 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center justify-items-center md:justify-items-start">
          
          {/* Left Info */}
          <div className="animate-fade-up delay-200 text-center md:text-left">
            <h2 className="text-xl sm:text-3xl font-bold text-[#0F172A] mb-4">
              Connect. Collaborate. Create.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
              Whether you're an AI enthusiast, developer, or someone with a bold idea —
              <span className="font-semibold text-pink-600"> EzyVoiceCalc </span> was built to
              listen. Let's collaborate to make voice-based intelligence smarter, friendlier,
              and more human.
            </p>

            <div className="space-y-5 pt-4">
              <ContactInfo
                icon={<Mail className="text-pink-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />}
                label="Email"
                value="expression132@gmail.com"
              />
              <ContactInfo
                icon={<Phone className="text-purple-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />}
                label="Phone"
                value="+91 98765 43210"
              />
              <ContactInfo
                icon={<MapPin className="text-indigo-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />}
                label="Location"
                value="Salem, Tamil Nadu, India"
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-lg bg-white/70 border border-gray-200 p-2 sm:p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 animate-fade-up delay-400 w-full"
          >
            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-green-800 font-semibold">Message sent successfully!</p>
                  <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <Input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            
            <textarea
              name="message"
              placeholder="Your Message..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-500 transition resize-none text-sm sm:text-base"
            ></textarea>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 mt-5 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} className="sm:w-5 sm:h-5" />
                  Send Message
                </>
              )}
            </button>

            <p className="text-center text-gray-500 text-xs mt-3">
              Your message will be sent to <strong>expression132@gmail.com</strong>
            </p>
          </form>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full bg-gradient-to-r from-pink-100 via-white to-purple-100 py-10 sm:py-16 md:py-20 text-center relative z-10 px-[6px] sm:px-10 md:px-20">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 animate-fade-up">
          Let's Turn Conversation Into Creation
        </h2>
        <p className="text-gray-600 text-xs sm:text-base md:text-lg mb-6 max-w-2xl mx-auto animate-fade-up delay-200">
          Every idea begins with a voice.{" "}
          <span className="font-semibold text-pink-600">EzyVoiceCalc</span> is here to listen —
          and help bring your ideas to life.
        </p>
      </section>
    </main>
  );
}

/* --- REUSABLE COMPONENTS --- */
function Input({ type = "text", name, placeholder, value, onChange, required }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-500 transition text-sm sm:text-base"
    />
  );
}

function ContactInfo({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 justify-center md:justify-start text-center md:text-left">
      {icon}
      <div>
        <p className="text-gray-900 font-semibold text-sm sm:text-base">{label}</p>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base">{value}</p>
      </div>
    </div>
  );
}

/* Animations */
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

if (typeof document !== "undefined" && !document.getElementById("contact-animations")) {
  const style = document.createElement("style");
  style.id = "contact-animations";
  style.innerHTML = styles;
  document.head.appendChild(style);
}