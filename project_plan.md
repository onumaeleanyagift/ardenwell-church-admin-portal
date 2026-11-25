# Project Plan

## 1. Project Overview

The Ardenwell Church Administration Portal helps church headquarters collect and manage service reports from different branches.

Each branch can submit its service details, attendance figures, first-timer count, and any needs that require attention. The system checks each report and assigns an initial status. Headquarters can then review reports, approve them, or flag them for follow-up.

The main goal is to make it easier to track branch activities and view reports from one dashboard.

## 2. Technology Stack

I used the following technologies:

| Area | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Backend | Python, Flask |
| API Support | Flask-CORS |
| Database | SQLite |
| Testing | Python unittest |
| Version Control | Git and GitHub |

I chose this stack because it supports the required features without adding unnecessary complexity.

## 3. Project Structure and Approach

I separated the frontend and backend so each part handles a specific responsibility.

### Frontend

The frontend handles the user interface and communication with the backend.

It includes:

- Dashboard for viewing attendance figures, first-timer counts, and report summaries.
- Report form for submitting branch service reports.
- Reports page for viewing, filtering, and managing submitted reports.
- Reusable components for buttons, cards, badges, form fields, and layout.

I used TypeScript to define the report data structures and catch common errors during development.

### Backend

The backend handles report validation, status assignment, database operations, and report updates.

I separated the main responsibilities into different files:

- `app.py` handles the API routes and request validation.
- `triage.py` contains the rules used to assign report statuses.
- `reports_repository.py` handles database operations.
- `db.py` creates the SQLite database and reports table.
- `tests/` contains the backend tests.

### Database

I used SQLite to store submitted reports. It keeps the project simple and avoids the need to set up a separate database server.

The database stores the branch name, service type, service date, attendance, first-timer count, notes, urgent needs, report status, and submission time.

## 4. Main Features

### Branch Service Report

A branch can submit:

- Branch name
- Service type
- Service date
- Attendance count
- First-timer count
- Notes or prayer requests
- Urgent needs indicator

The frontend and backend both validate submitted data. The system rejects missing required fields and negative or invalid attendance figures.

### Automated Report Triage

The backend assigns an initial status when a report comes in.

The current rules are:

- Urgent needs: Needs Follow-Up.
- Attendance below 100: Needs Follow-Up.
- Youth Fellowship: Pending Review.
- Attendance of 300 or more: Approved.
- Other reports: Pending Review.

The system checks these rules in the order listed above. This means a Youth Fellowship report remains Pending Review even when its attendance reaches 300.

These thresholds are project assumptions for the MVP. They can change when the church defines its reporting requirements.

### Dashboard and Report Management

The dashboard displays attendance totals, first-timer totals, report counts, and report status summaries.

The reports page displays submitted reports and allows users to filter by branch or status.

Headquarters can approve or flag reports that are still pending review. The backend prevents users from changing a report that already has a final status.

## 5. API Routes

The frontend communicates with the backend through these API routes:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Checks whether the backend is running. |
| POST | `/api/reports` | Submits a new branch report. |
| GET | `/api/reports` | Retrieves submitted reports. |
| PATCH | `/api/reports/{id}/status` | Approves or flags a pending report. |

## 6. Development Milestones

I divided the work into these main stages:

1. Project setup: Created the React and Flask projects, installed dependencies, and configured the development environment.
2. Frontend development: Built the dashboard layout, reusable UI components, report form, and reports page.
3. Backend development: Added the Flask API, report validation, status rules, and SQLite storage.
4. Frontend and backend connection: Connected the React interface to the API and tested report submission and retrieval.
5. Report management: Added filtering and the headquarters actions for approving or flagging pending reports.
6. Testing and documentation: Tested the main report workflows and prepared the project documentation.

### Estimated Time Allocation

The assessment gives an estimated working period of four to six hours. I used the following breakdown as a guide:

| Task | Estimated Time |
|---|---:|
| Project setup | 30 minutes |
| Frontend structure and pages | 75 minutes |
| Report form and validation | 60 minutes |
| Backend and SQLite integration | 75 minutes |
| Dashboard data and report management | 60 minutes |
| Testing and documentation | 40 minutes |
| Total | 5 hours 20 minutes |

## 7. Assumptions and Trade-offs

I made a few decisions to keep the project within the assessment scope.

- I used SQLite instead of a separate database server because the assessment does not require a complex database setup.
- I used simple attendance thresholds for automated report triage. The church can adjust these rules later.
- I did not add authentication or role-based access control because the assessment focuses on report submission and management. The headquarters controls in this version are for demonstration and do not provide real access protection.
- I kept the project focused on branch reports, report status management, and dashboard metrics. I did not add unrelated features such as member registration, payments, or event management.
- Dashboard totals cover all reports currently stored in the database because the assessment does not specify a reporting period.

## 8. Testing and Quality Checks

I used Python's `unit-test` framework to test the backend.

The tests cover:

1. Submitting a valid branch report.
2. Assigning Needs Follow-Up when attendance falls below the threshold.
3. Rejecting a report with negative attendance.
4. Rejecting a report with a missing branch name.
5. Approving a pending report.
6. Flagging a pending report.
7. Preventing a report from being updated after it has already received a final status.

I also checked that the frontend builds successfully and tested the main workflows through the application.

## 9. Current Scope

The current version supports local development. The React frontend communicates with the Flask backend running on the same machine.

The project uses the name Ardenwell Church as its sample church name. The name does not represent a real church or organisation.

The current version covers the main requirements in the assessment. Features such as user authentication, permissions, and cloud deployment can be considered separately.