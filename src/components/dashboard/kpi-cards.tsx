import { useArticleContext } from "@/contexts/article-context";
import { cn } from "@/lib/utils";
import { Eye, FileText, Heart, MessageCircle } from "lucide-react";

const KPICards = () => {
  const { stats } = useArticleContext();
  const kpis = [
    {
      title: "Total Articles",
      value: stats.totalArticles,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      color: "text-green-600",
    },
    {
      title: "Total Likes",
      value: stats.totalLikes,
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Total Comments",
      value: stats.totalComments,
      icon: MessageCircle,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.title} className="bg-sidebar rounded-xl border px-4 py-2 shadow-none">
            <div className="flex flex-row items-center justify-between space-y-0">
              <div className="text-muted-foreground font-instrumental-serif text-base font-bold">{kpi.title}</div>
              <div className={cn("rounded-full border bg-white p-2")}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">{kpi.value.toLocaleString()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
