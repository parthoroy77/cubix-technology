"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { articlesData } from "@/data/article";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
const ArticleTable = () => {
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articlesData.slice(0, 5).map((article, i) => (
            <TableRow key={i} className="text-sm">
              <TableCell className="font-medium">
                <div className="max-w-xs">
                  <p className="truncate">{article.title}</p>
                </div>
              </TableCell>
              <TableCell className="max-w-xs truncate">{article.content}</TableCell>
              <TableCell>{article.author}</TableCell>
              <TableCell>{article.views.toLocaleString()}</TableCell>
              <TableCell>{article.likes}</TableCell>
              <TableCell>{article.comments}</TableCell>
              <TableCell>{format(new Date(article.publishedAt), "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-3 w-3" />
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
