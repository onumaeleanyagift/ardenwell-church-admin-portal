import { useEffect, useState } from "react";

import Button from "../components/ui/Button";

import ReportsTable from "../features/reports/components/ReportsTable";
import ReportFilters from "../features/reports/components/ReportFilters";

import { getReports, updateReportStatus } from "../services/api";

import type { ReportAction } from "../services/api";

import type { ReportStatus, ServiceReport } from "../features/reports/types";

function ReportsPage() {
  // Reports retrieved from the backend.
  const [reports, setReports] = useState<ServiceReport[]>([]);

  // Loading and error states.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states.
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus | "">("");

  // Allow the user to retry failed requests.
  const [reloadKey, setReloadKey] = useState(0);

  const [updatingReportId, setUpdatingReportId] = useState<string | null>(null);

  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  // Retrieve reports from Flask.
  useEffect(() => {
    let isActive = true;

    async function loadReports() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getReports();

        if (isActive) {
          setReports(data);
        }
      } catch (error: unknown) {
        if (isActive) {
          setError(
            error instanceof Error
              ? error.message
              : "Unable to retrieve reports.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadReports();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  // Filter reports by selected branch and status.
  const filteredReports = reports.filter((report) => {
    const matchesBranch =
      !selectedBranch || report.branchName === selectedBranch;

    const matchesStatus = !selectedStatus || report.status === selectedStatus;

    return matchesBranch && matchesStatus;
  });

  // Reset both filters.
  const handleClearFilters = () => {
    setSelectedBranch("");
    setSelectedStatus("");
  };

  const handleStatusUpdate = async (reportId: string, action: ReportAction) => {
    try {
      setUpdatingReportId(reportId);
      setActionError("");
      setActionSuccess("");

      const updatedReport = await updateReportStatus(reportId, action);

      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === reportId ? updatedReport : report,
        ),
      );

      setActionSuccess(
        action === "approve"
          ? "Report approved successfully."
          : "Report flagged for follow-up successfully.",
      );
    } catch (error: unknown) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to update report status.",
      );
    } finally {
      setUpdatingReportId(null);
    }
  };

  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Branch Reports</h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage submitted service and activity reports across all
          branches.
        </p>
      </div>

      {/* Report Filters */}
      <ReportFilters
        selectedBranch={selectedBranch}
        selectedStatus={selectedStatus}
        onBranchChange={setSelectedBranch}
        onStatusChange={setSelectedStatus}
        onClearFilters={handleClearFilters}
      />

      {actionError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {actionError}
        </div>
      )}

      {actionSuccess && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
        >
          {actionSuccess}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center">
          <p className="text-sm text-slate-500">Loading branch reports...</p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-sm font-medium text-red-700">{error}</p>

          <Button
            variant="outline"
            className="mt-3"
            onClick={() => setReloadKey((current) => current + 1)}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Reports Table */}
      {!isLoading && !error && (
        <ReportsTable
          reports={filteredReports}
          onStatusUpdate={handleStatusUpdate}
          updatingReportId={updatingReportId}
        />
      )}
    </section>
  );
}

export default ReportsPage;
