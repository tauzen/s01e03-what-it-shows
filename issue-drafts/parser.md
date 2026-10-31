# Day-first dates are read month-first by the shared parser

**Reports covered:** 379 unique reports merged into #4471, using the desk's exported cause rules.

For a day-first tenant, the shared parser reads the month first, so dates such as 7 April and 4 July can be swapped. This affects reports arriving through app or email, and forms that do not use the misleading booking-v3 hint. See `support-kb/src/lib/kb/causes.ts` and the source reports in `support-kb/src/lib/data/reports-4471.json`.

**Expected:** Parse dates according to the tenant's locale and keep the intended date in the booking and invite.

**Investigate:** Five reports in this group are noted as one-day moves, not ordinary month/day swaps. Review R-41202, R-41209, R-41236, R-41344 and R-41620 individually; their cause is not established. The count above retains them as the current desk logic does.

The export contains overlapping pages: deduplicate by report ID before counting. Intake tags are guesses and are not the grouping rule.
