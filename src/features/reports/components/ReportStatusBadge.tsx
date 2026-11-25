import Badge from "../../../components/ui/Badge";
import type { ReportStatus } from "../types";

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

const statusVariants: Record<ReportStatus, "success" | "warning" | "danger"> = {
  Approved: "success",
  "Pending Review": "warning",
  "Needs Follow-Up": "danger",
};

function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  return <Badge variant={statusVariants[status]}>{status}</Badge>;
}

export default ReportStatusBadge;
