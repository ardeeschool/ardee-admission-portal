import { useState } from "react";
import { Linkedin, Instagram, LogOut, Lock, RefreshCcw, User2, Video, CalendarCheck, FileSignature, IndianRupee, Shirt } from "lucide-react";

export default function Dashboard() {
  const [showLogout, setShowLogout] = useState(false);
  const [userName] = useState("Imaan Varma");

  const [steps, setSteps] = useState([
    { id: 1, stepNo: "STEP: 01", title: "APPLICANT DETAILS", subtitle: "Fill students & Parent information", icon: <User2 className='w-8 h-8 text-blue-600' />, completed: true },
    { id: 2, stepNo: "STEP: 02", title: "CAMPUS TOUR", subtitle: "Schedule a visit to see our campus", icon: <Video className='w-8 h-8 text-green-600' />, completed: false },
    { id: 3, stepNo: "STEP: 03", title: "VIRTUAL INTERVIEW", subtitle: "Book your interview slot", icon: <CalendarCheck className='w-8 h-8 text-purple-600' />, completed: false },
    { id: 4, stepNo: "STEP: 04", title: "OFFER LETTER", subtitle: "View & sign offer letter", icon: <FileSignature className='w-8 h-8 text-orange-600' />, completed: false },
    { id: 5, stepNo: "STEP: 05", title: "PAYMENT", subtitle: "Pay Admission Fee", icon: <IndianRupee className='w-8 h-8 text-yellow-600' />, completed: false },
    { id: 6, stepNo: "STEP: 06", title: "UNIFORM", subtitle: "Select Uniform & Size", icon: <Shirt className='w-8 h-8 text-red-600' />, completed: false }
  ]);

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#184263] to-[#310C0B] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-7xl min-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white rounded-t-3xl">
          <img src="src/assets/dash-logo.png" alt="Logo" className="h-12" />

          <div className="flex items-center gap-3">
            <a href="#" className="p-2 rounded-full hover:bg-gray-100"><Linkedin className="w-5 h-5 text-blue-700" /></a>
            <a href="#" className="p-2 rounded-full hover:bg-gray-100"><Instagram className="w-5 h-5 text-pink-500" /></a>

            <button onClick={() => setShowLogout(true)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {showLogout && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
              <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowLogout(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button onClick={() => (window.location.href = "/")} className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
              </div>
            </div>
          </div>
        )}

        <section className="px-8 pt-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome {userName}</h1>

            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full bg-white hover:shadow">
              <img src="src/assets/kanika.png" alt="Counselor" className="w-12 h-12 rounded-full" />
              <span>Admissions Counselor</span>
            </button>
          </div>

          <p className="text-gray-600 mt-4 font-medium text-lg">Admission Progress</p>
          <p className="text-sm text-gray-500">{completedCount} of {steps.length} Steps Completed</p>

          <div className="w-full bg-gray-200 h-3 rounded-full mt-3 overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>

          <div className="text-right text-green-600 font-bold text-xl mt-1">{progressPercent}% <span className="text-black text-sm">Complete</span></div>
        </section>

        <div className="flex justify-end px-8 mt-1">
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"><RefreshCcw className="w-4 h-4" /> Refresh Status</button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 p-8">
          {steps.map((step) => (
            <div key={step.id} className={`relative w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 ${ step.completed ? "" : "opacity-50" }`}>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">{step.stepNo}</span>
                <span>{step.icon}</span>
              </div>

              <div className="mt-2 text-xl font-bold">{step.title}</div>
              <div className="text-sm text-gray-600">{step.subtitle}</div>

              {!step.completed && (
                <div className="absolute bottom-3 left-4 flex items-center text-gray-500 text-xs">
                  <Lock className="w-4 h-4 mr-1" /> Complete Previous Step to Unlock
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center p-6">
          <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-lg">
            <iframe src="https://my.matterport.com/show/?m=AMuci7T2zHf" title="VR Tour" className="w-full h-[320px] md:h-[360px] border-0" allowFullScreen></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
