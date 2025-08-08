import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarHeader from "@/components/sidebar/app-sidebar-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="bg-sidebar p-2">
      <AppSidebar />
      <main className="bg-background relative flex h-full flex-1 flex-col overflow-hidden rounded-xl border">
        <AppSidebarHeader />
        <section className="scrollbar-hidden h-[calc(100svh-18px-48px)] overflow-y-scroll">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
