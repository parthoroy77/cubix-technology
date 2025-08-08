import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import AppBreadcrumb from "./app-breadcrumb";

const AppSidebarHeader = () => {
  return (
    <header className="bg-background sticky top-0 flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <AppBreadcrumb />
      </div>
    </header>
  );
};

export default AppSidebarHeader;
