import React, { useState } from "react";

/**
 * RazorpayPaymentComponent.jsx
 * ---------------------------
 * Single-file React component (default export) that shows a simple, modern
 * payment UI and integrates with Razorpay Checkout.
 *
 * Usage:
 * 1. Host a backend endpoint (e.g. POST /api/create-order) that creates a
 *    Razorpay order using the server-side Razorpay SDK and returns JSON:
 *      { id: "order_XXXX", amount: 49900, currency: "INR" }
 *    The amount should be in paise (so ₹499 -> 49900).
 *
 * 2. Provide your Razorpay KEY_ID (public key) via an environment variable
 *    exposed to the frontend, or return it from the create-order endpoint.
 *
 * 3. Add this component into your React app and style using Tailwind (the
 *    classes used below expect Tailwind to be present). If you don't use
 *    Tailwind, replace classes with your CSS.
 *
 * Notes:
 * - Do NOT call Razorpay order-creation from the frontend. Orders must be
 *   created on the server using your Razorpay secret key.
 * - Verify payment signatures server-side after the payment completes to
 *   ensure security.
 */

function loadRazorpayScript(src = "https://checkout.razorpay.com/v1/checkout.js") {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src=\"${src}\"]`)) return resolve(true);
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
    document.body.appendChild(script);
  });
}

export default function RazorpayPaymentComponent({
  createOrderEndpoint = "/api/create-order", // backend endpoint to create order
  currency = "INR",
  defaultAmount = 49900, // amount in paise: 49900 => ₹499.00
  buttonLabel = "Pay Now",
  publicKey = null // optional: if not provided, endpoint should return key_id
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handlePay = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await loadRazorpayScript();
    } catch (err) {
      setLoading(false);
      setMessage({ type: "error", text: "Could not load payment SDK. Try again." });
      return;
    }

    // Validate
    if (!name || !email || !phone) {
      setLoading(false);
      setMessage({ type: "error", text: "Please fill name, email and phone." });
      return;
    }

    // Call backend to create order
    const resp = await fetch(createOrderEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency, name, email, phone })
    });

    if (!resp.ok) {
      setLoading(false);
      const text = await resp.text();
      setMessage({ type: "error", text: `Failed to create order: ${text}` });
      return;
    }

    const order = await resp.json();
    // order must contain: id (order_id), amount, currency

    const key_id = publicKey || order.key_id || process.env.REACT_APP_RAZORPAY_KEY;
    if (!key_id) {
      setLoading(false);
      setMessage({ type: "error", text: "Razorpay key_id not provided." });
      return;
    }

    const options = {
      key: key_id,
      amount: order.amount || amount, // in paise
      currency: order.currency || currency,
      name: "Ardee Admission Portal", // change to your brand
      description: "Admission Fee",
      image: "https://your-domain.com/logo.png", // optional
      order_id: order.id,
      handler: async function (response) {
        // response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature
        // You MUST verify signature server-side. Send these details to verify.
        setLoading(true);
        const verifyResp = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            amount: order.amount
          })
        });
        setLoading(false);
        if (verifyResp.ok) {
          setMessage({ type: "success", text: "Payment successful and verified. Thank you!" });
        } else {
          const txt = await verifyResp.text();
          setMessage({ type: "error", text: `Payment succeeded but verification failed: ${txt}` });
        }
      },
      prefill: {
        name,
        email,
        contact: phone
      },
      notes: {
        orderId: order.id
      },
      theme: {
        color: "#6D28D9"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (resp) {
      setMessage({ type: "error", text: `Payment failed: ${resp.error.description || resp.error.reason}` });
    });

    rzp.open();
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">Secure Payment</h2>
      <p className="text-sm text-gray-500 mb-6">Pay admission fees securely using Razorpay.</p>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handlePay} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="Your full name" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="you@example.com" />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="10-digit mobile" />
        </div>

        <div>
          <label className="block text-sm font-medium">Amount (INR)</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="number"
              value={Math.floor(amount / 100)}
              onChange={(e) => {
                const rupees = Number(e.target.value) || 0;
                setAmount(Math.round(rupees * 100));
              }}
              className="w-32 rounded-md border-gray-200 shadow-sm p-2"
            />
            <span className="text-sm text-gray-500">(enter rupees — stored as paise)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? "Processing..." : buttonLabel}
          </button>

          <button
            type="button"
            onClick={() => {
              setAmount(defaultAmount);
              setName("");
              setEmail("");
              setPhone("");
              setMessage(null);
            }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          >
            Reset
          </button>
        </div>

        <div className="pt-4 text-xs text-gray-400">Powered by Razorpay • Secure payments</div>
      </form>

      <style jsx>{`
        /* small responsive tweak */
        @media (max-width: 640px) {
          .max-w-xl { width: 100%; padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
