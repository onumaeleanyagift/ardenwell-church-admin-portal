import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import ReportStatusBadge from "./ReportStatusBadge";

import { branchOptions } from "../../../data/branches";
import { serviceTypeOptions } from "../../../data/serviceTypes";

import type { ReportAction } from "../../../services/api";
import type { ServiceReport } from "../types";

interface ReportsTableProps {
  reports: ServiceReport[];
  onStatusUpdate?: (reportId: string, action: ReportAction) => void;
  updatingReportId?: string | null;
  title?: string;
  showActions?: boolean;
}

function formatDate(dateValue: string): string {
  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Invalid timestamp";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getBranchLabel(value: string): string {
  return branchOptions.find((branch) => branch.value === value)?.label ?? value;
}

function getServiceTypeLabel(value: string): string {
  return (
    serviceTypeOptions.find((service) => service.value === value)?.label ??
    value
  );
}

function ReportsTable({
  reports,
  onStatusUpdate,
  updatingReportId,
  title = "Branch Service Reports",
  showActions = true,
}: ReportsTableProps) {
  return (
    <Card className="overflow-hidden !p-0">
      {/* Table Header */}
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold text-brand-950">{title}</h2>

        <p className="mt-1 text-xs text-slate-500">
          View submitted service and activity reports.
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Branch
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Service Type
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Service Date
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Attendance
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                First-Timers
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Submitted At
              </th>

              {showActions && (
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr
                  key={report.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {getBranchLabel(report.branchName)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {getServiceTypeLabel(report.serviceType)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatDate(report.serviceDate)}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {report.attendanceCount.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {report.firstTimersCount.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <ReportStatusBadge status={report.status} />
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-500">
                    {formatDateTime(report.submittedAt)}
                  </td>

                  {showActions && (
                    <td className="px-5 py-4">
                      {report.status === "Pending Review" && onStatusUpdate ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="primary"
                            className="px-3 py-1.5 text-xs"
                            disabled={updatingReportId === report.id}
                            onClick={() => onStatusUpdate(report.id, "approve")}
                          >
                            {updatingReportId === report.id
                              ? "Updating..."
                              : "Approve"}
                          </Button>

                          <Button
                            variant="danger"
                            className="px-3 py-1.5 text-xs"
                            disabled={updatingReportId === report.id}
                            onClick={() => onStatusUpdate(report.id, "flag")}
                          >
                            Flag
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          No actions available
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={showActions ? 8 : 7}
                  className="px-5 py-12 text-center"
                >
                  <p className="text-sm font-medium text-slate-600">
                    No reports found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Submitted branch reports will appear here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="border-t border-slate-100 px-5 py-3">
        <p className="text-xs text-slate-500">
          {reports.length} {reports.length === 1 ? "report" : "reports"} found
        </p>
      </div>
    </Card>
  );
}

export default ReportsTable;
