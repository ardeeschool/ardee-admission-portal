import { useState } from "react";

export default function AdmissionForm() {
  return (
      <><div className="w-full max-w-7xl mx-auto p-6 space-y-10 cursor-pointer">
        <div className="grid grid-cols-2 gap-10 place-items-center my-12">

          <img src="src/assets/kanika.png" alt="Logo" className="w-120 border border-2 border-gray-300 rounded-xl shadow-xl transform-gpu transition duration-500 hover:-translate-y-3 hover:shadow-2xl hover:rotate-y-6" />
          
          <div className="">
          <h1 className="text-[64px] font-bold text-[#184263]">Kanika Talwar</h1>
          <h3 className="text-[40px] text-[#184263]">Admission Counselor</h3>
          <div className="border-b-2 h-5"></div>
          <p className="text-[24px] font-thin py-8 ">The Ardee School, Yasho Bhawan, New Friends Colony New Delhi - 110025</p>
          <h4 className="text-[32px] text-[#184263]">Contact</h4>
          <div className="grid grid-flow-col auto-cols-max gap-10">
            <a className="grid grid-flow-col auto-cols-max gap-3 my-2" href=""><img className="pt-2" src="src/assets/group.png"></img><p className="text-[24px] font-thin">ea_nfc@theardeeschool.com</p></a>
          </div>
          <div className="grid grid-flow-col auto-cols-max gap-10 my-10">
            <a href="" className="flex border-2 gap-3 w-50 px-5 py-2"><img className="w-6 h-6 transform transition-transform duration-300 hover:scale-110 " src ="src/assets/ call.png"></img><p>Call</p></a>
            <a href="" className="flex border-2 gap-3 w-50 px-5 py-2"><img className="w-6 h-6 transform transition-transform duration-300 hover:scale-110" src="src/assets/whatsapp.png"></img><p>Whatsapp</p></a>
          </div>

</div>
          
      </div>
      
        </div></>

  );
}   
