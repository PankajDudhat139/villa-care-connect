"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Add role type
type Role = 'admin' | 'customer' | 'manager' | 'technician';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role; // Add role to User type
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, phone: string, role: Role) => boolean;
  hasRole: (roles: Role[]) => boolean; // Add role checking function
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = Cookies.get("isAuthenticated") === "true";
      const savedUser = localStorage.getItem("currentUser");
      
      if (isAuth && savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const register = (name: string, email: string, phone: string, role: Role) => {
    try {
      const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        role, // Include role in registration
      };

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      if (existingUsers.some((user: User) => user.email === email)) {
        return false;
      }

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      return true;
    } catch (err) {
      return false;
    }
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );

    if (user) {
      setIsLoading(true);
      setIsAuthenticated(true);
      setUser(user);

      // Store role in cookies as well
      Cookies.set("isAuthenticated", "true", { expires: 1 });
      Cookies.set("userRole", user.role, { expires: 1 });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect based on role
      if (user.role === 'admin') {
        router.push("/admin-dashboard");
      } else if (user.role === 'manager') {
        router.push("/manager-dashboard");
      } else {
        router.push("/");
      }
      return true;
    }
    return false;
  };

  // Add role checking function
  const hasRole = (roles: Role[]) => {
    return user ? roles.includes(user.role) : false;
  };

  const logout = () => {
    setIsLoading(true);
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("isAuthenticated");
    Cookies.remove("userRole");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isAuthenticated, 
        isLoading, 
        login, 
        logout, 
        register,
        hasRole 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
