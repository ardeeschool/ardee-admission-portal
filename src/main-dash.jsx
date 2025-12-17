import React from "react";
import {
  Calendar,
  BookOpen,
  FileText,
  Users,
  FileSignature,
  Wallet,
  Palette,
  CreditCard,
  HeartPulse,
  Shirt,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-10">
      {/* ================== HEADER SECTION ================== */}
      <div className="relative w-full">
        <img
          src="/header-bg.jpg"
          alt="header"
          className="w-full h-72 object-cover opacity-40"
        />

        <div className="absolute inset-0 flex flex-col justify-center px-10 border m-10 bg-white rounded-2xl">
          <h1 className="text-5xl font-bold text-black tracking-wide">
            ADMISSIONS
          </h1>

          <button className="mt-6 w-40 bg-black text-white font-semibold py-3 rounded-full
            shadow-md hover:bg-slate-100 transition flex items-center justify-center gap-2">
            Get Started
            <span>›</span>
          </button>
        </div>
      </div>

      {/* ================== GRID SECTION ================== */}
      <div className="px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

        {/* -------- ACADEMICS -------- */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-xl">
          <h2 className="text-white text-2xl font-semibold mb-6">Academics</h2>

          <div className="grid grid-cols-3 gap-6">
            <Card icon={<Calendar size={36} />} label="Attendence" />
            <Card icon={<BookOpen size={36} />} label="Home Work" />
            <Card icon={<FileText size={36} />} label="Report Card" />
            <Card icon={<Calendar size={36} />} label="Structure Of The Day" />
          </div>
        </div>

        {/* -------- PARENTS CORNER -------- */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-xl">
          <h2 className="text-white text-2xl font-semibold mb-6">Parents Corner</h2>

          <div className="grid grid-cols-3 gap-6">
            <Card icon={<Users size={36} />} label="Guardian" />
            <Card icon={<FileSignature size={36} />} label="Consent Form" />
            <Card icon={<Wallet size={36} />} label="Fees Invoice" />
            <Card icon={<Palette size={36} />} label="Enrichment" />
            <Card icon={<CreditCard size={36} />} label="Fees" />
            <Card icon={<HeartPulse size={36} />} label="Health Room" />
            <Card icon={<Shirt size={36} />} label="Uniform" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================== CARD COMPONENT ================== */
function Card({ icon, label }) {
  return (
    <div className="bg-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center 
      text-center cursor-pointer hover:bg-slate-200 transition shadow-md">

      <div className="text-slate-800">{icon}</div>

      <p className="mt-3 text-slate-700 font-medium leading-tight">{label}</p>
    </div>
  );
}
