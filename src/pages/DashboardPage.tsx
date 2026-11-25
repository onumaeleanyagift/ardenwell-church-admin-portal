import MetricCard from "../components/ui/MetricCard";

import ReportStatusSummary from "../features/reports/components/ReportStatusSummary";
import BranchAttendanceSummary from "../features/reports/components/BranchAttendanceSummary";

function DashboardPage() {
  // Temporary data for the dashboard preview.
  // We will replace this with actual report data later.
  const branchAttendance = [
    { branchName: "Ikeja", attendance: 920 },
    { branchName: "Lekki", attendance: 740 },
    { branchName: "Abuja", attendance: 624 },
    { branchName: "Ajah", attendance: 500 },
  ];

  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor service reports and activity across all branches.
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Attendance"
          value="2,784"
          description="Across all branches"
          accent="blue"
        />

        <MetricCard
          title="Total First-Timers"
          value="146"
          description="Across all branches"
          accent="green"
        />

        <MetricCard
          title="Reports Submitted"
          value="24"
          description="Total submitted reports"
          accent="amber"
        />

        <MetricCard
          title="Pending Review"
          value="6"
          description="Awaiting headquarters review"
          accent="indigo"
        />
      </div>

      {/* Dashboard Analytics */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ReportStatusSummary
          approved={14}
          pendingReview={6}
          needsFollowUp={4}
        />

        <BranchAttendanceSummary branches={branchAttendance} />
      </div>
    </section>
  );
}

export default DashboardPage;
