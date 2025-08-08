"use client";

import ArticleContextProvider from "@/contexts/article-context";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return <ArticleContextProvider>{children}</ArticleContextProvider>;
};

export default Provider;
