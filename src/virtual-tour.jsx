import { useEffect } from "react";

export default function Virtualtour() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    document.body.appendChild(script);

    // Cleanup on page leave
    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-gray-50 p-6">
      <div
        className="calendly-inline-widget shadow-lg rounded-xl border"
        data-url="https://calendly.com/creativeteam-theardeegroup"
        style={{ minWidth: "320px", height: "700px", width: "100%", maxWidth: "900px" }}
      ></div>
    </div>
  );
}
