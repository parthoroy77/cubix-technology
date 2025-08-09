import { articlesData } from "@/data/article";
import { Article, ArticleFilters, LabelValuePair } from "@/types";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type ArticleContext = {
  articles: Article[];
  filteredArticles: Article[];
  paginatedArticles: Article[];
  totalPages: number;
  currentPage: number;

  filters: ArticleFilters;
  setFilters: (filters: Partial<ArticleFilters>) => void;
  resetFilters: () => void;
  handlePagination: (action: "next" | "prev") => void;

  uniqueAuthors: LabelValuePair[];
};

const ArticleContext = createContext<ArticleContext | null>(null);

const defaultFilters: ArticleFilters = {
  search: "",
  author: "",
  dateRange: {
    from: "",
    to: "",
  },
  status: "",
  sortBy: "publishedAt",
  sortOrder: "desc",
};

const ITEMS_PER_PAGE = 5;

const ArticleContextProvider = ({ children }: { children: ReactNode }) => {
  const [articles] = useState<Article[] | []>(articlesData);
  const [filtersState, setFiltersState] = useState<ArticleFilters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    // Filter by search term
    if (filtersState.search) {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(filtersState.search.toLowerCase()) ||
          a.content.toLowerCase().includes(filtersState.search.toLowerCase())
      );
    }

    // Filter by Author
    if (filtersState.author) {
      filtered = filtered.filter((article) => article.author.split(" ").join().toLowerCase() === filtersState.author);
    }

    // Filter by status
    if (filtersState.status) {
      filtered = filtered.filter((a) => a.status === filtersState.status);
    }

    // Date range filter
    if (filtersState.dateRange.from) {
      filtered = filtered.filter((article) => new Date(article.publishedAt) >= new Date(filtersState.dateRange.from));
    }
    if (filtersState.dateRange.to) {
      filtered = filtered.filter((article) => new Date(article.publishedAt) <= new Date(filtersState.dateRange.to));
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[filtersState.sortBy];
      let bValue: any = b[filtersState.sortBy];

      if (filtersState.sortBy === "publishedAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (filtersState.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [articles, filtersState]);

  const setFilters = useCallback((newFilters: Partial<ArticleFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const uniqueAuthors = useMemo(
    () => [
      ...new Set(
        articles.map((article) => ({ label: article.author, value: article.author.split(" ").join().toLowerCase() }))
      ),
    ],
    [articles]
  );

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  // Pagination
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  }, [filteredArticles]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, totalPages, currentPage]);

  // Handle page change
  const handlePagination = useCallback(
    (action: "next" | "prev") => {
      setCurrentPage((prevPage) => {
        if (action === "next") {
          return Math.min(prevPage + 1, totalPages);
        } else {
          return Math.max(prevPage - 1, 1);
        }
      });
    },
    [totalPages]
  );

  return (
    <ArticleContext.Provider
      value={{
        articles,
        filters: filtersState,
        setFilters,
        filteredArticles,
        resetFilters,
        uniqueAuthors,
        paginatedArticles,
        handlePagination,
        totalPages,
        currentPage,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) throw new Error("Article context must be used within ArticleContextProvider");
  return context;
};
