import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Settings,
  User,
  CreditCard,
  Headphones,
  LogOut,
  Mic,
  History,
} from "lucide-react";

import logo from "../assets/logo.jpg";
import { authService } from "../api/services";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const settingsRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Voice Mode", path: "/voice" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Check if user is authenticated
  const isAuthenticated = authService.isAuthenticated();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate & close menus
  const handleNavigate = (path) => {
    setSettingsOpen(false);
    setOpen(false);
    navigate(path);
  };

  // Handle logout with confirmation
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      authService.logout();
      setSettingsOpen(false);
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl h-20 mx-auto flex items-center justify-between p-5 sm:p-4 md:px-8 md:py-3 lg:px-12 lg:py-4">
        
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="EZY Voice Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain"
          />
          <h1 className="text-lg sm:text-xl font-bold text-gray-100 tracking-wide">
            EZY <span className="text-pink-500">VOICE</span>
          </h1>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                to={item.path}
                className={`text-gray-300 hover:text-pink-400 text-[13px] md:text-[14px] lg:text-[15px] font-medium transition-all duration-200 ${
                  location.pathname === item.path ? "text-pink-400" : ""
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-1/2 bottom-[-4px] h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* --- RIGHT SECTION --- */}
        <div className="hidden md:flex items-center gap-3 md:gap-4 relative">
          {/* CTA */}
          <Link
            to="/voice-popup"
            className="px-3 sm:px-4 md:px-5 py-2 text-xs sm:text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-all duration-200 shadow-md flex items-center gap-2"
          >
            <Mic size={16} />
            <span className="hidden sm:inline">Voice Mode</span>
          </Link>

          {/* Show settings only if authenticated */}
          {isAuthenticated && (
            <div ref={settingsRef} className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-800 hover:bg-slate-700 transition-all duration-200 text-gray-300 hover:text-white border border-slate-700"
              >
                <Settings size={18} />
              </button>

              {settingsOpen && (
                <div className="absolute right-0 mt-3 w-52 sm:w-56 bg-slate-900/95 backdrop-blur-lg border border-slate-800 rounded-xl shadow-lg overflow-hidden z-50">
                  <ul className="py-2 text-sm text-gray-300">
                    <DropdownItem 
                      icon={<User size={16} />} 
                      label="My Profile" 
                      onClick={() => handleNavigate("/profile")} 
                    />
                    <DropdownItem 
                      icon={<CreditCard size={16} />} 
                      label="Plans & Billing" 
                      onClick={() => handleNavigate("/plans")} 
                    />
                    <DropdownItem 
                      icon={<Headphones size={16} />} 
                      label="Support" 
                      onClick={() => handleNavigate("/support")} 
                    />
                    <hr className="border-slate-700 my-1" />
                    <DropdownItem 
                      icon={<History size={16} />} 
                      label="History" 
                      onClick={() => handleNavigate("/history")} 
                    />
                    <DropdownItem 
                      icon={<LogOut size={16} />} 
                      label="Logout" 
                      onClick={handleLogout}
                      danger
                    />
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Show login button if not authenticated */}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-all duration-200 shadow-md"
            >
              Login
            </Link>
          )}
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-300 hover:text-white transition"
          aria-label="Toggle Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      <div
        className={`md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 shadow-lg overflow-hidden transition-all duration-500 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-6 text-gray-200 text-base px-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setOpen(false)}
                className="hover:text-pink-400 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}

          <Link
            to="/voice-popup"
            onClick={() => setOpen(false)}
            className="px-6 py-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-md"
          >
            Try Voice Mode
          </Link>

          {/* Mobile Settings - only show if authenticated */}
          {isAuthenticated && (
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-800 w-full text-gray-300 text-sm px-4">
              <Link 
                to="/profile" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-2 hover:text-pink-400"
              >
                <User size={16} /> My Profile
              </Link>
              <Link 
                to="/plans" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-2 hover:text-pink-400"
              >
                <CreditCard size={16} /> Plans & Billing
              </Link>
              <Link 
                to="/support" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-2 hover:text-pink-400"
              >
                <Headphones size={16} /> Support
              </Link>
              <Link 
                to="/history" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-2 hover:text-pink-400"
              >
                <History size={16} /> History
              </Link>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 hover:text-red-400 text-left"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}

          {/* Mobile Login button - only show if not authenticated */}
          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-6 py-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-md"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

/* --- Dropdown Item --- */
function DropdownItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gradient-to-r ${
        danger 
          ? 'from-red-500/10 to-red-600/10 hover:text-red-400' 
          : 'from-pink-500/10 to-purple-600/10 hover:text-white'
      } transition-all text-left`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}