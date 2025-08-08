"use client";

import ArticleContextProvider from "@/contexts/article-context";
import AuthContextProvider from "@/contexts/auth-context";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      <ArticleContextProvider>{children}</ArticleContextProvider>
    </AuthContextProvider>
  );
};

export default Provider;
