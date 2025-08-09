export type Article = {
  id: string | number;
  title: string;
  author: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  category: string;
  content: string;
  readTimeMinutes: number;
  publishedAt: string;
  status: "published" | "draft";
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
};

export interface ArticleFilters {
  search: string;
  author: string;
  dateRange: {
    from: string;
    to: string;
  };
  status: string;
  sortBy: "views" | "likes" | "comments" | "publishedAt";
  sortOrder: "asc" | "desc";
}

export type LabelValuePair = { label: string; value: string };
