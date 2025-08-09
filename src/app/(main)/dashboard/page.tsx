"use client";
import ArticleView from "@/components/dashboard/article-view";
import DashFilters from "@/components/dashboard/dash-filters";
import KPICards from "@/components/dashboard/kpi-cards";
import PerformanceGraph from "@/components/dashboard/performance-graph";
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
        <h1 className="font-instrumental-serif text-xl font-bold">Dashboard</h1>
        {/* <div>
          <Input placeholder="Search here!" className="h-8 text-xs placeholder:text-xs" />
        </div> */}
      </div>
      <KPICards />
      <DashFilters />
      <ArticleView />
      <PerformanceGraph />
    </div>
  );
};

export default DashboardPage;
