"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useArticleContext } from "@/contexts/article-context";
import type { Article } from "@/types";
import { Pen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ArticleEditModal = ({ article }: { article: Article }) => {
  const [open, setOpen] = useState(false);
  const { updateArticle } = useArticleContext();
  const [formData, setFormData] = useState({
    title: article.title,
    content: article.content,
    status: article.status,
    author: article.author,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 20) {
      newErrors.content = "Content must be at least 20 characters";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      updateArticle(article.id.toString(), formData);
      toast.success("Article updated successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update article");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="size-8 rounded-full p-2 shadow-none">
          <Pen className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader className="space-y-0">
          <DialogTitle className="font-instrumental-serif font-bold">Edit Article</DialogTitle>
          <DialogDescription className="text-xs">
            Make changes to the article. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="font-instrumental-serif font-bold tracking-wide" htmlFor="title">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter article title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="font-instrumental-serif font-bold tracking-wide" htmlFor="author">
                Author *
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
                placeholder="Enter author name"
                className={errors.author ? "border-red-500" : ""}
              />
              {errors.author && <p className="text-sm text-red-500">{errors.author}</p>}
            </div>

            <div className="space-y-2">
              <Label className="font-instrumental-serif font-bold tracking-wide" htmlFor="status">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-instrumental-serif font-bold tracking-wide" htmlFor="content">
              Content *
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Enter article content"
              rows={8}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
            <p className="text-muted-foreground text-end text-xs">{formData.content.length} characters</p>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleEditModal;
