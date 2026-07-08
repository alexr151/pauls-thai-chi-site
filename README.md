# Welcome to Paul's Tai Chi Website :)

This is a work in progress

## Letting Paul update the schedule himself

The "Upcoming Sessions" on the home page can be updated from Paul's iPhone via a Google Form, without touching any code. Setup (one-time):

1. **Create a Google Form** named e.g. "Tai Chi Schedule Update" with these questions, in this exact order:
   1. Session 1 – Day/Date (short answer)
   2. Session 1 – Time (short answer)
   3. Session 1 – Location (short answer)
   4. Session 2 – Day/Date (short answer, not required)
   5. Session 2 – Time (short answer, not required)
   6. Session 2 – Location (short answer, not required)
   7. Session 3 – Day/Date (short answer, not required)
   8. Session 3 – Time (short answer, not required)
   9. Session 3 – Location (short answer, not required)
   10. Notes / Announcement (paragraph, not required — e.g. "No class this Saturday, back next week")

   In **Settings → Responses**, make sure **"Require sign-in"** is turned OFF so Paul can submit without a Google account.

2. **Open the linked response Spreadsheet** (Form's Responses tab → the green sheet icon). Click **Share** and set access to **"Anyone with the link" → Viewer**.

3. **Copy the Sheet ID** from the spreadsheet's URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`

4. **Paste that ID into [sessions.js](sessions.js)**, replacing `SHEET_ID = "REPLACE_WITH_YOUR_SHEET_ID"`. If the response tab isn't the first/only sheet in the spreadsheet, also update `GID` to match its `gid` value from the tab's URL.

5. **Commit and push.** The home page will now show whatever was most recently submitted, falling back to the hardcoded default in `index.html` if the form hasn't been used yet or the sheet can't be reached.

6. **Give Paul the form link.** On his iPhone in Safari: open the form link → Share button → **Add to Home Screen**. It'll sit on his home screen like an app icon. Each time something changes, he re-fills the whole form (not just the changed part) with the current full schedule — leaving Session 2/3 blank if there's only one session that week, and using the Notes field for one-off announcements like cancellations.
