"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/services/auth";

interface UserAuthResponse {
  email: string;
  id: number;
  access_token: string;
}

interface AuthContextType {
  user: UserAuthResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      AuthService.verifyToken(token)
        .then((response) => {
          setUser({
            ...response,
            access_token: token,
          });
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/login");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [router]);

  async function login(email: string, password: string) {
    try {
      const { access_token } = await AuthService.login(email, password);
      const userResponse = await AuthService.verifyToken(access_token);

      localStorage.setItem("token", access_token);
      setUser({
        ...userResponse,
        access_token,
      });
      router.push("/");
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
