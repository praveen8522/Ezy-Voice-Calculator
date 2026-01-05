import { Facebook, Twitter, Linkedin, Github, Mail } from "lucide-react";
import logo from "../assets/logo.jpg"; 

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-gray-300 pt-12 pb-6 px-6 sm:px-10 md:px-16 lg:px-24 relative overflow-hidden">
      
      {/* Gradient Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute -left-20 bottom-0 w-[200px] h-[200px] bg-gradient-to-tr from-pink-500/30 to-purple-600/40 blur-3xl rounded-full" />
        <div className="absolute -right-20 top-0 w-[200px] h-[200px] bg-gradient-to-br from-purple-600/30 to-pink-500/40 blur-3xl rounded-full" />
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 mb-10">
        
        {/* --- BRAND SECTION --- */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={logo}
              alt="EZY Voice Logo"
              className="w-8 h-8 object-contain"
            />
            <h2 className="text-xl font-bold text-white tracking-wide">
              EZY <span className="text-pink-500">VOICE</span>
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Simplifying human–math interaction through voice intelligence.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-5">
            <SocialIcon Icon={Facebook} />
            <SocialIcon Icon={Twitter} />
            <SocialIcon Icon={Linkedin} />
            <SocialIcon Icon={Github} />
          </div>
        </div>

        {/* --- QUICK LINKS --- */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="#features"
                className="hover:text-pink-400 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-pink-400 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-pink-400 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* --- CONTACT --- */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
            Get in Touch
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Have a question or feedback? We’d love to hear from you.
          </p>
          <a
            href="mailto:support@ezyvoicecalc.com"
            className="inline-flex items-center gap-2 text-pink-400 hover:text-purple-400 text-sm font-medium transition-colors"
          >
            <Mail size={16} /> support@ezyvoicecalc.com
          </a>
        </div>
      </div>

      {/* --- FOOTER BOTTOM --- */}
      <div className="border-t border-slate-800 pt-6 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">
            EzyVoiceCalc
          </span>{" "}
          — Where Intelligence Speaks Numbers.
        </p>
      </div>
    </footer>
  );
}

/* --- Social Icon Component --- */
function SocialIcon({ Icon }) {
  return (
    <a
      href="#"
      className="p-2 rounded-full bg-slate-800/70 hover:bg-pink-500/20 hover:text-pink-400 transition-all duration-300"
    >
      <Icon size={18} />
    </a>
  );
}
