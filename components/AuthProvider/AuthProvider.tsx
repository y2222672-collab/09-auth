"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "@/components/Loader/Loader";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const isPublicPage =
        pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/";
      const isPrivatePage =
        pathname.startsWith("/notes") || pathname.startsWith("/profile");
      if (isPublicPage && !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
          if (isPublicPage && pathname !== "/") {
            router.replace("/profile");
          }
        } else {
          clearIsAuthenticated();
          if (isPrivatePage) router.replace("/sign-in");
        }
      } catch {
        clearIsAuthenticated();
        if (isPrivatePage) router.replace("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};
