from typing import Any

from db import get_db_connection


def serialize_report(row) -> dict[str, Any]:
    """Convert a database row into a JSON-friendly dictionary."""

    report = dict(row)

    report["has_urgent_needs"] = bool(report["has_urgent_needs"])

    return report


def create_report(report: dict[str, Any]) -> dict[str, Any]:
    """Save a new service report in the database."""

    connection = get_db_connection()

    try:
        connection.execute(
            """
            INSERT INTO reports (
                id,
                branch_name,
                service_type,
                service_date,
                attendance_count,
                first_timers_count,
                notes,
                has_urgent_needs,
                initial_status,
                status,
                submitted_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                report["id"],
                report["branch_name"],
                report["service_type"],
                report["service_date"],
                report["attendance_count"],
                report["first_timers_count"],
                report.get("notes", ""),
                int(report["has_urgent_needs"]),
                report["initial_status"],
                report["status"],
                report["submitted_at"],
            ),
        )

        connection.commit()

        saved_report = connection.execute(
            "SELECT * FROM reports WHERE id = ?",
            (report["id"],),
        ).fetchone()

        return serialize_report(saved_report)

    finally:
        connection.close()


def get_all_reports() -> list[dict[str, Any]]:
    """Retrieve all service reports, newest submissions first."""

    connection = get_db_connection()

    try:
        rows = connection.execute(
            """
            SELECT *
            FROM reports
            ORDER BY submitted_at DESC
            """
        ).fetchall()

        return [serialize_report(row) for row in rows]

    finally:
        connection.close()


def update_report_status(
    report_id: str,
    new_status: str
) -> dict[str, Any] | None:
    """Update the status of a pending report."""

    connection = get_db_connection()

    try:
        existing_report = connection.execute(
            """
            SELECT *
            FROM reports
            WHERE id = ?
            """,
            (report_id,),
        ).fetchone()

        if existing_report is None:
            return None

        # Only pending reports can receive an administrative decision.
        if existing_report["status"] != "Pending Review":
            return {
                "conflict": True,
                "report": serialize_report(existing_report),
            }

        connection.execute(
            """
            UPDATE reports
            SET status = ?
            WHERE id = ?
            """,
            (new_status, report_id),
        )

        connection.commit()

        updated_report = connection.execute(
            """
            SELECT *
            FROM reports
            WHERE id = ?
            """,
            (report_id,),
        ).fetchone()

        return {
            "conflict": False,
            "report": serialize_report(updated_report),
        }

    finally:
        connection.close()