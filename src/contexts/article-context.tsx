import { articlesData } from "@/data/article";
import { Article } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type ArticleContext = {
  articles: Article[];
};

const ArticleContext = createContext<ArticleContext | null>(null);

const ArticleContextProvider = ({ children }: { children: ReactNode }) => {
  const [articles] = useState<Article[] | []>(articlesData);
  return <ArticleContext.Provider value={{ articles }}>{children}</ArticleContext.Provider>;
};

export default ArticleContextProvider;

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) throw new Error("Article context must be used within ArticleContextProvider");
  return context;
};
