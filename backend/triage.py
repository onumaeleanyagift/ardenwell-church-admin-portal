SPECIAL_REVIEW_SERVICE_TYPES = {
    "youth-fellowship",
}

LOW_ATTENDANCE_THRESHOLD = 100
APPROVAL_ATTENDANCE_THRESHOLD = 300


def determine_initial_status(
    attendance_count: int,
    has_urgent_needs: bool,
    service_type: str,
) -> str:
    """
    Determine the initial status of a submitted report.

    Rules:
    - Attendance below 100: Needs Follow-Up.
    - Urgent branch needs: Needs Follow-Up.
    - Special services: Pending Review.
    - Attendance of 300 or more: Approved.
    - Other reports: Pending Review.
    """

    if has_urgent_needs:
        return "Needs Follow-Up"

    if attendance_count < LOW_ATTENDANCE_THRESHOLD:
        return "Needs Follow-Up"

    if service_type in SPECIAL_REVIEW_SERVICE_TYPES:
        return "Pending Review"

    if attendance_count >= APPROVAL_ATTENDANCE_THRESHOLD:
        return "Approved"

    return "Pending Review"