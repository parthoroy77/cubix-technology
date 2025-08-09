"use client";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArticleFilters } from "@/types";
import { ArrowDown, ArrowDownUp, ArrowUp, Check, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

const sortByItems: { label: string; value: ArticleFilters["sortBy"] }[] = [
  {
    label: "Published At",
    value: "publishedAt",
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

const SortFilter = ({
  onChange,
}: {
  onChange: (sortBy: ArticleFilters["sortBy"], order: ArticleFilters["sortOrder"]) => void;
}) => {
  const [order, setOrder] = useState<ArticleFilters["sortOrder"]>();
  const [sortBy, setSortBy] = useState<ArticleFilters["sortBy"]>();

  useEffect(() => {
    if (sortBy && order) {
      onChange(sortBy, order);
    }
  }, [order, sortBy]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          className="text-muted-foreground font-medium capitalize shadow-none"
        >
          {sortBy && order ? `${sortBy} / ${order}` : "Sort"}
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
                <CommandItem
                  onSelect={(v) => setSortBy(v as ArticleFilters["sortBy"])}
                  className="flex items-center gap-2"
                  value={item.value}
                  key={item.value}
                >
                  {item.value === sortBy ? <Circle fill="green" className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
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
                  onSelect={(v) => setOrder(v as ArticleFilters["sortOrder"])}
                  className="flex items-center justify-between gap-2 capitalize"
                  value={item.value}
                  key={item.value}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </div>
                  <Check
                    color="green"
                    className={cn("mr-2 h-3 w-3", item.value === order ? "opacity-100" : "opacity-0")}
                  />
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
