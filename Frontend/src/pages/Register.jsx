// src/pages/Register.jsx
// npm: npm install lucide-react react-router-dom

import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Replace this with your backend register endpoint.
 * Example: const REGISTER_URL = "https://api.example.com/auth/register";
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

      // Navigate to login (or dashboard) after successful registration
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-sm sm:max-w-sm md:max-w-md space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 sm:p-6">
          <div className="text-center mb-4">
            <h2 className="mt-3 text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Create account here
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Sign up to get started
            </p>
          </div>

          <form className="mt-2" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Full name
              </span>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={fieldErrors.name ? "true" : "false"}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  className={`block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 dark:focus:ring-emerald-400 ${
                    fieldErrors.name
                      ? "ring-2 ring-red-200 dark:ring-red-900"
                      : ""
                  }`}
                  placeholder="Your full name"
                />
                <div className="absolute right-3 top-3.5">
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
            </label>

            {/* Email */}
            <label className="block mt-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </span>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={fieldErrors.email ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.email ? "email-error" : undefined
                  }
                  className={`block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 dark:focus:ring-emerald-400 ${
                    fieldErrors.email
                      ? "ring-2 ring-red-200 dark:ring-red-900"
                      : ""
                  }`}
                  placeholder="you@example.com"
                />
                <div className="absolute right-3 top-3.5">
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
            </label>

            {/* Password */}
            <label className="block mt-3 relative">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={fieldErrors.password ? "true" : "false"}
                aria-describedby={
                  fieldErrors.password ? "password-error" : undefined
                }
                className={`mt-1 block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 dark:focus:ring-emerald-400 ${
                  fieldErrors.password
                    ? "ring-2 ring-red-200 dark:ring-red-900"
                    : ""
                }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-9 p-1 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                    <EyeOff className="w-5 h-5" />
                )}
              </button>
              {fieldErrors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-xs text-red-600 dark:text-red-400"
                >
                  {fieldErrors.password}
                </p>
              )}
            </label>

            {/* Confirm Password */}
            <label className="block mt-3 relative">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Confirm password
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-invalid={fieldErrors.confirm ? "true" : "false"}
                aria-describedby={
                  fieldErrors.confirm ? "confirm-error" : undefined
                }
                className={`mt-1 block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-800 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 dark:focus:ring-emerald-400 ${
                  fieldErrors.confirm
                    ? "ring-2 ring-red-200 dark:ring-red-900"
                    : ""
                }`}
                placeholder="Repeat your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-2 top-9 p-1 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                {showConfirm ? (
                    <Eye className="w-5 h-5" />
                ) : (
                    <EyeOff className="w-5 h-5" />
                )}
              </button>
              {fieldErrors.confirm && (
                <p
                  id="confirm-error"
                  className="mt-1 text-xs text-red-600 dark:text-red-400"
                >
                  {fieldErrors.confirm}
                </p>
              )}
            </label>

            {/* Accept TOS */}
            <div className="flex items-start gap-2 mt-3">
              <input
                type="checkbox"
                checked={acceptTos}
                onChange={(e) => setAcceptTos(e.target.checked)}
                id="tos"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="tos"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                I agree to the{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-600 hover:underline">
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
              <div className="mt-3 rounded-md bg-red-50 dark:bg-red-900/20 p-2 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 disabled:opacity-60"
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
                <span className="text-sm">
                  {loading ? "Creating..." : "Create account"}
                </span>
              </button>
            </div>

            {/* Already registered */}
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        {/* Simple footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          By creating an account you agree to our policies.
        </div>
      </div>
    </div>
  );
}
