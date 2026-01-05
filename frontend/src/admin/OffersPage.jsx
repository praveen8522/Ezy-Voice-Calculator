import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Tag, Calendar, Percent, X } from "lucide-react";

export default function OffersPage() {
  // ------------------ OFFER LIST ------------------
  const initialOffers = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Special Offer ${i + 1}`,
    price: `${299 + i * 10}₹`,
    discount: `${10 + (i % 5) * 5}%`,
    duration: `${7 + (i % 10)} Days`,
    description: "Enjoy premium tools, unlocked features, and exclusive access.",
    status: Math.random() > 0.5 ? "Active" : "Inactive",
  }));

  const [offers, setOffers] = useState(initialOffers);
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    duration: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOffer = () => {
    const newOffer = {
      id: offers.length + 1,
      ...form,
    };

    setOffers([newOffer, ...offers]);
    setOpenModal(false);

    setForm({
      title: "",
      description: "",
      price: "",
      discount: "",
      duration: "",
      status: "Active",
    });
  };

  return (
    <div className="w-full min-h-screen text-gray-800 overflow-x-hidden">

      {/* ------------------ HEADER ------------------ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Offers
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Create and manage exclusive offers</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition shadow-md"
        >
          <Plus size={18} /> Add Offer
        </button>
      </div>

      {/* ------------------ OFFERS GRID ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            {/* Floating Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-bl-xl shadow">
              ID: {offer.id}
            </div>

            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-900">{offer.title}</h2>

              {offer.status === "Active" ? (
                <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                  Active
                </span>
              ) : (
                <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full font-semibold">
                  Inactive
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm mt-2">{offer.description}</p>

            <div className="mt-4 space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Tag className="text-purple-600" size={18} />
                <span className="font-medium">Price:</span> {offer.price}
              </p>

              <p className="flex items-center gap-2">
                <Percent className="text-pink-600" size={18} />
                <span className="font-medium">Discount:</span> {offer.discount}
              </p>

              <p className="flex items-center gap-2">
                <Calendar className="text-indigo-600" size={18} />
                <span className="font-medium">Duration:</span> {offer.duration}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-6 mt-5 text-gray-600">
              <Eye size={20} className="cursor-pointer hover:text-purple-600 transition" />
              <Edit size={20} className="cursor-pointer hover:text-blue-600 transition" />
              <Trash2 size={20} className="cursor-pointer hover:text-red-600 transition" />
            </div>
          </div>
        ))}
      </div>

      {/* ------------------ ADD OFFER MODAL ------------------ */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full sm:w-[500px] rounded-2xl shadow-xl p-6 animate-fadeIn relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-extrabold mb-5 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Add New Offer
            </h2>

            {/* FORM FIELDS */}
            <div className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Offer Title"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Offer Description"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>

              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="Discount (%)"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration (Days)"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />

              {/* STATUS */}
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleAddOffer}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md transition"
              >
                Add Offer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

