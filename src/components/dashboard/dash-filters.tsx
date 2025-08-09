import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import DateRangePicker from "../ui/date-range-picker";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import SortFilter from "./sort-filter";

const DashFilters = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="relative flex max-w-3xs items-center gap-2">
        <Search size={16} className="absolute top-1/2 right-3 z-10 -translate-y-1/2" />
        <Input placeholder="Search anything!" className="h-8 w-full shadow-none" />
      </div>
      <div className="flex items-center gap-3">
        <Select>
          <SelectTrigger className="!h-8 w-40 font-medium shadow-none">
            <SelectValue placeholder="All Authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            <SelectItem value="john">John Doe</SelectItem>
          </SelectContent>
        </Select>
        <DateRangePicker />
        <SortFilter />
        <Button variant={"destructive"} className="h-7">
          <SlidersHorizontal size={14} />
          Clear
        </Button>
      </div>
    </div>
  );
};

export default DashFilters;
