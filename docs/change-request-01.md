# Change Request

**Project:** Student Task Management
**Course:** CSE2552 – Software Configuration Management

| Field | Details |
|-------|---------|
| **Change ID** | CR-01 |
| **Requested by** | <Your name> (Member 2 – SCM Lead) |
| **Date** | 2026-11-02 |
| **Description** | Add a "Clear completed" button that removes all completed tasks in one click. The button is hidden when there are no completed tasks. |
| **Reason** | Users had to delete finished tasks one by one, which is slow as the list grows. |
| **Affected CIs** | CI-01 Source code (`src/index.html`, `src/script.js`); CI-06 Stylesheet (`src/style.css`) |
| **Impact** | Low–Medium. New UI element and function; modifies stored tasks (CI-07) only when the user clicks the button. Existing add/complete/filter behaviour is unchanged. |
| **Priority** | Medium |
| **Approval** |
| **Implementation commit** |
| **Testing result status** |

## Test Results

| Test | Steps | Expected | Status |
|------|-------|----------|--------|
| T1 | Open the app with no completed tasks | "Clear completed" button is hidden | Pass |
| T2 | Tick one or more tasks as done | Button appears | Pass |
| T3 | Click "Clear completed" | Completed tasks removed; active tasks remain; summary and progress bar update | Pass |
| T4 | Reload the page | Cleared tasks stay removed (saved in localStorage) | Pass |
| T5 | Clear while on the Completed filter | Empty message shown, button hidden | Pending |
