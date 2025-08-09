"use client";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowDownUp, ArrowUp, Check, Circle } from "lucide-react";
import { Separator } from "../ui/separator";

const sortByItems = [
  {
    label: "Published At",
    value: "date",
  },
  {
    label: "Likes",
    value: "likes",
  },
  {
    label: "Views",
    value: "views",
  },
  {
    label: "Comments",
    value: "comments",
  },
];

const orders = [
  {
    label: "Asc",
    value: "asc",
    icon: <ArrowUp className="h-3 w-3" />,
  },
  {
    label: "Desc",
    value: "desc",
    icon: <ArrowDown className="h-3 w-3" />,
  },
];

const SortFilter = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          className="text-muted-foreground font-medium shadow-none"
        >
          Sort
          <ArrowDownUp className="h-3 w-3 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="flex flex-col">
            <p className="px-3 py-2 text-sm font-medium">Sort by</p>
            <Separator />
            <CommandGroup>
              {sortByItems.map((item) => (
                <CommandItem className="flex items-center gap-2" value={item.label} key={item.value}>
                  {item.value === item.value ? (
                    <span className="border-foreground h-3 w-3 rounded-full border-[3.5px]" />
                  ) : (
                    <Circle className="h-3 w-3" />
                  )}
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>

          <Separator />
          <div className="flex flex-col">
            <CommandGroup>
              {orders.map((item) => (
                <CommandItem
                  className="flex items-center justify-between gap-2 capitalize"
                  value={item.label}
                  key={item.value}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </div>
                  <Check className={cn("mr-2 h-3 w-3", item.value === item.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SortFilter;
