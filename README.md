# Fran Ad Analytics Dashboard

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Key Architectural Decisions](#key-architectural-decisions)
5. [Potential Improvements](#potential-improvements)

## Introduction

Fran Ad Analytics Dashboard is a web application built with React, TypeScript, and Vite. It provides a user interface for viewing and analyzing advertising metrics such as impressions, ad requests, and revenue.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/fran-ad-platform.git
   cd fran-ad-platform
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server and JSON server concurrently:

```
npm run dev
```

This command will start the Vite development server and the JSON server simultaneously. The application will be available at `http://localhost:5173`, and the mock API will be accessible at `http://localhost:4000`.

### Building for Production

To create a production build:

```
npm run build
```

### Running Tests

To run the test suite:

```
npm test
```

## Project Structure

The project follows a typical React application structure with some additional organization:

```
src/
├── components/
│   ├── ui/
│   └── ...
├── context/
├── hooks/
├── lib/
├── pages/
├── utils/
├── App.tsx
└── main.tsx
```

- `components/`: Reusable React components
- `components/ui/`: UI components from the shadcn/ui library
- `context/`: React context providers (e.g., AuthContext)
- `hooks/`: Custom React hooks
- `lib/`: Utility functions and shared code
- `pages/`: Top-level page components
- `utils/`: Helper functions and utilities

## Key Architectural Decisions

1. **Vite as Build Tool**: Vite is used as the build tool for its fast development server and optimized production builds.

2. **Tailwind CSS**: The project utilizes Tailwind CSS for rapid UI development and consistent styling.

3. **shadcn/ui Components**: The application leverages the shadcn/ui component library for pre-built, customizable UI components.

4. **Context API for State Management**: React's Context API is used for managing global state, such as user authentication.

5. **Custom Hooks**: Custom hooks (e.g., `useFetchMetrics`, `useFetchOvertime`) are used to encapsulate data fetching logic and promote reusability.

6. **JSON Server for Mocking API**: A JSON server is used to mock the backend API, allowing for rapid frontend development without a real backend.

7. **Jest and React Testing Library**: Jest is used as the testing framework, with React Testing Library for component testing.

8. **Recharts for Data Visualization**: The Recharts library is used for creating interactive and responsive charts.

## Potential Improvements

1. **State Management**: For larger applications, consider implementing a more robust state management solution like Redux or Zustand.

2. **API Integration**: Replace the JSON server with a real backend API when ready for production.

3. **Error Handling**: Implement a global error handling mechanism to catch and display errors consistently across the application.

4. **Accessibility**: Conduct a thorough accessibility audit and implement necessary improvements to ensure the application is usable by people with disabilities.

7. **Enhanced Authentication**: Implement a more robust authentication system with features like password reset and email verification.

8. **Data Caching**: Implement client-side caching of API responses to reduce unnecessary network requests and improve performance.

10. **Advanced Analytics**: Implement more advanced analytics features such as custom date ranges, data export functionality, and additional chart types.

11. **Unit and Integration Tests**: Increase test coverage by adding more unit tests for utility functions and integration tests for key user flows.

12. **CI/CD Pipeline**: Set up a continuous integration and deployment pipeline for automated testing and deployment.

## PRIORITIZATION

Order of priorities: 
1. Set up Vite React
2. Authentication with JWT and Session
3. Data Fetching & Axios & Tanstack Query
4. Dashboard design implementation
5. Recharts components & Code Splitting
6. Error Handling and Loading states & Suspense / Lazy Loading

8. 
