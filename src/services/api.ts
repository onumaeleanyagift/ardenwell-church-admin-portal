import type {
  CreateReportPayload,
  ServiceReport,
} from "../features/reports/types";

export type ReportAction = "approve" | "flag";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

interface HealthResponse {
  status: string;
  message: string;
}

export async function checkApiHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: HealthResponse = await response.json();

  return data;
}

export async function createReport(
  payload: CreateReportPayload,
): Promise<ServiceReport> {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to submit report.");
  }

  return data.report as ServiceReport;
}

export async function getReports(): Promise<ServiceReport[]> {
  const response = await fetch(`${API_BASE_URL}/reports`);

  if (!response.ok) {
    throw new Error(`Unable to retrieve reports: ${response.status}`);
  }

  const data: { reports: ServiceReport[] } = await response.json();

  return data.reports;
}

export async function updateReportStatus(
  reportId: string,
  action: ReportAction,
): Promise<ServiceReport> {
  const response = await fetch(
    `${API_BASE_URL}/reports/${encodeURIComponent(reportId)}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    },
  );

  const data: {
    message?: string;
    report?: ServiceReport;
  } = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to update report status.");
  }

  if (!data.report) {
    throw new Error("The server did not return the updated report.");
  }

  return data.report;
}
