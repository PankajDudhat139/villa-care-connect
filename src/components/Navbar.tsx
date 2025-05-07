"use client";

import Link from "next/link";
import { useAuth } from "../context/auth-context";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Villa
          </Link>

          <div className="flex items-center space-x-6">
            {(user?.role === "customer" || user?.role === "admin") && (
              <Link
                href="/dashboard/customer"
                className="text-gray-700 hover:text-blue-600"
              >
                Customer
              </Link>
            )}

            {(user?.role === "manager" || user?.role === "admin") && (
              <Link
                href="/dashboard/manager"
                className="text-gray-700 hover:text-blue-600"
              >
                Manager
              </Link>
            )}

            {(user?.role === "technician" || user?.role === "admin") && (
              <Link
                href="/dashboard/technician"
                className="text-gray-700 hover:text-blue-600"
              >
                Technician
              </Link>
            )}
            {/* User Authentication Section */}

            {/* Conditional Rendering based on Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-300">
                  Hello, {user.name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
