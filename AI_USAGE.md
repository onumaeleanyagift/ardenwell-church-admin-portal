# AI Usage

## 1. AI Tools Used

I used ChatGPT as a development assistant while building the Ardenwell Church Administration Portal.

I used it to:

- Plan the project structure and separate the frontend from the backend.
- Work through React and TypeScript components.
- Connect the React frontend to the Flask API.
- Review form validation and report status rules.
- Implement pagination and improve input validation.
- Understand and write backend tests.
- Troubleshoot errors during development.
- Understand commands and review suggested code before running them.

I used ChatGPT to support the development process, but I reviewed the suggestions, ran the code, and tested the application myself.

## 2. Areas Where I Used AI

| Project Area | How I Used AI |
|---|---|
| Project setup | Discussed the project structure, dependencies, and development environment. |
| Frontend | Worked through reusable components, page layouts, and TypeScript implementation. |
| Backend | Worked through Flask routes, request validation, and SQLite integration. |
| Report triage | Reviewed the rules for assigning initial report statuses. |
| Testing | Developed test cases for report submission, validation, and status updates. |
| Pagination | Implemented report pagination and handled filter changes. |
| Troubleshooting | Investigated errors and checked possible fixes. |
| Documentation | Prepared the project plan, AI usage documentation, and README instructions. |

## 3. Example of AI-Generated Code That Needed Fixing

During backend development, I encountered a problem with the report triage function.

One of the AI-generated suggestions introduced another `determine_initial_status()` function in `app.py`, even though I had already imported that function from `triage.py`.

The new function had a different set of arguments and did not accept the `service_type` argument used when submitting a report. Its definition also replaced the imported function in the module.

When I ran the backend tests, some tests failed with this error:

```text
TypeError: determine_initial_status() got an unexpected keyword argument 'service_type'
```

## 4. How I Found and Fixed It

I checked the error message and compared the function definition with the arguments passed from the report submission route.

I also inspected the function signature to confirm which version the application was calling.

I found that the duplicate function in `app.py` was overriding the imported function from `triage.py`.

I removed the duplicate function and its outdated threshold definition. This left `triage.py` as the single source of truth for the report status rules.

After the change, I ran the backend tests again. All seven tests passed.

This experience helped me understand why keeping business rules in one place matters. It also reminded me to check AI-generated code carefully instead of assuming that a suggested implementation will work.

## 5. How I Checked AI-Generated Code

I followed a few steps when working with AI-generated code:

1. I reviewed the suggested code before adding it to the project.
2. I asked questions when I did not understand a command or implementation.
3. I ran the application to check how the changes behaved.
4. I used tests to check important backend operations and input validation.
5. When an error occurred, I checked the error message and traced it back to the relevant code before applying a fix.

ChatGPT helped me work through the project, but I remained responsible for understanding, reviewing, and testing the code I submitted.