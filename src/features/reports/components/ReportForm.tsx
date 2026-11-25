import { useState } from "react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";

import { branchOptions } from "../../../data/branches";
import { serviceTypeOptions } from "../../../data/serviceTypes";

import { validateReportForm } from "../validation";
import type { ReportFormErrors } from "../validation";

import { determineInitialStatus } from "../triage";

import type { ReportFormValues, ServiceReport } from "../types";

interface ReportFormProps {
  onSubmit: (report: ServiceReport) => void;
}

const initialFormValues: ReportFormValues = {
  branchName: "",
  serviceType: "",
  serviceDate: "",
  attendanceCount: "",
  firstTimersCount: "",
  notes: "",
  hasUrgentNeeds: false,
};

type TextFieldName = Exclude<keyof ReportFormValues, "hasUrgentNeeds">;

function ReportForm({ onSubmit }: ReportFormProps) {
  const [formValues, setFormValues] =
    useState<ReportFormValues>(initialFormValues);

  const [errors, setErrors] = useState<ReportFormErrors>({});

  const [successMessage, setSuccessMessage] = useState("");

  // Handle text-based form fields.
  const handleTextChange = (field: TextFieldName, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setSuccessMessage("");
  };

  // Handle urgent needs checkbox.
  const handleUrgentNeedsChange = (checked: boolean) => {
    setFormValues((current) => ({
      ...current,
      hasUrgentNeeds: checked,
    }));
  };

  // Reset the form.
  const handleReset = () => {
    setFormValues(initialFormValues);
    setErrors({});
    setSuccessMessage("");
  };

  // Handle report submission.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateReportForm(formValues);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage("");
      return;
    }

    const attendanceCount = Number(formValues.attendanceCount);

    const firstTimersCount = Number(formValues.firstTimersCount);

    const initialStatus = determineInitialStatus({
      attendanceCount,
      hasUrgentNeeds: formValues.hasUrgentNeeds,
    });

    const newReport: ServiceReport = {
      id: crypto.randomUUID(),
      branchName: formValues.branchName,
      serviceType: formValues.serviceType,
      serviceDate: formValues.serviceDate,
      attendanceCount,
      firstTimersCount,
      notes: formValues.notes.trim(),
      hasUrgentNeeds: formValues.hasUrgentNeeds,
      initialStatus,
      status: initialStatus,
      submittedAt: new Date().toISOString(),
    };

    onSubmit(newReport);

    handleReset();

    setSuccessMessage("Service report submitted successfully.");
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Form Header */}
        <div className="border-b border-slate-100 pb-5">
          <h2 className="text-lg font-semibold text-brand-950">
            Service / Activity Report
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Complete the details below to submit your branch report.
          </p>
        </div>

        {/* Branch Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-800">
            Branch Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Select
              label="Branch Name / Location"
              name="branchName"
              placeholder="Select branch"
              options={branchOptions}
              value={formValues.branchName}
              onChange={(event) =>
                handleTextChange("branchName", event.target.value)
              }
              error={errors.branchName}
              required
            />

            <Select
              label="Service Type"
              name="serviceType"
              placeholder="Select service type"
              options={serviceTypeOptions}
              value={formValues.serviceType}
              onChange={(event) =>
                handleTextChange("serviceType", event.target.value)
              }
              error={errors.serviceType}
              required
            />

            <Input
              label="Service Date"
              name="serviceDate"
              type="date"
              value={formValues.serviceDate}
              onChange={(event) =>
                handleTextChange("serviceDate", event.target.value)
              }
              error={errors.serviceDate}
              required
            />
          </div>
        </div>

        {/* Attendance Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-800">
            Attendance Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Attendance Count"
              name="attendanceCount"
              type="number"
              min={0}
              step={1}
              placeholder="Enter attendance count"
              value={formValues.attendanceCount}
              onChange={(event) =>
                handleTextChange("attendanceCount", event.target.value)
              }
              error={errors.attendanceCount}
              required
            />

            <Input
              label="New Converts / First-Timers"
              name="firstTimersCount"
              type="number"
              min={0}
              step={1}
              placeholder="Enter first-timers count"
              value={formValues.firstTimersCount}
              onChange={(event) =>
                handleTextChange("firstTimersCount", event.target.value)
              }
              error={errors.firstTimersCount}
              required
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-800">
            Additional Information
          </h3>

          <Textarea
            label="Notes / Prayer Requests / Branch Needs"
            name="notes"
            rows={4}
            placeholder="Enter additional notes, prayer requests or branch needs..."
            value={formValues.notes}
            onChange={(event) => handleTextChange("notes", event.target.value)}
          />

          {/* Urgent Needs Checkbox */}
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <input
              type="checkbox"
              checked={formValues.hasUrgentNeeds}
              onChange={(event) =>
                handleUrgentNeedsChange(event.target.checked)
              }
              className="mt-0.5 h-4 w-4 accent-blue-700"
            />

            <span>
              <span className="block text-sm font-medium text-brand-900">
                This branch has urgent needs
              </span>

              <span className="mt-1 block text-xs text-slate-600">
                Selecting this option will automatically flag the report for
                follow-up by headquarters.
              </span>
            </span>
          </label>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {successMessage}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset Form
          </Button>

          <Button type="submit">Submit Report</Button>
        </div>
      </form>
    </Card>
  );
}

export default ReportForm;
