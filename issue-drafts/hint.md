# Booking-v3 shows a month-first date hint for day-first tenants

**Reports covered:** 33 unique reports merged into #4471, using the desk's exported cause rules.

Booking-v3 displays `MM/DD/YYYY`, but reads the date in the day-first tenant's order. People following the hint can enter a different date than the one the form interprets. This is separate from the shared month-first parser issue. See `support-kb/src/lib/kb/causes.ts` and the source reports in `support-kb/src/lib/data/reports-4471.json`.

**Expected:** The hint and the form's interpretation both match the tenant's locale, and the saved booking and invite match the date entered.

The export contains overlapping pages: deduplicate by report ID before counting. Intake tags are guesses and are not the grouping rule.
