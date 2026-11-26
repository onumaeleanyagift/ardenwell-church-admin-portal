import type { ReportFormValues } from "./types";

export type ReportFormErrors = Partial<Record<keyof ReportFormValues, string>>;

export function validateReportForm(values: ReportFormValues): ReportFormErrors {
  const errors: ReportFormErrors = {};

  // Validate branch name
  if (!values.branchName.trim()) {
    errors.branchName = "Please select a branch.";
  }

  // Validate service type
  if (!values.serviceType.trim()) {
    errors.serviceType = "Please select a service type.";
  }

  // Validate service date
  if (!values.serviceDate.trim()) {
    errors.serviceDate = "Please select a service date.";
  }

  // Validate attendance count
  const attendance = values.attendanceCount.trim();
  const attendanceValue = Number(attendance);

  if (!attendance) {
    errors.attendanceCount = "Attendance count is required.";
  } else if (!Number.isFinite(attendanceValue)) {
    errors.attendanceCount = "Enter a valid attendance number.";
  } else if (!Number.isInteger(attendanceValue)) {
    errors.attendanceCount = "Attendance must be a whole number.";
  } else if (attendanceValue < 0) {
    errors.attendanceCount = "Attendance cannot be negative.";
  }

  // Validate first-timers count
  const firstTimers = values.firstTimersCount.trim();
  const firstTimersValue = Number(firstTimers);

  if (!firstTimers) {
    errors.firstTimersCount = "First-timers count is required.";
  } else if (!Number.isFinite(firstTimersValue)) {
    errors.firstTimersCount = "Enter a valid first-timers number.";
  } else if (!Number.isInteger(firstTimersValue)) {
    errors.firstTimersCount = "First-timers must be a whole number.";
  } else if (firstTimersValue < 0) {
    errors.firstTimersCount = "First-timers cannot be negative.";
  }

  return errors;
}
