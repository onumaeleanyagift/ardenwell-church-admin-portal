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

  if (!attendance) {
    errors.attendanceCount = "Attendance count is required.";
  } else if (!Number.isFinite(Number(attendance))) {
    errors.attendanceCount = "Enter a valid attendance number.";
  } else if (Number(attendance) < 0) {
    errors.attendanceCount = "Attendance cannot be negative.";
  }

  // Validate first-timers count
  const firstTimers = values.firstTimersCount.trim();

  if (!firstTimers) {
    errors.firstTimersCount = "First-timers count is required.";
  } else if (!Number.isFinite(Number(firstTimers))) {
    errors.firstTimersCount = "Enter a valid first-timers number.";
  } else if (Number(firstTimers) < 0) {
    errors.firstTimersCount = "First-timers cannot be negative.";
  }

  return errors;
}