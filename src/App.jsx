import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Phone, KeyRound } from "lucide-react";

import Dashboard from "./dashboard";
import AdmissionForm from "./nfc-admission-form";
import Virtualtour from "./virtual-tour";
import AdminDashboard from "./admin";
import ApplicantManagement from "./applcant-managment";
import MainDash from "./main-dash";


// ⚠️ make sure file name matches exactly
import Unifrom from "./unifrom"; 

// ⚠️ if file name is Kanika.jsx → good
import Kanika from "./kanika";

// ⚠️ make sure file EXACT name is offerletter.jsx
import Offerletter from "./offerletter";

import logo from "./assets/logo.png";   // ✅ FIXED LOGO PATH


function AuthPage() {
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#083b63] to-[#2b0a0d] text-white">
      <div className="flex flex-col md:flex-row items-center gap-[80px] p-8">

        {/* Logo */}
        <div className="text-center md:text-left">
          <img src={logo} alt="Logo" className="w-120" />
        </div>

        {/* Form Section */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl w-[500px] shadow-2xl border border-white/20">

          {/* Tabs */}
          <div className="flex mb-6">
            <button
              onClick={() => setStep(1)}
              className={`flex-1 py-2 rounded-full text-lg transition ${
                step === 1 ? "bg-blue-500 text-white" : "bg-transparent border border-white/40 text-gray-200"
              }`}
            >
              Register
            </button>

            <button
              onClick={() => setStep(2)}
              className={`flex-1 py-2 rounded-full text-lg transition ${
                step === 2 || step === 3 ? "bg-blue-500 text-white" : "bg-transparent border border-white/40 text-gray-200"
              }`}
            >
              Login
            </button>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-3">
                <input type="text" placeholder="First Name" className="flex-1 bg-white text-black p-3 rounded-md" required />
                <input type="text" placeholder="Last Name" className="flex-1 bg-white text-black p-3 rounded-md" required />
              </div>

              <select className="bg-white text-black p-3 rounded-md" required>
                <option value="">Choose School</option>
                <option value="Primary">Primary School</option>
                <option value="Middle">Middle School</option>
                <option value="Senior">Senior School</option>
              </select>

              <input type="email" placeholder="Email Address" className="bg-white text-black p-3 rounded-md" required />
              <input type="tel" placeholder="Mobile Number" className="bg-white text-black p-3 rounded-md" required />

              <button type="submit" className="bg-blue-500 py-3 rounded-full mt-2 hover:bg-blue-600 transition">
                Sign Up →
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(3);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center bg-gray-200 text-black p-3 rounded-md gap-2">
                <Phone size={18} />
                <input type="tel" placeholder="+91 xxxxxxxxxx" className="flex-1 bg-transparent outline-none" required />
              </div>

              <button type="submit" className="bg-blue-500 text-white py-3 rounded-full text-lg hover:bg-blue-600 transition">
                Send OTP →
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center bg-gray-200 text-black p-3 rounded-md gap-2">
                <Phone size={18} />
                <input type="tel" placeholder="+91 xxxxxxxxxx" className="flex-1 bg-transparent outline-none" required />
              </div>

              <div className="flex items-center bg-gray-200 text-black p-3 rounded-md gap-2">
                <KeyRound size={18} />
                <input type="number" placeholder="Enter OTP" className="flex-1 bg-transparent outline-none" required />
              </div>

              <button type="submit" className="bg-blue-500 text-white py-3 rounded-full text-lg hover:bg-blue-600 transition">
                Login →
              </button>
            </form>
          )}

        </div>
      </div>
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
         <Route path="/admin" element={< AdminDashboard/>} />
          <Route path="/applcant-managment" element={< ApplicantManagement/>} />
       <Route path="/main-dash" element={<MainDash />} />

      </Routes>
    </Router>
  );
}
