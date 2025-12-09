import React, { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";

export default function OfferLetterPage() {
  const sigPadRef = useRef(null);
  const [accepted, setAccepted] = useState(false);
  const [parentName, setParentName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const clearSignature = () => {
    sigPadRef.current.clear();
  };

  const handleAccept = () => {
    const signatureEmpty = sigPadRef.current.isEmpty();
    const nameEmpty = parentName.trim() === "";

    if (!agreeTerms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    if (signatureEmpty && nameEmpty) {
      alert("Please provide either a digital signature OR enter your name.");
      return;
    }

    setAccepted(true);
  };

  return (
    <div className="max-w-6xl mx-auto  border mt-10 shadow-sm font-cursive">
      <div className="bg-[#184263] flex justify-center items-center gap-6 font-thin">
         <img src="./src/assets/ardee-white.png"></img>
         <div class="w-px h-20 bg-gray-400"></div>

         <h1 className="text-[40px] text-white">Offer Letter</h1>
      </div>
      

      {accepted ? (
        <div className="p-6 bg-green-100 text-green-800 rounded-xl shadow text-center text-xl font-semibold">
          🎉 Thank you for accepting the offer!
        </div>
      ) : (
        <>
         <div className="flex justify-center items-center py-10">
  <div className="flex items-center gap-4">

    {/* PDF Icon */}
    <img 
      src="./src/assets/download-icon.svg"
      alt="PDF Icon"
      className="w-12 h-12"
    />

    {/* File Name */}
    <a
      href="YOUR_OFFER_LETTER_LINK.pdf"
      download
      className="text-blue-500 text-xl font-light hover:underline"
    >
      The Ardee school Admission Offer Letter.pdf
    </a>

    {/* Download Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="green"
      strokeWidth="2"
      className="w-7 h-7 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
      />
    </svg>

  </div>
</div>

          
          

          <div className="mt-6  p-8 rounded bg-white shadow">
            <div className="flex justiy-center item-center gap-10">
               <div>
               <p className="font-light mb-2">Parent Digital Signature</p>

            <SignaturePad
              ref={sigPadRef}
              canvasProps={{
                width: 500,
                height: 200,
                className: "border rounded",
              }}
            />

            <button
              onClick={clearSignature}
              className="mt-3 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Clear
            </button>
            </div>

            <div className="grid place-items-center text-[24px] font-light">Or</div>

            {/* Name Field */}
            <div className="grid place-items-center w-full" >
               <div className=" w-full">
              <label className="block font-light mb-1">
                 Enter Your Full Name
              </label>

              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Parent Full Name"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            </div>
            

            </div>
            
            

            

            {/* Terms & Conditions Checkbox */}
            <div className="mt-6 flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mt-1"
              />
              <p className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms & Conditions
                </a>{" "}
                of the admission process.
              </p>
            </div>

            <button
              onClick={handleAccept}
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded"
            >
              Accept & Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
