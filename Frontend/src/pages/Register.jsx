// src/pages/Register.jsx
import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

/**
 * Replace REGISTER_URL with your backend endpoint if needed.
 */
const REGISTER_URL = "/api/auth/register";

export default function Register() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acceptTos, setAcceptTos] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Basic validation
  const validate = () => {
    const errs = {};
    if (!name?.trim()) errs.name = "Name is required";
    if (!email) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email";

    if (!password) errs.password = "Password is required";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters";

    if (!confirm) errs.confirm = "Please confirm your password";
    else if (confirm !== password) errs.confirm = "Passwords do not match";

    if (!acceptTos) errs.acceptTos = "You must accept the terms";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(
          data?.message || "Registration failed. Please check the details."
        );
        setLoading(false);
        return;
      }

      // Optionally store token/user if returned
      if (data?.token) localStorage.setItem("auth_token", data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      setLoading(false);

      // Navigate to login (or dashboard) after success
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl p-6 sm:p-8">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Create account
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Sign up to get started
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Full name
                  </label>
                  <div className="mt-2 relative">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={fieldErrors.name ? "true" : "false"}
                      aria-describedby={
                        fieldErrors.name ? "name-error" : undefined
                      }
                      placeholder="Your full name"
                      className={`block w-full rounded-lg shadow-sm px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                        fieldErrors.name
                          ? "ring-2 ring-red-200 dark:ring-red-900"
                          : ""
                      }`}
                    />
                    <div className="absolute right-3 top-2.5">
                      <User className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                    </div>
                  </div>
                  {fieldErrors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Email
                  </label>
                  <div className="mt-2 relative">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                      aria-invalid={fieldErrors.email ? "true" : "false"}
                      aria-describedby={
                        fieldErrors.email ? "email-error" : undefined
                      }
                      placeholder="you@example.com"
                      className={`block w-full rounded-lg shadow-sm px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                        fieldErrors.email
                          ? "ring-2 ring-red-200 dark:ring-red-900"
                          : ""
                      }`}
                    />
                    <div className="absolute right-3 top-2.5">
                      <Mail className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                    </div>
                  </div>
                  {fieldErrors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={fieldErrors.password ? "true" : "false"}
                      aria-describedby={
                        fieldErrors.password ? "password-error" : undefined
                      }
                      placeholder="Create a password"
                      className={`block w-full rounded-lg shadow-sm px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                        fieldErrors.password
                          ? "ring-2 ring-red-200 dark:ring-red-900"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-2 top-2.5 p-1 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p
                      id="password-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Confirm password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirm"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      aria-invalid={fieldErrors.confirm ? "true" : "false"}
                      aria-describedby={
                        fieldErrors.confirm ? "confirm-error" : undefined
                      }
                      placeholder="Repeat your password"
                      className={`block w-full rounded-lg shadow-sm px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                        fieldErrors.confirm
                          ? "ring-2 ring-red-200 dark:ring-red-900"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      aria-label={
                        showConfirm
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-2 top-2.5 p-1 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none"
                    >
                      {showConfirm ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirm && (
                    <p
                      id="confirm-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {fieldErrors.confirm}
                    </p>
                  )}
                </div>

                {/* Accept TOS */}
                <div className="flex items-start gap-3 mt-2">
                  <input
                    type="checkbox"
                    checked={acceptTos}
                    onChange={(e) => setAcceptTos(e.target.checked)}
                    id="tos"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="tos"
                    className="text-sm text-slate-700 dark:text-slate-300"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      privacy policy
                    </a>
                    .
                  </label>
                </div>
                {fieldErrors.acceptTos && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {fieldErrors.acceptTos}
                  </p>
                )}

                {/* Error */}
                {error && (
                  <div className="mt-2 rounded-md bg-red-50 dark:bg-red-900/20 p-2 text-sm text-red-700 dark:text-red-300">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-60"
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                    ) : null}
                    <span>{loading ? "Creating..." : "Create account"}</span>
                  </button>
                </div>

                {/* Already registered */}
                <div className="text-center text-sm text-slate-600 dark:text-slate-300">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>

            {/* Small note / legal */}
            <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              By creating an account you agree to our policies.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
