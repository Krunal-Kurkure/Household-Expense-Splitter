// src/pages/Login.jsx
// npm: npm install lucide-react
// optional navigation: npm install react-router-dom

import React, { useState } from "react";
import { Eye, EyeOff, Github, Globe } from "lucide-react";
import { Navigate } from "react-router-dom";
// If you want automatic navigation after login, install react-router-dom and uncomment below:
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

/**
 * Replace with your real backend URL (full URL if cross-origin).
 * Example: const LOGIN_URL = "https://api.example.com/auth/login";
 */
const LOGIN_URL = "/api/auth/login";

export default function Login() {
  // If using react-router navigation, uncomment the next line and the import above:
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Basic client-side validation
  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email";

    if (!password) errs.password = "Password is required";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add tokens/CSRF headers here if needed by your backend
        },
        body: JSON.stringify({ email, password}),
      });

      // If backend returns non-JSON on network error, guard it
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // On success: store token / user if provided
      if (data?.token) localStorage.setItem("auth_token", data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      setLoading(false);

      // If you want to navigate on success: uncomment useNavigate import & line below:
      // navigate("/dashboard");
    } catch (err) {
      // Show a friendly message. err may be Error or other.
      setError(err?.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
   
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900 px-4 py-10">
      
      {/* Compact container */}
      <div className="w-full max-w-sm sm:max-w-sm md:max-w-md space-y-6">
        {/* Card */}
        <div className="bg-white border border-warning dark:border-accent dark:bg-gray-800 shadow-md rounded-xl p-5 sm:p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="mt-3 text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Sign in to continue</p>
          </div>

          {/* Form */}
          <form className="mt-2" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={fieldErrors.email ? "true" : "false"}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={`mt-1 block w-full rounded-lg border border-warning dark:border-accent bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-warning dark:focus:ring-accent ${
                  fieldErrors.email ? "ring-2 ring-red-200 dark:ring-red-900" : ""
                }`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.email}
                </p>
              )}
            </label>

            {/* Password */}
            <label className="block mt-3 relative">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={fieldErrors.password ? "true" : "false"}
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
                className={`mt-1 block w-full rounded-lg border border-warning dark:border-accent bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-warning dark:focus:ring-accent ${
                  fieldErrors.password ? "ring-2 ring-red-200 dark:ring-red-900" : ""
                }`}
                placeholder="Enter your password"
              />

              {/* Toggle show/hide (Lucide icons) */}
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-9 p-1 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>

              {fieldErrors.password && (
                <p id="password-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.password}
                </p>
              )}
            </label>


            {/* Error banner */}
            {error && (
              <div className="mt-3 rounded-md bg-red-50 dark:bg-red-900/20 p-2 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 bg-warning dark:bg-accent dark:text-black  text-white text-sm font-semibold shadow focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-black disabled:opacity-60"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                ) : null}
                <span className="text-sm">{loading ? "Signing in..." : "Sign in"}</span>
              </button>
            </div>

            {/* Social / alternate sign-in */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">or continue with</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {/* Lucide Globe used as neutral icon */}
                  <Globe className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                  <span className="text-gray-700 dark:text-gray-200">Google</span>
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Github className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                  <span className="text-gray-700 dark:text-gray-200">GitHub</span>
                </button>
              </div>
            </div>
          </form>
        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-5 dark:text-gray-400">
          Don’t have an account?{" "}
           <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-secondary dark:text-accent font-medium hover:underline"
              >
                Register
              </button>
        </div>
        </div>

      </div>
    </div>
     </>
  );
}
