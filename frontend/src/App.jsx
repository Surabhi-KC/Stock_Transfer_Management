import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard";
import Transfers from "./pages/Transfers";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
console.log("App rendered");

/* ---------- NavLink ---------- */
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-slate-800"
        }
      `}
    >
      {children}
    </Link>
  );
}

/* ---------- Navigation (Signed In Only) ---------- */
function Navigation() {
  return (
    <SignedIn>
      <nav className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>

              <div>
                <div className="text-white font-bold text-lg leading-none">
                  Stock Transfer System
                </div>
                <div className="text-slate-400 text-xs mt-0.5">
                  Inventory Management
                </div>
              </div>
            </div>

            {/* Links + User */}
            <div className="flex items-center gap-3">
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/transfers">Transfers</NavLink>
              <NavLink to="/history">History</NavLink>
              <UserButton afterSignOutUrl="/login" />
            </div>
          </div>
        </div>
      </nav>
    </SignedIn>
  );
}

/* ---------- App ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navigation />

        <main className="animate-in">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <SignedOut>
                  <Login />
                </SignedOut>
              }
            />
            <Route
              path="/signup"
              element={
                <SignedOut>
                  <Signup />
                </SignedOut>
              }
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                  <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              }
            />

            <Route
              path="/transfers"
              element={
                <SignedIn>
                  <Transfers />
                </SignedIn>
              }
            />
            <Route
              path="/history"
              element={
                <SignedIn>
                  <History />
                </SignedIn>
              }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}