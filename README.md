# Car Maintenance Log (Assignment 2 Prototype)

Access the actual pages site I put up to test implementation with the following link: https://kanearo.github.io/car-maintenance-log/
A small browser prototype that implements one feature from my Assignment 1 project: **Record a Maintenance Service**. I can pick a vehicle, enter the service details, save the record, and see it again after refreshing the page. Records are stored in the browser with `localStorage`, so there is no server or database to run.

This is the lightweight prototype of the single-page app planned in Assignment 1. Assignment 1 plans the full app in TypeScript and React; for this single-feature prototype I used plain HTML, CSS, and JavaScript so it runs by just opening a file, with no build step. The same form maps directly to a React component later.

## Setup and Run

1. Download or clone this folder.
2. Open `index.html` in any modern web browser (double-click it, or right-click and Open With a browser).
3. Fill in the maintenance form and click **Save Record**.
4. Refresh the page to confirm the record is still there.
5. Click **Clear Records** to reset to an empty state.

No installation, server, database, or framework is required.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and the maintenance form |
| `styles.css` | Layout and visual styling |
| `script.js` | Validation, saving to `localStorage`, and rendering records |

## Tech

- HTML, CSS, and vanilla JavaScript
- Browser `localStorage` for persistence

## Notes

The full write-up (feature rationale, design artifact, design explanation, implementation reflection, and the verification and validation plan) is in the APA document submitted with this assignment.
