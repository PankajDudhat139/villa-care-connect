"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import LoadingSpinner from "@/components/LoadingSpinner";

// Add role type
type Role = "admin" | "customer" | "manager" | "technician";

// Define route access by role
const roleRouteAccess: Record<Role, string[]> = {
  admin: [
    "/dashboard/manager",
    "/dashboard/customer",
    "/dashboard/technician",
    "/",
  ],
  manager: ["/dashboard/manager", "/"],
  customer: ["/dashboard/customer", "/"],
  technician: ["/dashboard/technician", "/"],
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (
    name: string,
    email: string,
    phone: string,
    password: string,
    role: Role
  ) => boolean;
  hasRole: (roles: Role[]) => boolean;
  canAccessCurrentRoute: () => boolean;
  redirectToDashboard: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canRender, setCanRender] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // First effect - load user data
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

  // Define the redirectToDashboard function with useCallback
  const redirectToDashboard = useCallback(() => {
    if (!user) return;

    switch (user.role) {
      case "admin":
        router.push("/");
        break;
      case "manager":
        router.push("/dashboard/manager");
        break;
      case "customer":
        router.push("/dashboard/customer");
        break;
      case "technician":
        router.push("/dashboard/technician");
        break;
      default:
        router.push("/");
    }
  }, [user, router]);

  const canAccessCurrentRoute = () => {
    if (!user || !pathname) return false;

    const accessibleRoutes = roleRouteAccess[user.role] || [];
    return accessibleRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
  };

  // Second effect - check route access and set render permission
  useEffect(() => {
    if (!isLoading && isAuthenticated && user && pathname) {
      // Public routes that don't need protection
      const publicRoutes = ["/login", "/register", "/"];
      if (publicRoutes.includes(pathname)) {
        setCanRender(true);
        return;
      }

      // Check if user has access to current route
      const accessibleRoutes = roleRouteAccess[user.role] || [];
      const hasAccess = accessibleRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
      );

      if (hasAccess) {
        setCanRender(true);
      } else {
        // Redirect without rendering current page
        setCanRender(false);
        redirectToDashboard();
      }
    } else if (
      !isLoading &&
      !isAuthenticated &&
      pathname !== "/login" &&
      pathname !== "/register"
    ) {
      // If not authenticated and not on login/register page
      setCanRender(false);
      router.push("/login");
    } else if (!isLoading) {
      // For login and register pages when not authenticated
      setCanRender(true);
    }
  }, [pathname, user, isAuthenticated, isLoading, router, redirectToDashboard]);

  const register = (
    name: string,
    email: string,
    phone: string,
    password: string,
    role: Role
  ) => {
    try {
      const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        role,
      };

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      if (existingUsers.some((user: User) => user.email === email)) {
        return false;
      }

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      return true;
    } catch {
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

      Cookies.set("isAuthenticated", "true", { expires: 1 });
      Cookies.set("userRole", user.role, { expires: 1 });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect to appropriate dashboard based on role
      switch (user.role) {
        case "admin":
          router.push("/");
          break;
        case "manager":
          router.push("/dashboard/manager");
          break;
        case "customer":
          router.push("/dashboard/customer");
          break;
        case "technician":
          router.push("/dashboard/technician");
          break;
        default:
          router.push("/");
      }

      setIsLoading(false);
      return true;
    }
    return false;
  };

  const hasRole = (roles: Role[]) => {
    return user ? roles.includes(user.role) : false;
  };

  const logout = () => {
    setIsLoading(true);
    setIsAuthenticated(false);
    setUser(null);
    setCanRender(false);
    Cookies.remove("isAuthenticated");
    Cookies.remove("userRole");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  // Render a loading state or nothing while checking permissions
  if (isLoading) {
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated,
          isLoading,
          login,
          logout,
          register,
          hasRole,
          canAccessCurrentRoute,
          redirectToDashboard,
        }}
      >
        <LoadingSpinner />
      </AuthContext.Provider>
    );
  }

  // Don't render children if not allowed to access this route
  if (!canRender) {
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated,
          isLoading,
          login,
          logout,
          register,
          hasRole,
          canAccessCurrentRoute,
          redirectToDashboard,
        }}
      >
        {/* Render nothing while redirecting */}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
        hasRole,
        canAccessCurrentRoute,
        redirectToDashboard,
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

// Updated HOC to use the canRender mechanism
export const withRoleBasedAccess = <P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: Role[]
) => {
  return function ProtectedRoute(props: P) {
    const { user, isAuthenticated, isLoading } = useAuth();

    // Don't render anything while loading
    if (isLoading) {
      return <LoadingSpinner />;
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
      return null;
    }

    // Don't render if not authorized
    if (!user || !allowedRoles.includes(user.role)) {
      return null;
    }

    // Only render component if all checks pass
    return <Component {...props} />;
  };
};
