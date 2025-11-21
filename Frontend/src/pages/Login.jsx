// src/pages/Login.jsx
import React, { useState } from "react";
import { Eye, EyeOff, Github, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const LOGIN_URL = "/api/auth/login";

export default function Login() {
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
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(
          data?.message || "Login failed. Please check your credentials."
        );
        setLoading(false);
        return;
      }

      if (data?.token) localStorage.setItem("auth_token", data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      setLoading(false);

      // Navigate on success if desired
      // navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 ">
        <Navbar />
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-5">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Welcome back
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Sign in to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Email
                  </label>
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
                    className={`mt-2 block w-full rounded-lg shadow-sm px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                      fieldErrors.email
                        ? "ring-2 ring-red-200 dark:ring-red-900"
                        : ""
                    }`}
                  />
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
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={fieldErrors.password ? "true" : "false"}
                    aria-describedby={
                      fieldErrors.password ? "password-error" : undefined
                    }
                    placeholder="Enter your password"
                    className={`mt-2 block w-full rounded-lg shadow-sm px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 dark:focus:ring-blue-400 ${
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
                    className="absolute right-2 top-9 p-1 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
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
                </div>

                {/* Error banner */}
                {error && (
                  <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-2 text-sm text-red-700 dark:text-red-300">
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
                    <span>{loading ? "Signing in..." : "Sign in"}</span>
                  </button>
                </div>

                {/* Social / alternate sign-in */}
                <div className="text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    or continue with
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      <Globe className="w-4 h-4 text-slate-600 dark:text-slate-200" />
                      <span className="text-slate-700 dark:text-slate-200">
                        Google
                      </span>
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      <Github className="w-4 h-4 text-slate-600 dark:text-slate-200" />
                      <span className="text-slate-700 dark:text-slate-200">
                        GitHub
                      </span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Footer CTA */}
              <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Register
                </button>
              </div>
            </div>

            {/* Small note / legal */}
            <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              By signing in you agree to our{" "}
              <button className="text-slate-700 dark:text-slate-200 underline">
                Terms
              </button>{" "}
              and{" "}
              <button className="text-slate-700 dark:text-slate-200 underline">
                Privacy Policy
              </button>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
