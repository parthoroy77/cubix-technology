"use client";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="divide-y *:px-4 *:py-3">
      <div className="flex items-center justify-between">
        <h3 className="font-instrumental-serif text-xl font-bold">Dashboard</h3>
        <div>
          <Input placeholder="Search here!" className="h-8 text-xs placeholder:text-xs" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DashboardPage;
