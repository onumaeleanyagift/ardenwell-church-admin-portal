import ReportForm from "../features/reports/components/ReportForm";
import type { ServiceReport } from "../features/reports/types";

function ReportFormPage() {
  const handleReportSubmit = (report: ServiceReport) => {
    console.log("Submitted service report:", report);
  };

  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-brand-950">New Report</h1>

        <p className="mt-1 text-sm text-slate-500">
          Submit a weekly service or activity report for your branch.
        </p>
      </div>

      {/* Report Submission Form */}
      <ReportForm onSubmit={handleReportSubmit} />
    </section>
  );
}

export default ReportFormPage;
