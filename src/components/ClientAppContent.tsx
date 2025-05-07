"use client";

import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/auth-context";

export default function ClientAppContent({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <main className="container mx-auto p-4">{children}</main>
      {isLoading && <LoadingSpinner />}
    </>
  );
}