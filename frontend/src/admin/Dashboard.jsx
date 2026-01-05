import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Users,
  Mic,
  Globe2,
  Activity,
  Cpu,
  Server,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

import { adminService } from "../api/services";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    voiceInputsToday: 0,
    avgProcessingTime: "0s",
    successRate: "0%",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load dashboard data on mount
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const dashboardData = await adminService.getDashboard();
      setStats(dashboardData);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ MOCK DATA FOR CHARTS ------------------ */
  const usageData = [
    { name: "Mon", value: 40 },
    { name: "Tue", value: 55 },
    { name: "Wed", value: 32 },
    { name: "Thu", value: 70 },
    { name: "Fri", value: 52 },
  ];

  const languageData = [
    { name: "Tamil", value: 45 },
    { name: "Hindi", value: 20 },
    { name: "English", value: 15 },
    { name: "Telugu", value: 10 },
    { name: "Kannada", value: 8 },
    { name: "Malayalam", value: 2 },
  ];

  const LANGUAGE_COLORS = [
    "#7C3AED",
    "#EC4899",
    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#06B6D4",
  ];

  const activities = [
    ["New user registered", "2 min ago"],
    ["Voice calculation completed", "5 min ago"],
    ["System check completed", "15 min ago"],
    ["New feedback received", "1 hr ago"],
  ];

  const systemStatus = [
    ["Server Load", "32%", "text-indigo-600"],
    ["API Latency", "124ms", "text-pink-600"],
    ["Active Sessions", stats.totalUsers, "text-purple-600"],
    ["Uptime", "99.98%", "text-emerald-600"],
  ];

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Admin Dashboard 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Real-time system overview & performance
          </p>
        </div>

        <button
          onClick={loadDashboard}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </header>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={<Users size={32} className="text-purple-600" />}
              label="Total Users"
              value={stats.totalUsers}
            />
            <StatCard
              icon={<Mic size={32} className="text-pink-600" />}
              label="Voice Inputs Today"
              value={stats.voiceInputsToday}
            />
            <StatCard
              icon={<Cpu size={32} className="text-indigo-600" />}
              label="Avg Processing Time"
              value={stats.avgProcessingTime}
            />
            <StatCard
              icon={<Activity size={32} className="text-emerald-600" />}
              label="Success Rate"
              value={stats.successRate}
            />
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Voice Usage */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mic className="text-pink-500" /> Voice Usage This Week
              </h2>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Language Distribution */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe2 className="text-purple-500" /> Language Distribution
              </h2>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      dataKey="value"
                      label
                    >
                      {languageData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={LANGUAGE_COLORS[i % LANGUAGE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Activity & Status */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="text-blue-500" /> Recent Activity
              </h2>

              <ul className="space-y-4">
                {activities.map(([text, time], i) => (
                  <li key={i} className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">{text}</span>
                    <span className="text-gray-500 text-sm">{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Server className="text-gray-700" /> System Status
              </h2>

              <div className="space-y-5">
                {systemStatus.map(([label, value, color], i) => (
                  <div key={i} className="flex justify-between items-center">
                    <p className="text-gray-700">{label}</p>
                    <p className={`font-bold ${color} text-lg`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

/* Stat Card Component */
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        {icon}
        <ArrowUpRight className="text-green-600" />
      </div>

      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  );
}