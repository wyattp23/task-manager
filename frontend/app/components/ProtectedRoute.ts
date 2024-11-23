"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthContext from "../context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return user ? children : null;
}

export default ProtectedRoute;
