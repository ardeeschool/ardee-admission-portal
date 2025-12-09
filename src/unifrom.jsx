import { useState } from "react";

export default function AdmissionForm() {
  return (
    <div className="w-full max-w-7xl mx-auto p-10 cursor-pointer">

      {/* --- MAIN WRAPPER --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* --- UNIFORM IMAGE (LEFT) --- */}
        <img
          src="src/assets/uniform.png"
          alt="Uniform"
          className="w-full  mx-auto border border-gray-200 rounded-2xl shadow-lg 
                     transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
        />

        {/* --- TEXT + DISCLAIMER + ORDER BUTTON (RIGHT) --- */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">UNIFORM</h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            The school uniform is provided by an independent third-party vendor.
            The school is not responsible for product quality, delivery
            timelines, pricing, or after-sales service. For any issues,
            please contact the vendor directly.
          </p>

          <a
            href="#"
            className="text-lg font-semibold px-10 py-4 bg-blue-600 text-white 
                       rounded-xl inline-block shadow-md transition duration-300
                       hover:scale-105 hover:shadow-xl"
          >
            ORDER NOW
          </a>
        </div>

      </div>
    </div>
  );
}
