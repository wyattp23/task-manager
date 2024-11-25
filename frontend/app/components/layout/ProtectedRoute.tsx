"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthContext from "@/app/context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (!user) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
