import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Mic, Play, Trash2, Filter, Sparkles } from "lucide-react";
import { voiceService, authService } from "../api/services";

export default function History() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          navigate("/login");
          return;
        }

        const history = await voiceService.getHistory();
        
        // Transform backend data to match frontend format
        const transformedLogs = history.map((item) => ({
          id: item._id,
          type: item.type,
          text: item.text,
          result: item.result,
          time: getTimeAgo(new Date(item.timestamp)),
        }));

        setLogs(transformedLogs);
      } catch (err) {
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [navigate]);

  // Filter logs
  const filteredLogs = filter === "all" 
    ? logs 
    : logs.filter((log) => log.type === filter);

  // Clear all history
  const clearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear all history?")) return;

    try {
      await voiceService.clearHistory();
      setLogs([]);
    } catch (err) {
      setError("Failed to clear history");
    }
  };

  // Helper: Get time ago string
  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds} sec ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }

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
          🕒 Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">History</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Review your recent voice commands and calculations.
        </p>
      </section>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-gray-600">Loading history...</p>
        </div>
      )}

      {/* Activity Timeline */}
      {!loading && logs.length > 0 && (
        <section className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-10 mb-12 animate-fade-up">
          <h2 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
            <Clock className="text-pink-500" /> Recent Activity
          </h2>

          <ul className="relative border-l-2 border-pink-200 pl-6 space-y-6">
            {logs.slice(0, 10).map((log) => (
              <li key={log.id} className="relative">
                <div className="absolute -left-[10px] top-1 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-md"></div>
                <div className="bg-white/70 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                  <p className="text-gray-800 text-sm font-medium">{log.text}</p>
                  {log.result && (
                    <p className="text-purple-600 font-semibold mt-1">Result: {log.result}</p>
                  )}
                  <span className="text-xs text-gray-500">{log.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* History Filter & Table */}
      {!loading && logs.length > 0 && (
        <section className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-10 mb-16 animate-fade-up">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-[#0F172A] flex items-center gap-2">
              <Filter className="text-purple-500" /> Voice Command History
            </h2>
            <div className="flex items-center gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2.5 border border-gray-300 rounded-lg bg-white/70 focus:border-pink-500 text-gray-700 text-sm"
              >
                <option value="all">All</option>
                <option value="voice">Voice Commands</option>
                <option value="command">Settings</option>
                <option value="system">System</option>
              </select>

              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg text-sm flex items-center gap-2 hover:opacity-90 transition-all duration-300"
              >
                <Trash2 size={16} /> Clear All
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm text-gray-800">
              <thead>
                <tr className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 text-gray-700">
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Command / Action</th>
                  <th className="p-3 text-left">Result</th>
                  <th className="p-3 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="p-3 capitalize">{log.type}</td>
                    <td className="p-3">{log.text}</td>
                    <td className="p-3 font-semibold text-purple-600">
                      {log.result || "—"}
                    </td>
                    <td className="p-3">{log.time}</td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-gray-500 py-5 italic"
                    >
                      No history found for this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading && logs.length === 0 && (
        <section className="text-center py-20 animate-fade-up">
          <Sparkles className="text-purple-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-semibold text-[#0F172A] mb-2">No History Yet</h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
            Start using Voice Calculator to see your history here.
          </p>
          <button
            onClick={() => navigate("/voice-popup")}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-md hover:opacity-90 transition"
          >
            Try Voice Calculator
          </button>
        </section>
      )}
    </main>
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

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-x { background-size: 200% 200%; animation: gradient-x 6s ease infinite; }
`;

if (typeof document !== "undefined" && !document.getElementById("history-animations")) {
  const style = document.createElement("style");
  style.id = "history-animations";
  style.innerHTML = styles;
  document.head.appendChild(style);
}