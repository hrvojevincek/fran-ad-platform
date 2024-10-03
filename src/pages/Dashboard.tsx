// src/components/Dashboard.tsx
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

export function Dashboard() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Statistics
            </h2>
            <p className="text-3xl font-bold text-blue-600">123</p>
            <p className="text-gray-600">Total Items</p>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Recent Activity
            </h2>
            <ul className="space-y-3">
              <li className="text-gray-600">Activity item 1</li>
              <li className="text-gray-600">Activity item 2</li>
              <li className="text-gray-600">Activity item 3</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
