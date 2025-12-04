// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Responsive Navbar (JavaScript version — no TypeScript)
 * - Desktop: inline links + CTA buttons
 * - Mobile: right-side drawer (slides in), reserved spacer so layout doesn't jump
 * - System dark mode via Tailwind's `dark:` classes
 */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const DRAWER_WIDTH_CLASS = "w-72"; // adjust to w-64 / w-72 / w-80
  const drawerRef = useRef(null);

  // Close menu on Escape and prevent body scroll
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close if clicking outside drawer (for extra safety)
  useEffect(() => {
    function onClick(e) {
      if (!open) return;
      const target = e.target;
      if (drawerRef.current && !drawerRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleNavClick = () => setOpen(false);

  return (
    <nav className="relative z-10 pb-12">
      {/* Header (sticky) */}
      <div className="sticky top-0 z-120 bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-600 dark:to-blue-500 flex items-center justify-center text-white shadow">
                HE
              </div>
              <div>
                <h1 className="text-lg xs:text-xs font-extrabold leading-none text-slate-900 dark:text-slate-100">
                  Household Expense Splitter
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-300 -mt-0.5">
                  Split bills the easy way
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                to="/"
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                Home
              </Link>
              <Link
                to="#features"
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                Features
              </Link>
              <Link
                to="#how"
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                How it works
              </Link>
              <Link
                to="#pricing"
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                Monthly summary
              </Link>
              <Link
                to="/contact"
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                Contact
              </Link>

              <Link
                to="/login"
                className="ml-4 px-4 py-1 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="ml-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Get Started
              </Link>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE: spacer to reserve right-side width when drawer closed (prevents layout jump) */}
        <div
          className={`md:hidden ${DRAWER_WIDTH_CLASS} -mt-16 pointer-events-none`}
          aria-hidden="true"
        />
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 dark:bg-black/50 transition-opacity duration-300 md:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Right-side drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full ${DRAWER_WIDTH_CLASS} bg-white dark:bg-slate-900 shadow-lg transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              HE
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                Menu
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-300">
                Household Expense Splitter
              </div>
            </div>
          </div>

          <button
            aria-label="Close menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6 overflow-y-auto h-[calc(100%-64px)]">
          <ul className="space-y-4 text-base font-medium">
            <li>
              <Link
                to="/"
                onClick={handleNavClick}
                className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#features"
                onClick={handleNavClick}
                className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#how"
                onClick={handleNavClick}
                className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                onClick={handleNavClick}
                className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Monthly summary
              </a>
            </li>
            <li>
              <a
                href="/contact"
                onClick={handleNavClick}
                className="block py-2 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="mt-6 space-y-3">
            <Link
              to="/login"
              onClick={handleNavClick}
              className="block w-full text-center px-4 py-2 border rounded dark:border-slate-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={handleNavClick}
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </aside>
    </nav>
  );
}
