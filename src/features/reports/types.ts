export type ReportStatus = "Approved" | "Pending Review" | "Needs Follow-Up";

export interface ReportFormValues {
  branchName: string;
  serviceType: string;
  serviceDate: string;
  attendanceCount: string;
  firstTimersCount: string;
  notes: string;
  hasUrgentNeeds: boolean;
}

export interface ServiceReport {
  id: string;
  branchName: string;
  serviceType: string;
  serviceDate: string;
  attendanceCount: number;
  firstTimersCount: number;
  notes: string;
  initialStatus: ReportStatus;
  status: ReportStatus;
  submittedAt: string;
  hasUrgentNeeds: boolean;
}
