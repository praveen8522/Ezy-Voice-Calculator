import { useState } from "react";
import { Plus, Edit, Trash2, Eye, CheckCircle2, X } from "lucide-react";

export default function PlansPage() {
  // ------------------ PLAN DATA ------------------
  const defaultPlans = [
    {
      id: 1,
      name: "Go",
      price: "₹149",
      duration: "30 Days",
      features: ["Basic Voice Inputs", "Standard AI Processing", "1 Device"],
      status: "Active",
    },
    {
      id: 2,
      name: "Pro",
      price: "₹499",
      duration: "180 Days",
      features: [
        "10,000 Voice Inputs",
        "Fast AI Processing",
        "Multi-Device Support",
        "Priority Access",
      ],
      status: "Active",
    },
    {
      id: 3,
      name: "Plus",
      price: "₹899",
      duration: "365 Days",
      features: [
        "Unlimited Voice Inputs",
        "Advanced AI Engine",
        "Ultra-fast Response",
        "Email Support",
      ],
      status: "Active",
    },
    {
      id: 4,
      name: "Elite",
      price: "₹1999",
      duration: "Lifetime",
      features: [
        "Lifetime Unlimited Access",
        "Premium AI Engine",
        "24/7 Support",
        "Custom Voice Training",
        "Exclusive Features",
      ],
      status: "Active",
    },
  ];

  const [plans, setPlans] = useState(defaultPlans);

  // ------------------ MODAL STATE ------------------
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
    status: "Active",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addPlan = () => {
    const newPlan = {
      id: plans.length + 1,
      name: form.name,
      price: form.price,
      duration: form.duration,
      features: form.features.split(",").map((f) => f.trim()),
      status: form.status,
    };

    setPlans([newPlan, ...plans]);
    setOpenModal(false);

    setForm({
      name: "",
      price: "",
      duration: "",
      features: "",
      status: "Active",
    });
  };

  return (
    <div className="w-full min-h-screen text-gray-800 overflow-x-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Plans
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your pricing plans</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition shadow-md"
        >
          <Plus size={18} /> Add Plan
        </button>
      </div>

      {/* PLAN CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="relative bg-white border rounded-2xl shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Floating Plan Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-bl-xl shadow">
              ID: {plan.id}
            </div>

            {/* Plan Header */}
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                {plan.status}
              </span>
            </div>

            <p className="text-3xl font-bold text-purple-600">{plan.price}</p>
            <p className="text-sm text-gray-600 mb-3">{plan.duration}</p>

            <h3 className="font-semibold mt-4 mb-2 text-gray-700">
              Features:
            </h3>

            <ul className="space-y-2 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <CheckCircle2 className="text-purple-600" size={18} />
                  {feature}
                </li>
              ))}
            </ul>

            {/* ACTIONS */}
            <div className="flex gap-6 mt-6 text-gray-600">
              <Eye size={20} className="cursor-pointer hover:text-purple-600" />
              <Edit size={20} className="cursor-pointer hover:text-blue-600" />
              <Trash2 size={20} className="cursor-pointer hover:text-red-600" />
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full sm:w-[480px] rounded-2xl p-6 shadow-xl relative animate-fadeIn">

            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-extrabold mb-5 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Add New Plan
            </h2>

            {/* FORM */}
            <div className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Plan Name"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (₹)"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                name="features"
                value={form.features}
                onChange={handleChange}
                placeholder="Features (comma separated)"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>

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
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={addPlan}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md transition"
              >
                Add Plan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
