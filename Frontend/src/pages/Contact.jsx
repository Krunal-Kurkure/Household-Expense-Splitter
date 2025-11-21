// src/pages/ContactCenter.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Mail, Phone, User, MessageCircle } from "lucide-react";

export default function ContactCenter() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    try {
      // Replace with real API call if needed.
      await new Promise((r) => setTimeout(r, 700));
      setSuccess("Thanks — your message has been received. We'll reply soon.");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setErrors({ submit: "Failed to send. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
        <Navbar />
        <section className="flex items-center justify-center px-4 p-5">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md px-5 py-6 sm:px-6 sm:py-8">
              <header className="text-center mb-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Get help
                </h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Tell us what’s up — we’ll respond in 1–2 business days.
                </p>
              </header>

              <form onSubmit={onSubmit} noValidate className="space-y-4">
                {/* Name */}
                <label className="block text-sm">
                  <span className="sr-only">Full name</span>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full rounded-lg bg-white dark:bg-slate-900 border px-3 py-2 text-sm placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.name
                          ? "border-red-500 ring-2 ring-red-200 dark:ring-red-900"
                          : "border-gray-200 dark:border-slate-700"
                      }`}
                    />
                    <User className="w-4 h-4 absolute right-3 top-2.5 text-gray-400 dark:text-slate-300" />
                  </div>
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </label>

                {/* Email */}
                <label className="block text-sm">
                  <span className="sr-only">Email</span>
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className={`w-full rounded-lg bg-white dark:bg-slate-900 border px-3 py-2 text-sm placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.email
                          ? "border-red-500 ring-2 ring-red-200 dark:ring-red-900"
                          : "border-gray-200 dark:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </label>

                {/* Message */}
                <label className="block text-sm">
                  <span className="sr-only">Message</span>
                  <div className="relative">
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, message: e.target.value }))
                      }
                      rows={5}
                      placeholder="How can we help?"
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={`w-full rounded-lg bg-white dark:bg-slate-900 border px-3 py-2 text-sm placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.message
                          ? "border-red-500 ring-2 ring-red-200 dark:ring-red-900"
                          : "border-gray-200 dark:border-slate-700"
                      }`}
                    />
                    <MessageCircle className="w-4 h-4 absolute right-3 top-3 text-gray-400 dark:text-slate-300" />
                  </div>
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {errors.message}
                    </p>
                  )}
                </label>

                {/* Submit row */}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 text-sm font-medium disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send message"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setForm({ name: "", email: "", message: "" });
                      setErrors({});
                      setSuccess("");
                    }}
                    className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    Clear
                  </button>
                </div>

                {errors.submit && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.submit}
                  </p>
                )}
                {success && (
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {success}
                  </p>
                )}
              </form>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@household-split.app</span>
                </div>
              </div>
            </div>

            {/* subtle footer note */}
            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              By contacting us you agree to our{" "}
              <button className="underline">terms</button>.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
