export type Article = {
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
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
};
