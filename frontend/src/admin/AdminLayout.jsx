import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UsersRound,
  Tag,
  Layers,
  CreditCard,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import ScrollToTop from "../ScrollToTop";
import logo from "../assets/logo.jpg";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("admin-auth");
    localStorage.removeItem("admin-user");

    navigate("/admin/login", { replace: true });
  };

  return (
    <div
      className="flex h-screen overflow-hidden bg-[#F6F3FA]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <ScrollToTop />

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          ${open ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          fixed md:static z-50
          h-full flex flex-col
          bg-white/90 backdrop-blur-xl border-r
          transition-all duration-300
        `}
      >
        {/* LOGO + TOGGLE */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-9 w-9 object-cover rounded-md"
            />

            {open && (
              <span className="text-lg font-extrabold text-[#0F172A]">
                EZY{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8746FF] to-[#F021B9]">
                  VOICE
                </span>
              </span>
            )}
          </div>

          <X
            className="md:hidden cursor-pointer text-gray-700"
            onClick={() => setMobileOpen(false)}
          />

          <Menu
            className="hidden md:block cursor-pointer text-gray-700"
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {open && <Section title="Main" />}

          <NavItem to="/admin" end icon={<LayoutDashboard />} label="Dashboard" open={open} />
          <NavItem to="/admin/users" icon={<UsersRound />} label="Users" open={open} />

          {open && <Section title="Management" />}

          <NavItem to="/admin/offers" icon={<Tag />} label="Offers" open={open} />
          <NavItem to="/admin/plans" icon={<Layers />} label="Plans" open={open} />
          <NavItem
            to="/admin/transactions"
            icon={<CreditCard />}
            label="Transactions"
            open={open}
          />
        </nav>

        {/* ADMIN PROFILE + LOGOUT */}
        <div className="border-t p-4">
          <div
            className={`flex items-center gap-3 ${
              open ? "justify-start" : "justify-center"
            }`}
          >
            <img
              src="https://i.pravatar.cc/60"
              alt="Admin"
              className="w-10 h-10 rounded-full border"
            />

            {open && (
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>
            )}
          </div>

          {open && (
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2
              text-sm text-red-600 hover:bg-red-50 py-2 rounded-lg transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="md:hidden mb-4">
          <Menu
            size={24}
            className="cursor-pointer text-gray-700"
            onClick={() => setMobileOpen(true)}
          />
        </div>

        {children}
      </main>
    </div>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

function Section({ title }) {
  return (
    <p className="text-xs font-semibold uppercase text-[#64748B] pl-2 mt-4 mb-1">
      {title}
    </p>
  );
}

function NavItem({ to, icon, label, open, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2.5 rounded-lg transition-all
        ${
          isActive
            ? "bg-gradient-to-r from-[#8746FF]/20 to-[#F021B9]/20 text-[#8746FF] font-semibold"
            : "text-gray-700 hover:bg-[#F1E9FF] hover:text-[#8746FF]"
        }`
      }
    >
      <span className="text-[19px]">{icon}</span>
      {open && <span className="font-medium">{label}</span>}
    </NavLink>
  );
}
