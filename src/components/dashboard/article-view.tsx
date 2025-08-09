import ArticlePagination from "./article-pagination";
import ArticleTable from "./article-table";

const ArticleView = () => {
  return (
    <div className="space-y-3">
      <ArticleTable />
      <ArticlePagination />
    </div>
  );
};

export default ArticleView;
