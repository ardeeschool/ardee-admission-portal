import { 
  Search, Users, CheckCircle, Clock, ClipboardCheck, 
  Menu, LayoutDashboard, User, Shirt, CreditCard , FileText
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {

  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ====================== SIDEBAR ====================== */}
      <div
        className={`bg-gradient-to-br from-[#184263] to-[#310C0B] shadow-xl border-r transition-all duration-300 
        ${open ? "w-64" : "w-20"} hidden md:block`}
      >
        <div className="p-6 flex justify-between items-center">
          <img src="src/assets/logo.png" alt="Logo" className="h-auton w-full" />
        </div>

        <nav className="mt-8 space-y-3 text-white">
          <SidebarItem open={open} icon={<LayoutDashboard size={22} />} label="Dashboard" />
          <SidebarItem open={open} icon={<User size={22} />} label="Applications" />
          <SidebarItem open={open} icon={<FileText size={22} />} label="Offer Letter" />
          <SidebarItem open={open} icon={<CreditCard size={22} />} label="Payment" />
          <SidebarItem open={open} icon={<Shirt size={22} />} label="Uniform" />
        </nav>
      </div>

      {/* ====================== MOBILE SIDEBAR BUTTON ====================== */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow"
        onClick={() => setOpen(!open)}
      >
        <Menu size={22} />
      </button>

      {/* ====================== MAIN CONTENT ====================== */}
      <div className="flex-1 p-6 md:p-10 space-y-10">

        {/* ===== Header Section ===== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome Back, <span className="text-blue-600">Admin</span>
            </h1>
            <p className="text-gray-600 mt-1 text-lg font-light tracking-[1px]">Admission Cycle – 2025–26</p>
          </div>

          {/* Search Bar */}
          <div className="mt-4 md:mt-0 w-full md:w-72">
            <div className="relative">
              <Search className="absolute top-2.5 left-3 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 
                        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ===== Top Cards Section ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <CardBox 
            icon={<Users className="text-blue-600" size={36} />} 
            title="Total Applications"
            value="1,250"
          />

          <CardBox 
            icon={<CheckCircle className="text-green-600" size={36} />} 
            title="Verified Applications"
            value="980"
          />

          <CardBox 
            icon={<Clock className="text-yellow-500" size={36} />} 
            title="Pending Actions"
            value="140"
          />

          <CardBox 
            icon={<ClipboardCheck className="text-purple-600" size={36} />} 
            title="Completed Admission"
            value="840"
          />
        </div>

        {/* ===== TODAY CAMPUS TOUR SECTION ===== */}
        <TodayCampusTour />

        {/* ===== PROGRESS CHART SECTION ===== */}
        <ProgressChart />

        {/* ===== APPLICANTS OVERVIEW TABLE (ADDED) ===== */}
        <ApplicantsOverviewTable />

      </div>
    </div>
  );
}

/* ================= Sidebar Sub-Component ================= */
function SidebarItem({ icon, label, open }) {
  return (
    <div className="flex items-center space-x-3 cursor-pointer px-6 py-3 transition">
      {icon}
      {open && <span className="text-white font-medium">{label}</span>}
    </div>
  );
}

/* ================= Dashboard Card Sub-Component ================= */
function CardBox({ icon, title, value }) {
  return (
    <div className="p-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        </div>
      </div>
    </div>
  );
}

/* ================= Progress Chart Component ================= */
function ProgressChart() {
  const data = [
    { title: "Applicant Details", value: 100 },
    { title: "Campus Tour", value: 70 },
    { title: "Interview", value: 60 },
    { title: "Offer Letter", value: 45 },
    { title: "Payment", value: 40 },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admission Funnel</h2>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 font-medium">{item.title}</span>
              <span className="text-gray-600 font-medium">{item.value}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#184263] to-[#310C0B] h-3 rounded-full"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Today Campus Tour Component ================= */
function TodayCampusTour() {
  const tours = [
    { time: "10:00 AM", cls: "Class 1", assigned: "Priya" },
    { time: "11:30 AM", cls: "Class 3", assigned: "Rohan" },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Today’s Campus Tour</h2>
        <button className="text-blue-600 font-medium hover:underline">View All</button>
      </div>

      <div className="mt-6 space-y-4">
        {tours.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-xl flex justify-between items-center hover:bg-gray-50 transition"
          >
            <div>
              <p className="text-gray-900 font-medium">{item.time}</p>
              <p className="text-gray-600 text-sm">{item.cls}</p>
            </div>

            <div className="text-right">
              <p className="text-gray-700 text-sm font-medium">Assigned: {item.assigned}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Applicants Overview Table Component ================= */
function ApplicantsOverviewTable() {
  const applicants = [
    {
      name: "Iman V",
      grade: "KG",
      status: "Step 3: Interview",
      counselor: "Priya",
      update: "Today",
    },
    {
      name: "Rishabh S",
      grade: "1",
      status: "Step 2: Campus Tour",
      counselor: "Rohan",
      update: "Yesterday",
    },
    {
      name: "Ananya M",
      grade: "3",
      status: "Payment Pending",
      counselor: "Nehal",
      update: "2 hrs ago",
    },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Applicants Overview Table</h2>
        <button className="text-blue-600 font-medium hover:underline">View All Applicants</button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 font-semibold text-sm">
              <th className="p-3">Applicant</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Status</th>
              <th className="p-3">Counselor</th>
              <th className="p-3">Last Update</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applicants.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-medium text-gray-800">{item.name}</td>
                <td className="p-3">{item.grade}</td>
                <td className="p-3 text-gray-700">{item.status}</td>
                <td className="p-3">{item.counselor}</td>
                <td className="p-3 text-gray-500">{item.update}</td>
                <td className="p-3">
                  <button className="text-blue-600 font-medium hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
