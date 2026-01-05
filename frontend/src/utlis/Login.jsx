import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, User, Mail, Lock, Phone, LogIn, UserPlus, AlertCircle } from "lucide-react";
import { authService } from "../api/services";

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Signup State
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.login(loginData);
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.register(signupData);
      navigate("/"); // Redirect to home after successful signup
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden px-4 sm:px-8">
      {/* Floating Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-[350px] h-[350px] bg-pink-400/25 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-400/25 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <section className="text-center mt-16 sm:mt-24 mb-6 sm:mb-10 md:mb-12 lg:mb-14 z-10 px-2 animate-fadeIn">
        <h3 className="text-xs sm:text-sm font-semibold text-pink-600 tracking-[0.25em] uppercase mb-4 relative inline-block">
          Empower. Express. Elevate.
          <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></span>
        </h3>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-2 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Speak Smarter.
          </span>{" "}
          Think Louder.
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
          Transform your voice into action — where innovation meets expression.
        </p>
      </section>

      {/* Login/Signup Card */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl pt-10 px-5 pb-5 sm:p-8 md:p-10 transition-all duration-500 z-10 animate-slideUp mb-8 sm:mb-14 md:mb-20">
        
        {/* Close Button */}
        <button 
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-pink-600 transition"
        >
          <X size={22} />
        </button>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-shake">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-red-600 text-sm flex-1">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex mb-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <button
            className={`flex-1 py-2 sm:py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === "signup"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "text-gray-500 hover:text-gray-700 bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("signup");
              setError("");
            }}
          >
            Sign Up
          </button>

          <button
            className={`flex-1 py-2 sm:py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === "login"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "text-gray-500 hover:text-gray-700 bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
          >
            Log In
          </button>
        </div>

        {/* SIGNUP FORM */}
        {activeTab === "signup" && (
          <div onSubmit={handleSignup}>
            <InputField
              icon={<User size={18} />}
              placeholder="Full Name"
              type="text"
              value={signupData.name}
              onChange={(e) => {
                setSignupData({ ...signupData, name: e.target.value });
                setError("");
              }}
              required
            />
            <InputField
              icon={<Phone size={18} />}
              placeholder="Mobile Number (e.g., +91 9876543210)"
              type="tel"
              value={signupData.phone}
              onChange={(e) => {
                setSignupData({ ...signupData, phone: e.target.value });
                setError("");
              }}
              required
            />
            <InputField
              icon={<Mail size={18} />}
              placeholder="Email Address"
              type="email"
              value={signupData.email}
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
                setError("");
              }}
              required
            />
            <InputField
              icon={<Lock size={18} />}
              placeholder="Password (min 6 characters)"
              type="password"
              value={signupData.password}
              onChange={(e) => {
                setSignupData({ ...signupData, password: e.target.value });
                setError("");
              }}
              required
            />

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full mt-4 py-3 sm:py-3.5 flex items-center justify-center gap-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>
                  <UserPlus size={18} /> Sign up
                </>
              )}
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {activeTab === "login" && (
          <div onSubmit={handleLogin}>
            <InputField
              icon={<Mail size={18} />}
              placeholder="Email Address"
              type="email"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
                setError("");
              }}
              required
            />
            <InputField
              icon={<Lock size={18} />}
              placeholder="Password"
              type="password"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin(e);
                }
              }}
              required
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-4 py-3 sm:py-3.5 flex items-center justify-center gap-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                <>
                  <LogIn size={18} /> Log in
                </>
              )}
            </button>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-xs sm:text-sm mt-5">
          By continuing, you agree to our{" "}
          <span className="text-pink-600 font-medium hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-purple-600 font-medium hover:underline cursor-pointer">
            Privacy Policy
          </span>.
        </p>
      </div>
    </main>
  );
}

/* Reusable Input Component */
function InputField({ icon, placeholder, type, value, onChange, required, onKeyDown }) {
  return (
    <div className="relative mb-4">
      <span className="absolute left-3 top-3.5 text-gray-500">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
}

// Add animations
if (typeof document !== "undefined" && !document.getElementById("login-animations")) {
  const style = document.createElement("style");
  style.id = "login-animations";
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.6s ease-out;
    }
    
    .animate-slideUp {
      animation: slideUp 0.6s ease-out;
    }
    
    .animate-shake {
      animation: shake 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);
}