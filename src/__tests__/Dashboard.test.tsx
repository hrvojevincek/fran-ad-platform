import "@testing-library/jest-dom";
import * as AuthContext from "../context/AuthContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { Dashboard } from "../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";

// Mock the hooks
jest.mock("../hooks/useFetchMetrics", () => ({
  useFetchMetrics: () => ({
    data: {
      dailyImpressions: 1000,
      ad_requests: 500,
      revenue: 100,
    },
    isLoading: false,
    error: null,
  }),
}));

jest.mock("../hooks/useFetchOvertime", () => ({
  useFetchOvertime: () => ({
    data: [
      /* mock data */
    ],
    isLoading: false,
    error: null,
  }),
}));

describe("Dashboard", () => {
  const renderDashboard = () => {
    render(
      <BrowserRouter>
        <TooltipProvider>
          <AuthProvider>
            <Dashboard />
          </AuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    );
  };

  test("renders dashboard components when user is authenticated", () => {
    // Mock the useAuth hook to return an authenticated user
    jest.spyOn(AuthContext, "useAuth").mockImplementation(() => ({
      user: { id: "1", name: "Test User", email: "test@example.com" },
      isAuthenticated: true,
      signIn: jest.fn(),
      signOut: jest.fn(),
    }));

    renderDashboard();

    expect(screen.getByText("Summary Metrics")).toBeInTheDocument();
    expect(screen.getByText("Performance Over Time")).toBeInTheDocument();
    expect(screen.getByText("1,000")).toBeInTheDocument(); // Impressions
    expect(screen.getByText("500")).toBeInTheDocument(); // Ad Requests
    expect(screen.getByText("$100.00")).toBeInTheDocument(); // Revenue
  });
});
