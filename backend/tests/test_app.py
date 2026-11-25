import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import app as flask_app
import db


class ReportApiTests(unittest.TestCase):

    def setUp(self):
        # Create an isolated temporary database for each test.
        self.temp_directory = tempfile.TemporaryDirectory()

        self.database_patcher = patch.object(
            db,
            "DATABASE_PATH",
            Path(self.temp_directory.name) / "test.db"
        )

        self.database_patcher.start()

        db.init_db()

        flask_app.app.config["TESTING"] = True

        self.client = flask_app.app.test_client()

    def tearDown(self):
        self.database_patcher.stop()
        self.temp_directory.cleanup()

    def get_valid_payload(self):
        return {
            "branchName": "ikeja",
            "serviceType": "sunday-service",
            "serviceDate": "2026-11-25",
            "attendanceCount": 150,
            "firstTimersCount": 12,
            "notes": "Regular Sunday service.",
            "hasUrgentNeeds": False,
        }

    def test_valid_report_submission(self):
        """A valid report should be saved successfully."""

        response = self.client.post(
            "/api/reports",
            json=self.get_valid_payload()
        )

        self.assertEqual(response.status_code, 201)

        data = response.get_json()
        report = data["report"]

        self.assertEqual(report["branchName"], "ikeja")
        self.assertEqual(report["attendanceCount"], 150)
        self.assertEqual(report["initialStatus"], "Pending Review")

        # Confirm that the report was actually persisted.
        get_response = self.client.get("/api/reports")

        self.assertEqual(get_response.status_code, 200)
        self.assertEqual(len(get_response.get_json()["reports"]), 1)

    def test_low_attendance_triggers_follow_up(self):
        """Attendance below the threshold should trigger follow-up."""

        payload = self.get_valid_payload()
        payload["attendanceCount"] = 40

        response = self.client.post(
            "/api/reports",
            json=payload
        )

        self.assertEqual(response.status_code, 201)

        report = response.get_json()["report"]

        self.assertEqual(
            report["initialStatus"],
            "Needs Follow-Up"
        )

    def test_negative_attendance_is_rejected(self):
        """Negative attendance should fail validation."""

        payload = self.get_valid_payload()
        payload["attendanceCount"] = -5

        response = self.client.post(
            "/api/reports",
            json=payload
        )

        self.assertEqual(response.status_code, 400)

        errors = response.get_json()["errors"]

        self.assertIn("attendanceCount", errors)

        # Invalid reports must not enter the database.
        get_response = self.client.get("/api/reports")

        self.assertEqual(len(get_response.get_json()["reports"]), 0)

    def test_missing_branch_is_rejected(self):
        """A report without a branch should fail validation."""

        payload = self.get_valid_payload()
        payload["branchName"] = ""

        response = self.client.post(
            "/api/reports",
            json=payload
        )

        self.assertEqual(response.status_code, 400)

        errors = response.get_json()["errors"]

        self.assertIn("branchName", errors)

    def test_headquarters_can_approve_pending_report(self):
        payload = self.get_valid_payload()

        response = self.client.post("/api/reports", json=payload)
        report = response.get_json()["report"]

        update_response = self.client.patch(
            f"/api/reports/{report['id']}/status",
            json={"action": "approve"}
        )

        self.assertEqual(update_response.status_code, 200)

        updated_report = update_response.get_json()["report"]

        self.assertEqual(updated_report["status"], "Approved")
        self.assertEqual(updated_report["initialStatus"], "Pending Review")


    def test_headquarters_can_flag_pending_report(self):
        payload = self.get_valid_payload()

        response = self.client.post("/api/reports", json=payload)
        report = response.get_json()["report"]

        update_response = self.client.patch(
            f"/api/reports/{report['id']}/status",
            json={"action": "flag"}
        )

        self.assertEqual(update_response.status_code, 200)

        updated_report = update_response.get_json()["report"]

        self.assertEqual(
            updated_report["status"],
            "Needs Follow-Up"
        )


    def test_already_decided_report_cannot_be_updated_again(self):
        payload = self.get_valid_payload()

        response = self.client.post("/api/reports", json=payload)
        report = response.get_json()["report"]

        self.client.patch(
            f"/api/reports/{report['id']}/status",
            json={"action": "approve"}
        )

        update_response = self.client.patch(
            f"/api/reports/{report['id']}/status",
            json={"action": "flag"}
        )

        self.assertEqual(update_response.status_code, 409)


if __name__ == "__main__":
    unittest.main()