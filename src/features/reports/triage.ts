import type { ReportStatus } from "./types";

// Minimum attendance threshold for automatic follow-up.
export const LOW_ATTENDANCE_THRESHOLD = 50;

interface TriageInput {
  attendanceCount: number;
  hasUrgentNeeds: boolean;
}

export function determineInitialStatus({
  attendanceCount,
  hasUrgentNeeds,
}: TriageInput): ReportStatus {
  // Urgent branch needs require follow-up.
  if (hasUrgentNeeds) {
    return "Needs Follow-Up";
  }

  // Low attendance requires follow-up.
  if (attendanceCount < LOW_ATTENDANCE_THRESHOLD) {
    return "Needs Follow-Up";
  }

  // Normal reports await headquarters review.
  return "Pending Review";
}
