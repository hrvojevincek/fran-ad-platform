// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      // Validate token and set user
      validateToken(token);
    }
  }, []);

  const validateToken = async (token: string) => {
    // In a real application, you would make an API call to validate the token
    // For this example, we'll simulate a successful validation
    const mockUser: User = {
      id: "1",
      email: "user@example.com",
      name: "John Doe",
    };
    setUser(mockUser);
  };

  const signIn = async (email: string, password: string, name: string) => {
    try {
      // This is where you'd typically make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: "1",
        email: email,
        name: name,
      };

      setUser(mockUser);
      // Generate and store a token
      const token = generateToken();
      localStorage.setItem("auth-token", token);
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
  };

  const generateToken = () => {
    // In a real application, this would be done on the server
    return Math.random().toString(36).substr(2);
  };

  const value = {
    user,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
