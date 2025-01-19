"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const returnUrl = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      redirect(`/user/signin?returnUrl=${returnUrl}`);
    }
  }, [loading, user, returnUrl]);
  return <>{children}</>;
}

export default Protected;
