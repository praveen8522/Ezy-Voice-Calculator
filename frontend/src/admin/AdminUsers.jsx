import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Eye, RefreshCw } from "lucide-react";
import { adminService } from "../api/services";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 30;

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
    setPage(1); // Reset to first page when searching
  }, [searchTerm, users]);

  // Load users from backend
  const loadUsers = async () => {
    setLoading(true);
    setError("");
    
    try {
      const userData = await adminService.getAllUsers();
      
      // Transform backend data to match UI format
      const transformedUsers = userData.map((user, index) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city || "Unknown",
        status: user.status,
        joined: new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        photo: user.photo || `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
      }));

      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete user (placeholder - implement backend endpoint if needed)
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      // TODO: Add delete endpoint to backend
      // await adminService.deleteUser(userId);
      
      // For now, remove from local state
      setUsers(users.filter((u) => u.id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="w-full min-h-screen text-gray-800">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Registered Users
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {loading ? "Loading..." : `${filteredUsers.length} users found`}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {/* SEARCH BAR */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>

          {/* REFRESH BUTTON */}
          <button
            onClick={loadUsers}
            disabled={loading}
            className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-600 transition disabled:opacity-50"
            title="Refresh user list"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      )}

      {/* NO USERS FOUND */}
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No users found</p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* MOBILE CARDS VIEW */}
      {!loading && filteredUsers.length > 0 && (
        <div className="grid sm:hidden gap-4">
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-xl shadow border flex gap-4 items-center hover:shadow-lg transition"
            >
              <img
                src={user.photo}
                alt={user.name}
                className="w-14 h-14 rounded-full border-2 border-purple-200"
              />

              <div className="flex-1">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>

                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>{user.city}</span>
                  <span className="font-medium text-purple-600">{user.role}</span>
                </div>

                <span
                  className={`inline-block px-3 py-1 mt-2 text-xs rounded-full ${
                    user.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DESKTOP TABLE */}
      {!loading && filteredUsers.length > 0 && (
        <div className="hidden sm:block bg-white rounded-xl border shadow-sm overflow-hidden mt-4">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">City</th>
                <th className="py-3 px-4 text-center">Joined</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </td>

                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4 font-medium text-purple-600">
                    {user.role}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">{user.city}</td>
                  <td className="py-3 px-4 text-center text-gray-600">
                    {user.joined}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3 text-gray-600">
                      <Eye
                        size={18}
                        className="cursor-pointer hover:text-purple-600 transition"
                        title="View details"
                      />
                      <Edit
                        size={18}
                        className="cursor-pointer hover:text-blue-600 transition"
                        title="Edit user"
                      />
                      <Trash2
                        size={18}
                        className="cursor-pointer hover:text-red-600 transition"
                        onClick={() => handleDelete(user.id)}
                        title="Delete user"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {!loading && filteredUsers.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm gap-3">
          <p className="text-gray-600">
            Showing {startIndex + 1} – {Math.min(endIndex, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-3 py-1 border rounded-lg ${
                page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 border rounded-lg ${
                    page === pageNum
                      ? "bg-purple-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && <span className="px-2">...</span>}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-3 py-1 border rounded-lg ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}