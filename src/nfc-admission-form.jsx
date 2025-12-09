import { useState } from "react";

export default function AdmissionForm() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 text-sm">
      {/* ============================= */}
      {/* 1. SIBLING DETAILS */}
      {/* ============================= */}
      <section className="border rounded-xl p-6 bg-white shadow">
        <h2 className="font-semibold mb-3">Sibling (Real Brother/Sister) only studying in same school</h2>

        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" />
          <label>Show sibling details</label>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block">Sibling Admission No *</label>
            <input className="input" />
          </div>
          <div>
            <label>Siblings Mobile No *</label>
            <input className="input" />
          </div>
        </div>

        <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white">Proceed</button>
      </section>

      {/* ============================= */}
      {/* 2. STUDENT DETAILS */}
      {/* ============================= */}
      <section className="border rounded-xl p-6 bg-white shadow">
        <h2 className="font-semibold mb-4">Student Details</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Academic Year *</label>
            <input className="input" />
          </div>
          <div>
            <label>Class *</label>
            <select className="input"></select>
          </div>

          <div>
            <label>First Name *</label>
            <input className="input" placeholder="Enter First Name" />
          </div>
          <div>
            <label>Middle Name</label>
            <input className="input" placeholder="Enter Middle Name" />
          </div>

          <div>
            <label>Last Name *</label>
            <input className="input" placeholder="Enter Last Name" />
          </div>
          <div>
            <label>Date of Birth *</label>
            <input type="date" className="input" />
          </div>

          <div>
            <label>Aadhar No *</label>
            <input className="input" />
          </div>
          <div>
            <label>User Group *</label>
            <select className="input">
              <option>General</option>
            </select>
          </div>

          <div>
            <label>Gender *</label>
            <select className="input"></select>
          </div>
          <div>
            <label>Nationality *</label>
            <select className="input"></select>
          </div>

          <div>
            <label>Place of Birth *</label>
            <input className="input" />
          </div>
        </div>

        <div className="mt-4">
          <label>Upload Photo *</label>
          <input type="file" className="input" />
        </div>
      </section>

      {/* ============================= */}
      {/* 3. RESIDENTIAL & PERMANENT ADDRESS */}
      {/* ============================= */}
      <section className="border rounded-xl p-6 bg-white shadow space-y-6">
        <h2 className="font-semibold">Residential & Permanent Address</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* RESIDENTIAL */}
          <div className="space-y-3">
            <h3 className="font-medium">Residential Address</h3>
            <input className="input" placeholder="House / Flat No" />
            <input className="input" placeholder="Country" />
            <input className="input" placeholder="State" />
            <input className="input" placeholder="City" />
            <input className="input" placeholder="PIN Code" />
          </div>

          {/* PERMANENT */}
          <div className="space-y-3">
            <h3 className="font-medium">Permanent Address</h3>

            <label className="flex items-center gap-2">
              <input type="checkbox" /> Permanent same as Residential
            </label>

            <input className="input" placeholder="House / Flat No" />
            <input className="input" placeholder="Country" />
            <input className="input" placeholder="State" />
            <input className="input" placeholder="City" />
            <input className="input" placeholder="PIN Code" />
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* 4. PREVIOUS SCHOOL */}
      {/* ============================= */}
      <section className="border rounded-xl p-6 bg-white shadow">
        <h2 className="font-semibold mb-4">Previous School / Pre School</h2>

        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-6 mb-3">
            <input className="input" placeholder={`School Name ${i}`} />
            <input className="input" placeholder="From Year" />
            <input className="input" placeholder="To Year" />
            <input className="input" placeholder="Country" />
          </div>
        ))}
      </section>

      {/* ============================= */}
      {/* 5. ACHIEVEMENTS */}
      {/* ============================= */}
      <section className="border rounded-xl p-6 bg-white shadow space-y-4">
        <h2 className="font-semibold">Achievements / Co-curricular</h2>

        <input className="input" placeholder="Sports details" />
        <input className="input" placeholder="Music / Dance details" />
        <input className="input" placeholder="Other Achievements" />
      </section>

      {/* ============================= */}
      {/* 6. QUESTIONS */}
      {/* ============================= */}
      <section className="border rounded-xl p-6 bg-white shadow space-y-4">
        <h2 className="font-semibold">Parent Questionnaire</h2>

        <textarea className="input" placeholder="Why do you want your child to join?" />
        <textarea className="input" placeholder="What should the school know about your child?" />
        <textarea className="input" placeholder="Do parents work in a school? If yes details" />
        <textarea className="input" placeholder="Explain nature of your job" />
        <textarea className="input" placeholder="Involvement in school workshops?" />
        <textarea className="input" placeholder="Has your child completed any aptitude test?" />
        <textarea className="input" placeholder="Any disciplinary action in previous school?" />
      </section>

      {/* ============================= */}
      {/* 7. FATHER & MOTHER DETAILS */}
      {/* ============================= */}
      <section className="border rounded-xl p-6 bg-white shadow space-y-6">
        <h2 className="font-semibold">Father & Mother Details</h2>

        <div className="grid grid-cols-2 gap-10">
          {/* FATHER */}
          <div className="space-y-3">
            <h3 className="font-medium">Father Details</h3>
            <input className="input" placeholder="First Name" />
            <input className="input" placeholder="Middle Name" />
            <input className="input" placeholder="Last Name" />
            <input className="input" placeholder="Mobile No" />
            <input className="input" placeholder="Email" />
            <input className="input" placeholder="Nationality" />
            <input type="date" className="input" />
            <input className="input" placeholder="Qualification" />
            <input className="input" placeholder="Occupation" />
            <input className="input" placeholder="Organization Name" />
            <input className="input" placeholder="Designation" />
            <input type="file" className="input" />
          </div>

          {/* MOTHER */}
          <div className="space-y-3">
            <h3 className="font-medium">Mother Details</h3>
            <input className="input" placeholder="First Name" />
            <input className="input" placeholder="Middle Name" />
            <input className="input" placeholder="Last Name" />
            <input className="input" placeholder="Mobile No" />
            <input className="input" placeholder="Email" />
            <input className="input" placeholder="Nationality" />
            <input type="date" className="input" />
            <input className="input" placeholder="Qualification" />
            <input className="input" placeholder="Occupation" />
            <input className="input" placeholder="Organization Name" />
            <input className="input" placeholder="Designation" />
            <input type="file" className="input" />
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* 8. GUARDIAN DETAILS */}
      {/* ============================= */}
      <section className="border rounded-xl p-6 bg-white shadow space-y-4">
        <h2 className="font-semibold">Guardian (If Any)</h2>

        <label className="flex items-center gap-2">
          <input type="checkbox" /> Show Guardian Details
        </label>

        <input className="input" placeholder="Full Name" />
        <input className="input" placeholder="Mobile No" />
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Occupation" />
        <textarea className="input" placeholder="Address"></textarea>
      </section>
    </div>
  );
}
