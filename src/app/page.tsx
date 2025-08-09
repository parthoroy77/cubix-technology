"use client";
import AuthForm from "@/components/layout/auth-form";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RootPage = () => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return <AuthForm />;
};

export default RootPage;
