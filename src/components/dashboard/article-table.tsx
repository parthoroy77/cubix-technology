"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useArticleContext } from "@/contexts/article-context";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Pen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import ArticleEditModal from "./article-edit-modal";

const ArticleTable = () => {
  const { paginatedArticles, deleteArticle } = useArticleContext();
  return (
    <div className="flex-1 overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-sidebar text-xs font-bold">
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedArticles.map((article, i) => (
            <TableRow key={i} className="text-sm">
              <TableCell className="font-medium">
                <div className="max-w-2xs">
                  <p className="truncate">{article.title}</p>
                </div>
              </TableCell>
              <TableCell title={article.content} className="max-w-3xs truncate font-medium">
                Content: {article.content}
              </TableCell>
              <TableCell className="font-semibold">
                <span className="bg-sidebar rounded-md border px-2 py-0.5 text-xs">{article.author}</span>
              </TableCell>
              <TableCell className="font-instrumental-serif text-base font-bold tracking-wide">
                {article.views.toLocaleString()}
              </TableCell>

              <TableCell className="font-instrumental-serif text-base font-bold tracking-wide">
                {article.likes.toLocaleString()}
              </TableCell>
              <TableCell className="font-instrumental-serif text-base font-bold tracking-wide">
                {article.comments.toLocaleString()}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {format(new Date(article.publishedAt), "MM/dd/yyyy - hh:mm a")}
              </TableCell>
              <TableCell className="font-semibold">
                <span
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-xs capitalize",
                    article.status === "published" ? "bg-green-800 text-white" : "bg-muted"
                  )}
                >
                  {article.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-start gap-1">
                  <ArticleEditModal article={article} />
                  <Button
                    onClick={() => deleteArticle(article.id.toString())}
                    variant={"outline"}
                    className="size-8 rounded-full p-2 shadow-none"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticleTable;
