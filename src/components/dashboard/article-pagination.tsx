import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const ArticlePagination = () => {
  return (
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
  );
};

export default ArticlePagination;
