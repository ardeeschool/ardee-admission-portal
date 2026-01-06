import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard";
import AdmissionForm from "./nfc-admission-form";
import Virtualtour from "./virtual-tour";
import AdminDashboard from "./admin";
import ApplicantManagement from "./applcant-managment";
import MainDash from "./main-dash";

import Unifrom from "./unifrom";
import Kanika from "./kanika";
import Offerletter from "./offerletter";

import logo from "./assets/logo.png";

function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#083b63] to-[#2b0a0d] text-white">
      
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-56 mb-6" />

      {/* Coming Soon Text */}
      <h1 className="text-3xl font-semibold tracking-wide">Coming Soon</h1>
     

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admission" element={<AdmissionForm />} />
        <Route path="/uniform" element={<Unifrom />} />
        <Route path="/virtual-tour" element={<Virtualtour />} />
        <Route path="/kanika" element={<Kanika />} />
        <Route path="/offerletter" element={<Offerletter />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/applcant-managment" element={<ApplicantManagement />} />
        <Route path="/main-dash" element={<MainDash />} />
      </Routes>
    </Router>
  );
}
