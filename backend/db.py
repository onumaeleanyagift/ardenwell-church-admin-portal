import sqlite3
from pathlib import Path

# Define the database location.
DATABASE_PATH = Path(__file__).resolve().parent / "ardenwell.db"


def get_db_connection():
    """Create and return a SQLite database connection."""

    connection = sqlite3.connect(DATABASE_PATH)

    # Return database rows as dictionary-like objects.
    connection.row_factory = sqlite3.Row

    return connection


def init_db():
    """Create the reports table if it does not exist."""

    connection = get_db_connection()

    try:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS reports (
                id TEXT PRIMARY KEY,
                branch_name TEXT NOT NULL,
                service_type TEXT NOT NULL,
                service_date TEXT NOT NULL,
                attendance_count INTEGER NOT NULL
                    CHECK(attendance_count >= 0),
                first_timers_count INTEGER NOT NULL
                    CHECK(first_timers_count >= 0),
                notes TEXT DEFAULT '',
                has_urgent_needs INTEGER NOT NULL DEFAULT 0,
                initial_status TEXT NOT NULL
                    CHECK(initial_status IN (
                        'Approved',
                        'Pending Review',
                        'Needs Follow-Up'
                    )),
                status TEXT NOT NULL
                    CHECK(status IN (
                        'Approved',
                        'Pending Review',
                        'Needs Follow-Up'
                    )),
                submitted_at TEXT NOT NULL
            )
        """)

        connection.commit()

    finally:
        connection.close()