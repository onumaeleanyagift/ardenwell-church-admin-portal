import type { ReactNode } from "react";
import Card from "./Card";

type MetricAccent = "blue" | "green" | "amber" | "indigo";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  accent?: MetricAccent;
}

const accentStyles: Record<MetricAccent, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  indigo: "bg-indigo-100 text-indigo-700",
};

function MetricCard({
  title,
  value,
  description,
  icon,
  accent = "blue",
}: MetricCardProps) {
  return (
    <Card className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>

        {description && (
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        )}
      </div>

      {icon && (
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentStyles[accent]}`}
        >
          {icon}
        </div>
      )}
    </Card>
  );
}

export default MetricCard;
