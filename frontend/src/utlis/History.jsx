import { useState, useEffect } from "react";
import { Clock, Trash2, Filter, Sparkles, Calculator, RefreshCw, ChevronLeft, ChevronRight, TrendingUp, BarChart3, X } from "lucide-react";

export default function History() {
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [showStats, setShowStats] = useState(false);

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    loadHistory();
  }, [currentPage, filter, typeFilter, languageFilter]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError("Please login to view history");
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        filter,
        type: typeFilter,
        language: languageFilter
      });

      const response = await fetch(`http://localhost:5000/api/voice/history?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load history');
      }

      const data = await response.json();
      
      setLogs(data.history);
      setPagination(data.pagination);
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      setError(err.message || "Failed to load history");
      console.error("History load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/voice/history/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Stats load error:", err);
    }
  };

  const clearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear all history?")) return;

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/voice/history', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to clear history');
      }

      setLogs([]);
      setCurrentPage(1);
      loadStats();
    } catch (err) {
      setError(err.message || "Failed to clear history");
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Delete this entry?")) return;

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/voice/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }

      loadHistory();
      loadStats();
    } catch (err) {
      setError(err.message || "Failed to delete entry");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const languageLabels = {
    "ta-IN": "Tamil 🇮🇳",
    "hi-IN": "Hindi 🇮🇳",
    "en-US": "English 🇬🇧",
    "te-IN": "Telugu 🇮🇳",
    "kn-IN": "Kannada 🇮🇳",
    "ml-IN": "Malayalam 🇮🇳",
  };

  return (
    <main className="relative w-full bg-gradient-to-b from-white via-pink-50 to-purple-100 text-gray-900 overflow-x-hidden pt-24 min-h-screen px-4 pb-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 opacity-25 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tr from-purple-400 via-pink-300 to-indigo-400 opacity-25 blur-3xl rounded-full animate-pulse" />
      </div>

      <section className="text-center mb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          🕒 Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">History</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Review your recent voice commands and calculations
        </p>
      </section>

      {error && (
        <div className="max-w-4xl mx-auto mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Statistics Card */}
      {stats && stats.overall && stats.overall[0] && (
        <section className="max-w-6xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="text-purple-500" size={20} />
                Your Statistics
              </h2>
              <button
                onClick={() => setShowStats(!showStats)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                {showStats ? 'Hide' : 'Show'} Details
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Total Calculations"
                value={stats.overall[0].totalCalculations || 0}
                icon={<Calculator size={20} />}
              />
              <StatCard
                label="Avg Processing"
                value={`${Math.round(stats.overall[0].avgProcessingTime || 0)}ms`}
                icon={<Clock size={20} />}
              />
              <StatCard
                label="Total Duration"
                value={`${Math.round(stats.overall[0].totalDuration || 0)}s`}
                icon={<TrendingUp size={20} />}
              />
              <StatCard
                label="Languages Used"
                value={stats.byLanguage?.length || 0}
                icon={<Sparkles size={20} />}
              />
            </div>

            {showStats && stats.byLanguage && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Language Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {stats.byLanguage.map((lang, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm">{languageLabels[lang._id] || lang._id}</span>
                      <span className="text-sm font-semibold text-purple-600">{lang.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="max-w-6xl mx-auto mb-6">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="text-purple-500" size={20} />
              <span className="font-semibold text-gray-900">Filters</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>

              {/* <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="voice">Voice</option>
                <option value="command">Command</option>
                <option value="system">System</option>
              </select> */}

              <select
                value={languageFilter}
                onChange={(e) => {
                  setLanguageFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Languages</option>
                {Object.entries(languageLabels).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>

              <button
                onClick={loadHistory}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Refresh"
              >
                <RefreshCw size={18} className="text-purple-600" />
              </button>

              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:opacity-90 transition"
              >
                <Trash2 size={16} /> Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-gray-600">Loading history...</p>
        </div>
      )}

      {!loading && logs.length > 0 && (
        <>
          <section className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 text-gray-700">
                    <th className="p-3 text-left text-sm font-semibold">Time</th>
                    <th className="p-3 text-left text-sm font-semibold">Type</th>
                    <th className="p-3 text-left text-sm font-semibold">Input</th>
                    <th className="p-3 text-left text-sm font-semibold">Result</th>
                    <th className="p-3 text-left text-sm font-semibold">Language</th>
                    {/* <th className="p-3 text-left text-sm font-semibold">Processing</th>
                    <th className="p-3 text-center text-sm font-semibold">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="p-3 text-xs text-gray-500" title={formatDate(log.timestamp)}>
                        {getTimeAgo(log.timestamp)}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium capitalize">
                          {log.type}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-sm max-w-xs truncate" title={log.text}>
                        {log.text}
                      </td>
                      <td className="p-3 font-bold text-purple-600">
                        {log.result || "—"}
                      </td>
                      <td className="p-3 text-sm">
                        {languageLabels[log.language] || log.language}
                      </td>
                      {/* <td className="p-3 text-xs text-gray-600">
                        {log.processingTime ? `${log.processingTime}ms` : '—'}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => deleteEntry(log._id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition text-red-500"
                          title="Delete entry"
                        >
                          <X size={16} />
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <section className="max-w-6xl mx-auto flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={!pagination.hasPrevPage}
                className="p-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                <ChevronLeft size={20} />
              </button>

              <span className="text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
                <span className="text-gray-400 ml-2">
                  ({pagination.totalRecords} total)
                </span>
              </span>

              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!pagination.hasNextPage}
                className="p-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                <ChevronRight size={20} />
              </button>
            </section>
          )}
        </>
      )}

      {!loading && logs.length === 0 && !error && (
        <section className="text-center py-20">
          <Sparkles className="text-purple-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No History Yet</h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
            Start using Voice Calculator to see your history here.
          </p>
          <button
            onClick={() => window.location.href = '/voice-popup'}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-md hover:opacity-90 transition"
          >
            Try Voice Calculator
          </button>
        </section>
      )}
    </main>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
      <div className="text-purple-600">{icon}</div>
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}