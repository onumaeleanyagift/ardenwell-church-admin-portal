import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

import type { SelectOption } from "../../../components/ui/Select";

import { branchOptions } from "../../../data/branches";

import type { ReportStatus } from "../types";

interface ReportFiltersProps {
  selectedBranch: string;
  selectedStatus: ReportStatus | "";
  onBranchChange: (branch: string) => void;
  onStatusChange: (status: ReportStatus | "") => void;
  onClearFilters: () => void;
}

const statusOptions: SelectOption[] = [
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Pending Review",
    value: "Pending Review",
  },
  {
    label: "Needs Follow-Up",
    value: "Needs Follow-Up",
  },
];

function ReportFilters({
  selectedBranch,
  selectedStatus,
  onBranchChange,
  onStatusChange,
  onClearFilters,
}: ReportFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-end">
      {/* Branch Filter */}
      <div className="w-full sm:max-w-xs">
        <Select
          label="Filter by Branch"
          value={selectedBranch}
          placeholder="All branches"
          options={branchOptions}
          onChange={(event) => onBranchChange(event.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div className="w-full sm:max-w-xs">
        <Select
          label="Filter by Status"
          value={selectedStatus}
          placeholder="All statuses"
          options={statusOptions}
          onChange={(event) =>
            onStatusChange(event.target.value as ReportStatus | "")
          }
        />
      </div>

      {/* Clear Filters */}
      <Button
        type="button"
        variant="outline"
        onClick={onClearFilters}
        className="sm:ml-auto"
      >
        Clear Filters
      </Button>
    </div>
  );
}

export default ReportFilters;
