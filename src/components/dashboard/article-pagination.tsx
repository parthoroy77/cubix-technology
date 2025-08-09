"use client";
import { useArticleContext } from "@/contexts/article-context";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const ArticlePagination = () => {
  const { totalPages, filteredArticles, currentPage, handlePagination } = useArticleContext();
  return (
    <div className="flex items-center justify-between text-xs">
      <h6 className="font-medium">Showing 5 of {filteredArticles.length} articles</h6>
      <div className="flex items-center gap-3">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePagination("prev")}
          variant={"outline"}
          className="h-7 shadow-none"
        >
          <ChevronLeft />
          Previous
        </Button>
        <div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePagination("next")}
          variant={"outline"}
          className="h-7 shadow-none"
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ArticlePagination;
