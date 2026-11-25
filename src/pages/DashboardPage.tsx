import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";

import ReportStatusSummary from "../features/reports/components/ReportStatusSummary";
import BranchAttendanceSummary from "../features/reports/components/BranchAttendanceSummary";

import {
  calculateReportMetrics,
  calculateBranchAttendance,
} from "../features/reports/metrics";

import { getReports } from "../services/api";
import type { ServiceReport } from "../features/reports/types";

function DashboardPage() {
  const [reports, setReports] = useState<ServiceReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // Retrieve reports from the backend.
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
              : "Unable to load dashboard data.",
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

  // Calculate dashboard metrics from retrieved reports.
  const metrics = calculateReportMetrics(reports);

  const branchAttendance = calculateBranchAttendance(reports);

  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor service reports and activity across all branches.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Loading dashboard data...</p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-sm text-red-700">{error}</p>

          <Button
            variant="outline"
            className="mt-3"
            onClick={() => setReloadKey((current) => current + 1)}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Dashboard Metrics */}
      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Attendance"
              value={metrics.totalAttendance.toLocaleString()}
              description="Across all branches"
              accent="blue"
            />

            <MetricCard
              title="Total First-Timers"
              value={metrics.totalFirstTimers.toLocaleString()}
              description="Across all branches"
              accent="green"
            />

            <MetricCard
              title="Reports Submitted"
              value={metrics.totalReports}
              description="Total submitted reports"
              accent="amber"
            />

            <MetricCard
              title="Pending Review"
              value={metrics.pendingReviewReports}
              description="Awaiting headquarters review"
              accent="indigo"
            />
          </div>

          {/* Dashboard Analytics */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ReportStatusSummary
              approved={metrics.approvedReports}
              pendingReview={metrics.pendingReviewReports}
              needsFollowUp={metrics.needsFollowUpReports}
            />

            <BranchAttendanceSummary branches={branchAttendance} />
          </div>
        </>
      )}
    </section>
  );
}

export default DashboardPage;
