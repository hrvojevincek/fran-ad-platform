import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Graph from "../components/Graph";
import * as useFetchOvertime from "../hooks/useFetchOvertime";

// Mock the custom hooks
jest.mock("../hooks/useFetchOvertime");

describe("Graph Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  test("displays 'No data available' message when there's no data", () => {
    // Mock the useFetchOvertime hook to return empty data
    (useFetchOvertime.useFetchOvertime as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<Graph />);

    expect(
      screen.getByText("No data available for the selected date range")
    ).toBeInTheDocument();
  });

  test("displays loading state when data is being fetched", () => {
    // Mock the useFetchOvertime hook to return loading state
    (useFetchOvertime.useFetchOvertime as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<Graph />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveClass("animate-spin");
  });

  test("displays error message when there's an error fetching data", () => {
    // Mock the useFetchOvertime hook to return an error
    (useFetchOvertime.useFetchOvertime as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error("Failed to fetch data"),
    });

    render(<Graph />);

    expect(screen.getByText("Error loading graph data")).toBeInTheDocument();
  });

  // You can add more tests here for other scenarios, such as:
  // - Checking if the graph renders correctly when data is available
  // - Testing the date range picker functionality
  // - Testing the metric selection functionality
});
