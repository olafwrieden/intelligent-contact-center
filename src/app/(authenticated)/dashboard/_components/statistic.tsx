import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface StatisticProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

const Statistic = ({ title, value, subtitle, icon }: StatisticProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default Statistic;
