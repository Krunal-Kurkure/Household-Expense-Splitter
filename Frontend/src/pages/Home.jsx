// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Users, CreditCard, PieChart, DollarSign, Mail, Phone } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 antialiased">
      <Navbar />

      {/* HERO */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">Household Expense Splitter</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg">
                Stop the awkward math. Split rent, groceries and bills fairly with a few clicks — see who owes whom, settle balances,
                and track monthly summaries.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"><Users size={18} /></div>
                  <div>
                    <strong className="block">Add people & groups</strong>
                    <span className="text-slate-500 dark:text-slate-300">Create a family or roommate group and add members quickly.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-300"><DollarSign size={18} /></div>
                  <div>
                    <strong className="block">Add expenses</strong>
                    <span className="text-slate-500 dark:text-slate-300">Record any expense (e.g., Grocery ₹1200 split among 3).</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-300"><PieChart size={18} /></div>
                  <div>
                    <strong className="block">Balanced payments</strong>
                    <span className="text-slate-500 dark:text-slate-300">The app calculates who owes who and suggests minimal transactions to settle up.</span>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700">
                  Get started — it's free
                </Link>
                <a href="#how" className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                  How it works
                </a>
              </div>
            </div>

            {/* illustration / demo card */}
            <div>
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Quick demo</h3>
                <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">Try adding an expense to see how the split will appear.</p>

                <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Expense title</label>
                    <input  disabled className="mt-1 w-full border rounded px-3 py-2 text-sm bg-transparent dark:bg-slate-900/40 border-slate-200 dark:border-slate-700" placeholder="Grocery" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Amount (₹)</label>
                      <input  disabled className="mt-1 w-full border rounded px-3 py-2 text-sm bg-transparent dark:bg-slate-900/40 border-slate-200 dark:border-slate-700" placeholder="1200" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Split among</label>
                      <input  disabled className="mt-1 w-full border rounded px-3 py-2 text-sm bg-transparent dark:bg-slate-900/40 border-slate-200 dark:border-slate-700" placeholder="3" />
                    </div>
                  </div>

                 
                  <div className="mt-3 p-3 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 text-sm">
                    <strong>Result preview:</strong>
                    <div className="mt-2 text-slate-700 dark:text-slate-200">Grocery ₹1200 split among 3 → each pays ₹400. Alice paid ₹1200; Bob &amp; Carol owe Alice ₹400 each.</div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold">Features</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Everything you need to split household costs fairly and transparently.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="p-5 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300"><CreditCard size={18} /></div>
                <div>
                  <h4 className="font-semibold">Add expense</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Record payer, amount, description and who shares the cost.</p>
                </div>
              </div>
            </article>

            <article className="p-5 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300"><Users size={18} /></div>
                <div>
                  <h4 className="font-semibold">Groups & members</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Create household groups (roommates, family) and manage members easily.</p>
                </div>
              </div>
            </article>

            <article className="p-5 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300"><PieChart size={18} /></div>
                <div>
                  <h4 className="font-semibold">Smart balancing</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Minimize transactions by computing optimal settlement paths between members.</p>
                </div>
              </div>
            </article>

            <article className="p-5 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300"><DollarSign size={18} /></div>
                <div>
                  <h4 className="font-semibold">Settle balances</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Record settlements and keep the ledger up to date.</p>
                </div>
              </div>
            </article>

            <article className="p-5 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-sky-100 dark:bg-sky-900/20 text-sky-600 dark:text-sky-300"><PieChart size={18} /></div>
                <div>
                  <h4 className="font-semibold">Monthly summary</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Monthly totals, who paid most, and a quick snapshot for budgeting decisions.</p>
                </div>
              </div>
            </article>

            <article className="p-5 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300"><Users size={18} /></div>
                <div>
                  <h4 className="font-semibold">Privacy-first</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Personal data is limited to names/emails — adapt the backend to your data policy.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold">How it works</h3>
          <div className="mt-6 space-y-6 text-slate-600 dark:text-slate-300">
            <div>
              <h4 className="font-semibold">1. Add people & groups</h4>
              <p className="mt-1">Create a group for your household, add members with names and contact info.</p>
            </div>

            <div>
              <h4 className="font-semibold">2. Record expenses</h4>
              <p className="mt-1">When someone pays, add an expense with amount, payer and participants. Choose equal split or custom shares.</p>
            </div>

            <div>
              <h4 className="font-semibold">3. Balanced payments</h4>
              <p className="mt-1">The app calculates per-person balances and recommends minimal transactions to settle all debts.</p>
            </div>

            <div>
              <h4 className="font-semibold">4. Monthly summary & settlement</h4>
              <p className="mt-1">View monthly reports and record settlements when members pay each other back.</p>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">HE</div>
                <div>
                  <div className="font-bold">Household Expense Splitter</div>
                  <div className="text-sm text-slate-400">Make splitting simple and fair.</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-400 max-w-md">Built for roommates & families. For (adding expense, calculate split, monthly stats, settle balances). Open to contributions.</div>
            </div>

            <div className="flex gap-8">
              <div>
                <div className="text-sm font-semibold">Product</div>
                <ul className="mt-2 text-sm text-slate-400 space-y-2">
                  <li><Link to="#features" className="hover:text-white">Features</Link></li>
                  <li><Link to="#how" className="hover:text-white">How it works</Link></li>
                  <li><Link to="/register" className="hover:text-white">Register</Link></li>
                </ul>
              </div>

              <div>
                <div className="text-sm font-semibold">Connect</div>
                <ul className="mt-2 text-sm text-slate-400 space-y-2">
                  <li><a className="hover:text-white" href="mailto:support@household-split.app">support@household-split.app</a></li>
                  <li className="text-sm">+91 98765 43210</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-6 text-sm text-slate-500">© {new Date().getFullYear()} Household Expense Splitter — Built with ♥️</div>
        </div>
      </footer>
    </main>
  );
}
