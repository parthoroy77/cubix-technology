import { articlesData } from "@/data/article";
import { Article, ArticleFilters, LabelValuePair, Performance } from "@/types";
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
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getPerformanceData: (granularity: "daily" | "monthly") => Performance[];

  stats: {
    totalArticles: number;
    totalViews: number;
    totalComments: number;
    totalLikes: number;
  };
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
  const [articles, setArticles] = useState<Article[] | []>(articlesData);
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

  const updateArticle = useCallback((id: string, updates: Partial<Article>) => {
    setArticles((prev) => prev.map((article) => (article.id === +id ? { ...article, ...updates } : article)));
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== +id));
  }, []);

  // New function to get performance data for charts
  const getPerformanceData = useCallback(
    (granularity: "daily" | "monthly"): Performance[] => {
      const dataMap = new Map<string, { views: number; likes: number; comments: number }>();

      filteredArticles.forEach((article) => {
        const date = new Date(article.publishedAt);
        let key: string;

        if (granularity === "daily") {
          key = article.publishedAt; // YYYY-MM-DD
        } else {
          key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`; // YYYY-MM
        }

        const currentData = dataMap.get(key) || { views: 0, likes: 0, comments: 0 };
        dataMap.set(key, {
          views: currentData.views + article.views,
          likes: currentData.likes + article.likes,
          comments: currentData.comments + article.comments,
        });
      });

      // Sort data by date/month
      const sortedData = Array.from(dataMap.entries())
        .map(([date, totals]) => ({ date, ...totals }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return sortedData;
    },
    [filteredArticles]
  );

  // Stats for KPI Card
  const stats = useMemo(() => {
    return {
      totalArticles: filteredArticles.length,
      totalViews: filteredArticles.reduce((sum, article) => sum + article.views, 0),
      totalComments: filteredArticles.reduce((sum, article) => sum + article.comments, 0),
      totalLikes: filteredArticles.reduce((sum, article) => sum + article.likes, 0),
    };
  }, [filteredArticles]);
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
        updateArticle,
        deleteArticle,
        getPerformanceData,
        stats,
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
