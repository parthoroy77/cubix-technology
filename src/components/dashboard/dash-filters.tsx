"use client";
import { useArticleContext } from "@/contexts/article-context";
import { debounce } from "@/lib/utils";
import { ArticleFilters } from "@/types";
import { format } from "date-fns";
import { Search, SlidersHorizontal } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import DateRangePicker from "../ui/date-range-picker";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import SortFilter from "./sort-filter";

const DashFilters = () => {
  const { setFilters, filters, resetFilters, uniqueAuthors } = useArticleContext();

  const handleSearchChange = debounce((e: unknown) => {
    setFilters({ search: e as string });
  }, 300);

  const handleDateChange = (date: DateRange) => {
    setFilters({
      dateRange: {
        from: date ? format(date.from!, "yyyy-MM-dd") : "",
        to: date ? format(date.to!, "yyyy-MM-dd") : "",
      },
    });
  };

  const handleSortChange = (sortBy: ArticleFilters["sortBy"], order: ArticleFilters["sortOrder"]) => {
    setFilters({
      sortBy,
      sortOrder: order,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative flex max-w-3xs items-center gap-2">
        <Search size={16} className="absolute top-1/2 right-3 z-10 -translate-y-1/2" />
        <Input
          defaultValue={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search anything!"
          className="h-8 w-full shadow-none"
        />
      </div>
      <div className="flex items-center gap-3">
        <Select value={filters.status} onValueChange={(value) => setFilters({ status: value })}>
          <SelectTrigger className="!h-8 w-40 font-medium shadow-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.author} onValueChange={(v) => setFilters({ author: v })}>
          <SelectTrigger className="!h-8 w-40 font-medium shadow-none">
            <SelectValue placeholder="All Authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {uniqueAuthors.map((author, i) => (
              <SelectItem key={i} value={author.value}>
                {author.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DateRangePicker onChange={handleDateChange} />
        <SortFilter onChange={handleSortChange} />
        <Button onClick={resetFilters} variant={"destructive"} className="h-7">
          <SlidersHorizontal size={14} />
          Clear
        </Button>
      </div>
    </div>
  );
};

export default DashFilters;
