import Card from "../../../components/ui/Card";

export interface BranchAttendance {
  branchName: string;
  attendance: number;
}

interface BranchAttendanceSummaryProps {
  branches: BranchAttendance[];
}

function BranchAttendanceSummary({ branches }: BranchAttendanceSummaryProps) {
  const highestAttendance = Math.max(
    ...branches.map((branch) => branch.attendance),
    0,
  );

  return (
    <Card className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-brand-950">
          Attendance by Branch
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Attendance recorded across branches
        </p>
      </div>

      {/* Branch Attendance List */}
      {branches.length > 0 ? (
        <div className="space-y-5">
          {branches.map((branch) => {
            const percentage =
              highestAttendance > 0
                ? Math.round((branch.attendance / highestAttendance) * 100)
                : 0;

            return (
              <div key={branch.branchName} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {branch.branchName}
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {branch.attendance.toLocaleString()}
                  </span>
                </div>

                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label={`${branch.branchName} attendance relative to the highest branch`}
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-brand-600 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-slate-500">
          No branch attendance data available.
        </p>
      )}
    </Card>
  );
}

export default BranchAttendanceSummary;