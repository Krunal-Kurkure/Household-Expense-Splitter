import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-800 text-white px-4 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold">Expense Tracker</h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li className="hover:text-slate-300 cursor-pointer">Home</li>
          <li className="hover:text-slate-300 cursor-pointer">About</li>
          <li className="hover:text-slate-300 cursor-pointer">Features</li>
          <li className="hover:text-slate-300 cursor-pointer">Contact</li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="px-4 py-1 my-2 border border-white rounded hover:bg-white hover:text-slate-800 transition">
            Login
          </button>
          <button className="px-4 py-1 my-2 bg-blue-500 rounded hover:bg-blue-600 transition">
            Register
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-3 space-y-3 bg-slate-700 p-4 rounded">
          <ul className="space-y-3 text-lg">
            <li className="hover:text-slate-300 cursor-pointer">Home</li>
            <li className="hover:text-slate-300 cursor-pointer">About</li>
            <li className="hover:text-slate-300 cursor-pointer">Features</li>
            <li className="hover:text-slate-300 cursor-pointer">Contact</li>
          </ul>

          <div className="pt-4 space-y-3">
            <button className="w-full px-4 py-2 border border-white rounded hover:bg-white hover:text-slate-800 transition">
              Login
            </button>
            <button className="w-full px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
