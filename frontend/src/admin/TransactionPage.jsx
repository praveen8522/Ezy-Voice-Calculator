import { useState } from "react";
import { Search, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function TransactionsPage() {
  // ------------------ SAMPLE DATA ------------------
  const paymentMethods = ["UPI", "Credit Card", "Debit Card", "NetBanking"];
  const statusOptions = ["Success", "Pending", "Failed"];
  const users = [
    "Arjun Kumar", "Priya Sharma", "Rohan Gupta", "Sneha Iyer",
    "Vikram Patel", "Amit Joshi", "Neha Verma", "Farhan Ali", "Zoya Khan", "Rahul Singh"
  ];

  const allTransactions = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    user: users[Math.floor(Math.random() * users.length)],
    amount: (100 + Math.floor(Math.random() * 2000)).toFixed(2),
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    date: `2025-03-${String((i % 28) + 1).padStart(2, "0")} • ${String((i % 12) + 1).padStart(2, "0")}:00 PM`,
  }));

  // ------------------ PAGINATION ------------------
  const PER_PAGE = 30;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allTransactions.length / PER_PAGE);

  const pageStart = (page - 1) * PER_PAGE;
  const pageEnd = pageStart + PER_PAGE;
  const transactions = allTransactions.slice(pageStart, pageEnd);

  return (
    <div className="w-full min-h-screen text-gray-800 overflow-x-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Transactions
          </h1>
          <p className="text-gray-500 text-sm mt-1">View detailed transaction history</p>
        </div>

        <div className="relative mt-4 sm:mt-0 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full sm:w-72 px-4 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      {/* ------------------ MOBILE CARD VIEW ------------------ */}
      <div className="grid sm:hidden gap-4">
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="bg-white p-4 rounded-xl shadow border hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">{txn.user}</p>
              <p className="font-bold text-purple-600">₹{txn.amount}</p>
            </div>

            <p className="text-sm text-gray-600 mt-1">{txn.paymentMethod}</p>
            <p className="text-gray-500 text-xs mt-1">{txn.date}</p>

            <div className="mt-3">
              {txn.status === "Success" && (
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 text-xs rounded-full inline-flex items-center gap-1">
                  <CheckCircle2 size={14} /> Success
                </span>
              )}
              {txn.status === "Pending" && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 text-xs rounded-full inline-flex items-center gap-1">
                  <Clock size={14} /> Pending
                </span>
              )}
              {txn.status === "Failed" && (
                <span className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded-full inline-flex items-center gap-1">
                  <XCircle size={14} /> Failed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ------------------ DESKTOP TABLE ------------------ */}
      <div className="hidden sm:block bg-white rounded-2xl border shadow-sm overflow-x-auto mt-4 w-full">
        <table className="w-full min-w-max table-auto">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
            <tr>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-center">Amount</th>
              <th className="py-3 px-4 text-center">Payment Method</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Date & Time</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4 font-medium">{txn.user}</td>

                <td className="py-3 px-4 text-center font-semibold text-purple-600">
                  ₹{txn.amount}
                </td>

                <td className="py-3 px-4 text-center">{txn.paymentMethod}</td>

                <td className="py-3 px-4 text-center">
                  {txn.status === "Success" && (
                    <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full inline-flex items-center gap-1 justify-center">
                      <CheckCircle2 size={14} /> Success
                    </span>
                  )}
                  {txn.status === "Pending" && (
                    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full inline-flex items-center gap-1 justify-center">
                      <Clock size={14} /> Pending
                    </span>
                  )}
                  {txn.status === "Failed" && (
                    <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full inline-flex items-center gap-1 justify-center">
                      <XCircle size={14} /> Failed
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 text-center text-gray-600">{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------------ PAGINATION ------------------ */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm gap-3">
        <p className="text-gray-600">
          Showing {pageStart + 1}–{Math.min(pageEnd, allTransactions.length)} of {allTransactions.length} transactions
        </p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 border rounded-lg ${page === 1 ? "opacity-50" : "hover:bg-gray-100"}`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded-lg ${page === i + 1 ? "bg-purple-600 text-white" : "hover:bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 border rounded-lg ${page === totalPages ? "opacity-50" : "hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
