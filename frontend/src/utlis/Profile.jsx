import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Edit3, Mail, Settings, Globe2, LogOut, Sparkles, Phone, MapPin } from "lucide-react";
import { userService, authService } from "../api/services";

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    language: "ta-IN",
    theme: "Vibrant",
    city: "",
  });

  // Load user profile on mount and check authentication
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Check if user is authenticated
        if (!authService.isAuthenticated()) {
          navigate("/login");
          return;
        }

        const user = authService.getCurrentUser();
        if (!user) {
          navigate("/login");
          return;
        }

        // Load profile data from API
        const userData = await userService.getProfile();
        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          language: userData.language || "ta-IN",
          theme: userData.theme || "Vibrant",
          city: userData.city || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          authService.logout();
        }
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await userService.updateProfile(profile);
      setSuccess("Profile updated successfully!");
      setEditing(false);
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        authService.logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      authService.logout();
    }
  };

  return (
    <main className="relative w-full bg-gradient-to-b from-white via-pink-50 to-purple-100 text-gray-900 overflow-x-hidden pt-[90px] sm:pt-[110px] min-h-screen scroll-smooth">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-25 blur-3xl rounded-full animate-blob" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-tr from-purple-400 via-pink-300 to-indigo-400 opacity-25 blur-3xl rounded-full animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <section className="text-center mb-10 px-6 animate-fade-up">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] mb-3">
          👤 My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">Profile</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Manage your account details, preferences, and profile settings.
        </p>
      </section>

      {/* Success/Error Messages */}
      {success && (
        <div className="max-w-4xl mx-auto mb-4 mx-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm animate-fade-in">
          {success}
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto mb-4 mx-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-fade-in">
          {error}
        </div>
      )}

      {/* Profile Card */}
      <section className="max-w-4xl mx-auto mx-6 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-10 mb-16 animate-fade-up">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-5">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg animate-pulse">
              {profile.name.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Edit3 size={14} className="text-white" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-[#0F172A]">{profile.name || "User"}</h2>
          <p className="text-gray-600 text-sm mb-6">{profile.email}</p>

          {/* Edit Button */}
          <button
            onClick={() => setEditing(!editing)}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-md hover:opacity-90 transition-all duration-300 flex items-center gap-2"
          >
            <Settings size={18} /> {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Editable Fields */}
        {editing && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <ProfileInput
              label="Full Name"
              icon={<User size={18} className="text-pink-500" />}
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <ProfileInput
              label="Email Address"
              icon={<Mail size={18} className="text-purple-500" />}
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled
            />
            <ProfileInput
              label="Phone Number"
              icon={<Phone size={18} className="text-indigo-500" />}
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <ProfileInput
              label="City"
              icon={<MapPin size={18} className="text-green-500" />}
              value={profile.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            <ProfileSelect
              label="Preferred Language"
              icon={<Globe2 size={18} className="text-indigo-500" />}
              value={profile.language}
              options={["ta-IN", "hi-IN", "en-US", "te-IN", "kn-IN", "ml-IN"]}
              onChange={(e) => handleChange("language", e.target.value)}
            />
            <ProfileSelect
              label="Theme Style"
              icon={<Sparkles size={18} className="text-pink-400" />}
              value={profile.theme}
              options={["Vibrant", "Dark", "Minimal"]}
              onChange={(e) => handleChange("theme", e.target.value)}
            />
          </div>
        )}

        {/* Save Button */}
        {editing && (
          <div className="text-center mt-8">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </section>

      {/* Logout Button */}
      <section className="text-center mb-16 animate-fade-up px-6">
        <button 
          onClick={handleLogout}
          className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all duration-300 flex items-center gap-2 mx-auto"
        >
          <LogOut size={18} /> Logout
        </button>
      </section>
    </main>
  );
}

/* Reusable Input Components */
function ProfileInput({ label, icon, value, onChange, disabled }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2 mt-2 border border-gray-300 rounded-lg p-3 bg-white/70 focus-within:border-pink-500 transition">
        {icon}
        <input
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </div>
  );
}

function ProfileSelect({ label, icon, value, options, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2 mt-2 border border-gray-300 rounded-lg p-3 bg-white/70 focus-within:border-pink-500 transition">
        {icon}
        <select
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-gray-800"
        >
          {options.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* Animations */
const styles = `
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(25px, -15px) scale(1.05); }
}
.animate-blob { animation: blob 10s ease-in-out infinite; }
.animation-delay-2000 { animation-delay: 2s; }

@keyframes fade-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 0.8s ease-out forwards; }

@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-x { background-size: 200% 200%; animation: gradient-x 6s ease infinite; }
`;

if (typeof document !== "undefined" && !document.getElementById("profile-animations")) {
  const style = document.createElement("style");
  style.id = "profile-animations";
  style.innerHTML = styles;
  document.head.appendChild(style);
}