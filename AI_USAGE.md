# AI Usage

## 1. AI Tools Used

I used ChatGPT as a development assistant while working on the Ardenwell Church Administration Portal.

I used it to:

- Discuss the project structure and how to separate the frontend and backend.
- Work through React and TypeScript components.
- Understand how to connect the frontend to the Flask API.
- Review validation and report status logic.
- Help write and understand backend tests.
- Troubleshoot errors during development.
- Review commands and explain what they do before I ran them.

I used AI to support my work, but I still reviewed the code, ran the commands, checked the results, and tested the application myself.

## 2. Parts of the Project Where I Used AI

I used ChatGPT at different stages of development.

| Project Area | How I Used AI |
|---|---|
| Project setup | Helped me understand the setup process and dependencies. |
| Frontend | Assisted with reusable components, page structure, and TypeScript implementation. |
| Backend | Helped with Flask routes, request validation, and SQLite integration. |
| Report triage | Helped implement and review the rules for assigning report statuses. |
| Testing | Helped structure test cases for report submission and status updates. |
| Troubleshooting | Helped investigate errors and understand their causes. |
| Documentation | Assisted with preparing the project plan and setup instructions. |

## 3. Example of AI-Generated Code That Needed Fixing

During backend development, I encountered a problem with the report triage function.

The application already had a `determine_initial_status()` function in `triage.py`. However, another function with the same name appeared in `app.py`.

The duplicate function took different arguments and did not support the `service_type` argument used when creating a report.

When I ran the backend tests, some tests failed with this error:

```text
TypeError: determine_initial_status() got an unexpected keyword argument 'service_type'
```

This showed that the application was calling a function that did not accept the arguments being passed to it.

## 4. How I Found and Fixed It

I checked the function definition and compared it with the arguments used in the report submission route.

I also inspected the function signature to confirm which version of the function the application was using.

I found that the duplicate function in `app.py` was overriding the imported function from `triage.py`.

I removed the duplicate function and its outdated threshold definition. The application then used the central triage function in `triage.py`.

After making the change, I ran the tests again. All seven backend tests passed.

This helped me understand why keeping one source of truth for business rules matters. It also showed me why I should test AI-generated code instead of assuming it will work as expected.

## 5. How I Checked AI-Generated Code

I followed a simple process when working with AI-generated code:

1. I reviewed the suggested code before adding it to the project.
2. I asked questions when I did not understand a command or implementation.
3. I ran the application and checked how the changes behaved.
4. I used tests to check important backend operations and validation rules.
5. When an error occurred, I checked the code and error message before applying a fix.

AI helped me move through the development process, but I remained responsible for understanding and testing the code in the project.