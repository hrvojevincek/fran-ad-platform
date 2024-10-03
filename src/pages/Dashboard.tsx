// src/components/Dashboard.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Header from "../components/Header";

import Graph from "@/components/Graph";
import StatsCards from "@/components/StatsCards";
import { useFetchOvertime } from "@/hooks/useFetchOvertime";

export function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6 grid">
        <StatsCards />
        <Graph />
      </main>
    </div>
  );
}
