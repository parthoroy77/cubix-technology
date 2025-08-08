import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Box } from "lucide-react";
import AppSidebarMenu from "./app-sidebar-menu";

const AppSidebar = () => {
  return (
    <Sidebar className="border-none *:px-1">
      <SidebarHeader className="h-14">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              variant={"default"}
              className="hover:text-foreground hover:bg-secondary"
              asChild
            >
              <div>
                <Box color="var(--color-primary)" size={26} className="!size-7 shrink-0" />
                <span className="font-instrumental-serif text-xl font-bold">Cubix Technology</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <AppSidebarMenu />
    </Sidebar>
  );
};

export default AppSidebar;
