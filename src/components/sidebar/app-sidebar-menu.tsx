"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type NavItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
];

const AppSidebarMenu = () => {
  const pathname = usePathname();
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent className="px-1.5 md:px-0">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: true,
                    }}
                    className={cn(
                      "cursor-pointer px-2.5 font-medium tracking-tight md:px-2",
                      pathname === item.url && "[&_svg]:text-primary bg-secondary text-primary dark:text-white"
                    )}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AppSidebarMenu;
