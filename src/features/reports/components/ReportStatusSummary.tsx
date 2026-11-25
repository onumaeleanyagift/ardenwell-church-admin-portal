import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

interface ReportStatusSummaryProps {
  approved: number;
  pendingReview: number;
  needsFollowUp: number;
}

function ReportStatusSummary({
  approved,
  pendingReview,
  needsFollowUp,
}: ReportStatusSummaryProps) {
  const total = approved + pendingReview + needsFollowUp;

  const statuses = [
    {
      label: "Approved",
      count: approved,
      variant: "success" as const,
      barColor: "bg-green-500",
    },
    {
      label: "Pending Review",
      count: pendingReview,
      variant: "warning" as const,
      barColor: "bg-amber-500",
    },
    {
      label: "Needs Follow-Up",
      count: needsFollowUp,
      variant: "danger" as const,
      barColor: "bg-red-500",
    },
  ];

  return (
    <Card className="space-y-5">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-brand-950">
            Reports by Status
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Overview of submitted reports
          </p>
        </div>

        <span className="text-sm font-semibold text-slate-700">
          {total} Reports
        </span>
      </div>

      {/* Status Breakdown */}
      <div className="space-y-5">
        {statuses.map((status) => {
          const percentage =
            total > 0 ? Math.round((status.count / total) * 100) : 0;

          return (
            <div key={status.label} className="space-y-2">
              {/* Status Label and Count */}
              <div className="flex items-center justify-between">
                <Badge variant={status.variant}>{status.label}</Badge>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">
                    {status.count}
                  </span>

                  <span className="text-xs text-slate-500">{percentage}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`${status.label} reports`}
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${status.barColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default ReportStatusSummary;