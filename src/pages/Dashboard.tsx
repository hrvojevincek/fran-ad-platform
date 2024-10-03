// src/components/Dashboard.tsx
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Header from "../components/Header";
import { useFetchMetrics } from "@/hooks/useFetchMetrics";

export function Dashboard() {
  const user = useAuth();
  const navigate = useNavigate();

  const { data: metrics, isLoading, error } = useFetchMetrics();

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6 grid">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Impressions</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {metrics?.dailyImpressions.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ad Requests</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {metrics?.ad_requests.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${metrics?.revenue.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Overall Graph</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
