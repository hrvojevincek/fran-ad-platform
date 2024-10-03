// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  password: string;
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

  const signIn = async (email: string, password: string, name: string) => {
    try {
      // This is where you'd typically make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: "1",
        email: email,
        password: password,
        name: name,
      };

      setUser(mockUser);
      // You might want to store the token in localStorage
      localStorage.setItem("auth-token", "mock-token");
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
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
