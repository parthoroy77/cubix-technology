"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useArticleContext } from "@/contexts/article-context";

export default function PerformanceGraph() {
  const { getPerformanceData } = useArticleContext();
  const [granularity, setGranularity] = useState<"daily" | "monthly">("daily");

  const chartData = useMemo(() => {
    return getPerformanceData(granularity);
  }, [getPerformanceData, granularity]);

  const chartConfig = {
    views: {
      label: "Views",
      color: "var(--chart-1)",
    },
    likes: {
      label: "Likes",
      color: "var(--chart-2)",
    },
    comments: {
      label: "Comments",
      color: "var(--chart-3)",
    },
  };

  return (
    <div className="space-y-3 !pb-5">
      <div className="flex items-center justify-between">
        <h3 className="font-instrumental-serif font-bold">Performance Graph</h3>
        <Select value={granularity} onValueChange={(value) => setGranularity(value as "daily" | "monthly")}>
          <SelectTrigger className="h-8 w-[120px] text-xs">
            <SelectValue placeholder="Select granularity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: -20,
            right: 12,
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="date"
            tickLine={true}
            axisLine={true}
            minTickGap={32}
            tickMargin={10}
            tickFormatter={(value) => {
              const date = new Date(value);
              if (granularity === "daily") {
                return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
              } else {
                return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
              }
            }}
          />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="views" fill="var(--chart-1)" radius={4} />
          <Bar dataKey="likes" fill="var(--chart-2)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
