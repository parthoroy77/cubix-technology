"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

const AppBreadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/")?.filter((x) => x);
  const formattedPaths = [
    ...paths.map((name, index) => {
      const path = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: name.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2"),
        path,
      };
    }),
  ];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="font-instrumental-serif text-xs font-bold">
            App
          </BreadcrumbLink>
        </BreadcrumbItem>
        {formattedPaths.length > 0 && <BreadcrumbSeparator />}
        {formattedPaths.length > 0 &&
          formattedPaths.map(({ label, path }, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem className="text-xs">
                <BreadcrumbLink href={path} className="font-instrumental-serif text-primary font-bold capitalize">
                  {label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i + 1 < formattedPaths.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
