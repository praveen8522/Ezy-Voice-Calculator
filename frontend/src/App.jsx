import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VoiceMode from "./pages/VoiceMode";
import Plan from "./utlis/Plan";
import Login from "./utlis/Login";
import VoicePopup from "./pages/VoicePopup";
import Suppport from "./utlis/Support";
import Profile from "./utlis/Profile";
import History from "./utlis/History";

import ScrollToTop from "./ScrollToTop";

// ADMIN

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminUsers from "./admin/AdminUsers";
import OffersPage from "./admin/OffersPage";
import PlansPage from "./admin/PlanPage";
import TransactionsPage from "./admin/TransactionPage";
import ProtectedRoute from "./components/ProtectedRoute";

// NEW
import AdminLogin from "./admin/AdminLogin";
import AdminProtected from "./admin/AdminProtected";

export default function App() {
  return (
    <div className="min-h-screen text-black flex flex-col">
      <Routes>
        {/* CLIENT ROUTES */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <ScrollToTop />

              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/voice" element={<VoiceMode />} />
                  <Route
                    path="/voice-popup"
                    element={
                      <ProtectedRoute>
                        <VoicePopup />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/plans" element={<Plan />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/support" element={<Suppport />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/history" element={<History />} />
                </Routes>
              </main>

              <Footer />
            </>
          }
        />

        {/* ADMIN LOGIN PAGE */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin/*"
          element={
            <AdminProtected>
              <AdminLayout>
                <ScrollToTop />

                <Routes>
                  <Route path="" element={<Dashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="offers" element={<OffersPage />} />
                  <Route path="plans" element={<PlansPage />} />
                  <Route path="transactions" element={<TransactionsPage />} />
                </Routes>
              </AdminLayout>
            </AdminProtected>
          }
        />
      </Routes>
    </div>
  );
}
