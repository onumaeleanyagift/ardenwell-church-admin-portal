import type { ServiceReport } from "./types";

export interface ReportMetrics {
  totalAttendance: number;
  totalFirstTimers: number;
  totalReports: number;
  approvedReports: number;
  pendingReviewReports: number;
  needsFollowUpReports: number;
}

export function calculateReportMetrics(
  reports: ServiceReport[],
): ReportMetrics {
  return reports.reduce(
    (metrics, report) => ({
      totalAttendance: metrics.totalAttendance + report.attendanceCount,

      totalFirstTimers: metrics.totalFirstTimers + report.firstTimersCount,

      totalReports: metrics.totalReports + 1,

      approvedReports:
        metrics.approvedReports + (report.status === "Approved" ? 1 : 0),

      pendingReviewReports:
        metrics.pendingReviewReports +
        (report.status === "Pending Review" ? 1 : 0),

      needsFollowUpReports:
        metrics.needsFollowUpReports +
        (report.status === "Needs Follow-Up" ? 1 : 0),
    }),
    {
      totalAttendance: 0,
      totalFirstTimers: 0,
      totalReports: 0,
      approvedReports: 0,
      pendingReviewReports: 0,
      needsFollowUpReports: 0,
    },
  );
}
