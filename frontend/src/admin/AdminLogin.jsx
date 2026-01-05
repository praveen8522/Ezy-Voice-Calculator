import { useState } from "react";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  // Mock navigate function - replace with your actual router
  const navigate = (path) => {
    window.location.href = path;
  };
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Mock API call - replace with your actual adminService
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      if (data.success && data.token) {
        localStorage.setItem('admin-token', data.token);
        localStorage.setItem('admin-auth', 'true');
        localStorage.setItem('admin-user', JSON.stringify(data.admin));
        navigate("/admin");
      }
    } catch (err) {
      const errorMessage = err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Admin login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">
      <div className="bg-white/80 backdrop-blur-xl border shadow-xl rounded-2xl p-8 w-full max-w-md animate-fadeIn">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-shake">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-red-600 text-sm flex-1">{error}</p>
          </div>
        )}

        <div onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(""); // Clear error on input change
              }}
              className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Admin Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error on input change
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin(e);
                }
              }}
              className="w-full pl-10 pr-12 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2025 EzyVoiceCalc Admin Panel
        </p>
      </div>
    </div>
  );
}

// Add animation styles
if (typeof document !== "undefined" && !document.getElementById("admin-login-styles")) {
  const style = document.createElement("style");
  style.id = "admin-login-styles";
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
    
    .animate-shake {
      animation: shake 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);
}