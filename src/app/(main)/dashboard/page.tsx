"use client";
import ArticleTable from "@/components/dashboard/article-table";
import DashFilters from "@/components/dashboard/dash-filters";
import KPICards from "@/components/dashboard/kpi-cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth-context";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
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
      <div className="col-span-2 space-y-3">
        <ArticleTable />
        <div className="flex items-center justify-between text-xs">
          <h6 className="font-medium">Showing 5 of 20 articles</h6>
          <div className="flex items-center gap-3">
            <Button variant={"outline"} className="h-7 shadow-none">
              <ChevronLeft />
              Previous
            </Button>
            <div>
              <span>Page 1 of 0</span>
            </div>
            <Button variant={"outline"} className="h-7 shadow-none">
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
