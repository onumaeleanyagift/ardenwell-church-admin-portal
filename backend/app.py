import sqlite3
from datetime import date, datetime, timezone
from uuid import uuid4

from flask import Flask, jsonify, request
from flask_cors import CORS

from db import init_db
from reports_repository import (
    create_report,
    get_all_reports,
    update_report_status,
)

from triage import determine_initial_status

app = Flask(__name__)

FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "https://ardenwellchurchhq.vercel.app/",
]

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": FRONTEND_ORIGINS
        }
    }
)

# Convert database report fields to frontend naming conventions.
def serialize_api_report(report):
    return {
        "id": report["id"],
        "branchName": report["branch_name"],
        "serviceType": report["service_type"],
        "serviceDate": report["service_date"],
        "attendanceCount": report["attendance_count"],
        "firstTimersCount": report["first_timers_count"],
        "notes": report["notes"],
        "hasUrgentNeeds": report["has_urgent_needs"],
        "initialStatus": report["initial_status"],
        "status": report["status"],
        "submittedAt": report["submitted_at"],
    }


# Validate incoming report information.
def validate_report_payload(data):
    errors = {}

    if not isinstance(data.get("branchName"), str) or not data["branchName"].strip():
        errors["branchName"] = "Please select a branch."

    if not isinstance(data.get("serviceType"), str) or not data["serviceType"].strip():
        errors["serviceType"] = "Please select a service type."

    service_date = data.get("serviceDate")

    if not isinstance(service_date, str) or not service_date.strip():
        errors["serviceDate"] = "Service date is required."
    else:
        try:
            date.fromisoformat(service_date)
        except ValueError:
            errors["serviceDate"] = "Enter a valid service date."

    attendance = data.get("attendanceCount")

    if (
        isinstance(attendance, bool)
        or not isinstance(attendance, int)
        or attendance < 0
    ):
        errors["attendanceCount"] = (
            "Attendance must be a non-negative whole number."
        )

    first_timers = data.get("firstTimersCount")

    if (
        isinstance(first_timers, bool)
        or not isinstance(first_timers, int)
        or first_timers < 0
    ):
        errors["firstTimersCount"] = (
            "First-timers must be a non-negative whole number."
        )

    notes = data.get("notes", "")

    if not isinstance(notes, str):
        errors["notes"] = "Notes must be valid text."

    urgent_needs = data.get("hasUrgentNeeds", False)

    if not isinstance(urgent_needs, bool):
        errors["hasUrgentNeeds"] = "Urgent needs must be a boolean value."

    return errors


# Health check endpoint.
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "success",
        "message": "Ardenwell API is running"
    }), 200


# Retrieve all reports.
@app.route("/api/reports", methods=["GET"])
def get_reports():
    try:
        reports = get_all_reports()

        return jsonify({
            "reports": [
                serialize_api_report(report)
                for report in reports
            ]
        }), 200

    except sqlite3.Error:
        app.logger.exception("Failed to retrieve reports")

        return jsonify({
            "message": "Unable to retrieve reports at this time."
        }), 500


# Submit a new report.
@app.route("/api/reports", methods=["POST"])
def submit_report():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "message": "A valid JSON request body is required."
        }), 400

    errors = validate_report_payload(data)

    if errors:
        return jsonify({
            "message": "Please correct the submitted information.",
            "errors": errors
        }), 400

    attendance = data["attendanceCount"]
    first_timers = data["firstTimersCount"]
    urgent_needs = data.get("hasUrgentNeeds", False)

    initial_status = determine_initial_status(
        attendance_count=attendance,
        has_urgent_needs=urgent_needs,
        service_type=data["serviceType"],
    )

    report_data = {
        "id": str(uuid4()),
        "branch_name": data["branchName"].strip(),
        "service_type": data["serviceType"].strip(),
        "service_date": data["serviceDate"],
        "attendance_count": attendance,
        "first_timers_count": first_timers,
        "notes": data.get("notes", "").strip(),
        "has_urgent_needs": urgent_needs,
        "initial_status": initial_status,
        "status": initial_status,
        "submitted_at": datetime.now(timezone.utc).isoformat()
    }

    try:
        saved_report = create_report(report_data)

        return jsonify({
            "message": "Report submitted successfully.",
            "report": serialize_api_report(saved_report)
        }), 201

    except sqlite3.Error:
        app.logger.exception("Failed to save report")

        return jsonify({
            "message": "Unable to submit report at this time."
        }), 500


# Update a pending report's status.
@app.route("/api/reports/<report_id>/status", methods=["PATCH"])
def update_report_status_route(report_id):
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "message": "A valid JSON request body is required."
        }), 400

    # Map headquarters actions to report statuses.
    status_by_action = {
        "approve": "Approved",
        "flag": "Needs Follow-Up",
    }

    action = data.get("action")

    if action not in status_by_action:
        return jsonify({
            "message": "Action must be either approve or flag."
        }), 400

    new_status = status_by_action[action]

    try:
        result = update_report_status(report_id, new_status)

        if result is None:
            return jsonify({
                "message": "Report not found."
            }), 404

        if result["conflict"]:
            return jsonify({
                "message": "Only pending reports can be updated."
            }), 409

        return jsonify({
            "message": "Report status updated successfully.",
            "report": serialize_api_report(result["report"]),
        }), 200

    except sqlite3.Error:
        app.logger.exception("Failed to update report status")

        return jsonify({
            "message": "Unable to update report status at this time."
        }), 500


if __name__ == "__main__":
    init_db()

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )