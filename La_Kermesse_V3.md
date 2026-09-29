# LA KERMESSE — V3 / INDEPENDENT RESERVATION SYSTEM

**Implementation brief for Codex · GPT-5.6 Terra High**

## Mission and scope

Upgrade the existing La Kermesse website **in its current project folder**. Preserve the V2 homepage, visual language, food/pizza content, photography, animations, links and responsive experience. **The main V3 work is a complete independent reservation product**: a bespoke French-language customer booking page, a persistent booking backend, and a private staff administration interface. There must be **no DISH iframe, redirect, dependency or falsely simulated booking success**.

Work in the already opened La Kermesse project on the user's D: drive. Verify the actual workspace path before writing. Do not start a replacement project in the C: drive / OneDrive. Create a Git branch or local recovery snapshot before editing. Do not accidentally discard V2 refinements.

### Read these inputs in order
1. This V3 brief — controls new reservation functionality and overrides older DISH directions.
2. Existing project's current `index.html`, `reservation.html`, `styles.css`, `script.js` and other actual files — **inspect before editing**.
3. `BOOKING_VISUAL_REFERENCE.png` — visual *inspiration* from Bar 1806; not source code or a design to copy pixel-for-pixel.
4. `OFFICIAL_LOGO_SOURCE.png` — exact authentic La Kermesse wordmark source; never AI-generate a substitute.
5. Earlier project/content/image briefs if available — keep existing confirmed business facts and identity. V3 instructions supersede their previous reservation approach.

## 1. Frontend art direction

A Bar 1806-inspired booking experience reinterpreted for **La Kermesse**:
- Full-viewport, softly blurred/dimmed photo of the real La Kermesse garden as page background. Reuse supplied original photographs; no generic stock.
- Centered, elegantly proportioned booking panel on desktop; full-width comfortable layout on mobile.
- Retain existing brand tokens: petrol `#0D3442`, night `#06171F`, muted gold `#C6A56A`, restrained cream text and the wordmark's real playful accent colors. Avoid large white blocks.
- Thin rules, considered whitespace, editorial heading typography and clear labels. Use the refined thin double-outline / offset frame CTA treatment established for V2.
- Official logo large near top of panel; not the blue square as an obviously pasted rectangle. If making a transparent-background derivative, **only isolate the supplied exact pixels non-generatively** (alpha mask/manual cleanup). Do not trace with a generative model, retype, redesign, recolor or alter letter shapes. Preserve original source as an untouched asset. If clean isolation is impossible, retain authentic original and explicitly request transparent/vector master from client rather than inventing a logo.
- Keep French copy; mobile-friendly date/time/guest controls; keyboard and screen-reader accessible. Respect `prefers-reduced-motion` and avoid disruptive parallax.
- Keep normal homepage CTA links pointing to our own `reservation.html`.

## 2. True reservation journey

### Step 1 — « Votre table »
- Select booking date, party size and **only server-returned available time slots**; optionally a location preference (jardin / intérieur) only if the client confirms that customers may select it.
- Default party size can be 2 for UI convenience, but **do not invent actual seat capacity, opening hours, service windows or maximum guests**.
- Present unavailable time slots as genuinely unavailable, not decorative choices. Date/time are validated again on server at submission.
- CTA: « Trouver une table » then « Continuer » when a valid available slot is selected.

### Step 2 — « Vos coordonnées »
- Collect first name, last name, email, telephone (with suitable format validation), optional message/special request.
- Show a concise privacy explanation and link to the actual privacy notice; any marketing opt-in must be separate and unchecked.
- Summary card: date, local time, party size, any confirmed zone choice.
- CTA « Confirmer ma réservation » for automatic-confirm mode, or « Envoyer ma demande » for manual-approval mode.
- Loading state prevents duplicate submissions; clear accessible errors and an explicit retry path.

### Step 3 — Result
- Only display a real result **after a successful backend transaction**; show a unique reference and exact persisted state.
- Support a configurable business rule: `AUTO_CONFIRM` (confirmed immediately only when an allocatable table is available) or `MANUAL_APPROVAL` (request pending staff acceptance, reserving capacity as configured).
- Never say « Confirmée » for a pending request; never claim an email was sent if it failed.
- Confirmation/cancellation emails are transactional and reflect the true state. Show a contact number as fallback.
- Allow cancellation through a secure, unguessable, single-purpose tokenized link subject to configurable cancellation rules (which the client must confirm). Do not expose reservation details publicly by sequential IDs.

Suggested concise header: **« On vous garde une table ? »** / « Choisissez votre moment à La Kermesse. »

## 3. Technical stack / architecture

Preserve **HTML5 + CSS3 + vanilla browser JavaScript** for the public website. Because an independent reservation system needs a server, add a **small Node.js + Express API and SQLite database** (e.g. `better-sqlite3`) for a single persistent deployment. If the intended hosting is serverless/ephemeral, use a managed persistent PostgreSQL store instead; **never rely on an ephemeral SQLite file or browser localStorage for reservations**. Document exact hosting/persistence constraints in README. Prefer few dependencies and simple deploys.

Suggested layout (adapt to actual existing project):

```
la-kermesse/
  index.html
  reservation.html
  styles.css
  script.js
  assets/
    images/
      OFFICIAL_LOGO_SOURCE.png     # untouched supplied source
  admin/
    index.html
    admin.css
    admin.js
  server/
    app.js
    db.js
    availability.js
    email.js
    migrations/
    routes/
    middleware/
  tests/
  .env.example
  .gitignore
  README.md
```

Do not expose the database, `.env`, SMTP credentials or private admin files as unrestricted web content. Public and protected routes must be separated appropriately.

### Minimal API contract (adapt implementation details as required)
- `GET /api/public/config` — public supported service settings only (no sensitive internal data).
- `GET /api/availability?date=YYYY-MM-DD&partySize=N[&zone=...]` — real available slots in `Europe/Paris`.
- `POST /api/reservations` — validated and atomically created reservation, with an idempotency key; return reference + status.
- `POST /api/reservations/cancel` — validated secure cancellation token, if policy permits.
- `POST /api/admin/login`, `POST /api/admin/logout`; protected `/api/admin/...` endpoints for bookings/configuration.

### Data model
Implement migrations and structured persistence for:
- staff accounts and roles (at minimum manager/staff)
- tables or explicit seating inventory (`table_id`, label, seats, optional zone, joinable relations only if configured)
- service windows, active weekdays, booking interval, expected dining duration, min lead time, max advance window, party size limit and exceptional closures
- reservations (public unguessable reference, local booking timestamp with UTC persistence, guest data, party size, table assignment(s), state, notes, creation/update timestamps, source)
- reservation status history/audit trail
- transactional email outbox / send status
- cancellation tokens stored hashed, expiry and use state

**Availability must be real:** derive each slot from actual hours, closures, table inventory/valid combinations, seating duration, overlapping reservations, capacity rules, and current time in the `Europe/Paris` timezone (including daylight-saving transitions). The submission route must recalculate availability **inside a write transaction** and allocate capacity atomically. Never permit two concurrent requests to reserve the same capacity. Pending requests must have explicitly configured holding behavior. Allow staff-entered phone bookings/walk-ins so online availability remains accurate.

Do not secretly invent business rules. Provide a visibly labelled demo configuration for local testing; **disable public live confirmation until the client confirms all required settings**.

## 4. Staff dashboard — essential, not optional

Create a password-protected admin UI (not linked as public website navigation) where the restaurant can:
- view today's bookings and a date/week view, with party size, time, guest, contact, status, notes and allocation
- search/filter by guest name, date and status
- approve/decline pending requests, cancel confirmed reservations and manually create/edit bookings with the same availability checks
- maintain table inventory / capacity, opening hours, time-slot duration, expected seating duration, service windows, max party, lead time, booking horizon and exceptional closure dates
- optionally block individual tables or zones for special events and maintenance
- see whether confirmation/notification emails sent or need retry
- get a basic export of bookings (restricted to authorized staff)

Protect admin routes with server-side sessions using secure, HttpOnly, SameSite cookies; password hashing (Argon2id or bcrypt), login rate limiting, authorization checks, CSRF protection where relevant, audit logging and server-side input validation. No hardcoded passwords or production credentials in source files. Initialize first manager securely using a CLI/setup procedure documented in README.

## 5. Transactional emails / notifications

Use one configurable SMTP provider via environment variables, not hardcoded credentials. Email the customer their true reservation state, details and reference. Notify restaurant staff of new bookings, pending requests, changes and cancellations. On temporary SMTP failure, persist a retryable outbox item; do not roll back an otherwise successfully stored reservation just because email delivery failed. Prevent repeated sends when requests are retried. All displayed email outcomes must be truthful.

## 6. Privacy, resilience, security and deployment

- Collect only operationally needed guest data. Set retention/deletion rules with the client; provide privacy/mentions légales placeholders clearly marked for client/legal review. Avoid public exposure of guest lists or sensitive notes. Do not infer that a generic template completes compliance.
- Validate and sanitize on server; parameterized DB queries, sensible payload limits, request throttling, spam trap on public booking form, no client-trusted pricing/availability fields, errors without secrets.
- Use HTTPS in production, secure session storage, CORS/origin restrictions appropriate to same-origin deployment and environment-based configuration.
- Add schema migrations, backed-up persistent database with a documented restore procedure; exclude DB and `.env` from Git.
- Make clear in README how to start locally, configure SMTP, create admin account, test booking emails, deploy, backup/restore and switch out of demo mode.
- Maintain SEO/homepage/Google Map as they currently work. **Do not revisit menu/pizza, homepage copy or color work except for integration consistency.**

## 7. Mandatory test cases / acceptance criteria

Automate where practical and manually verify browser behavior:
1. Responsive booking UI on desktop and narrow mobile, no overflow.
2. Authentic supplied logo displayed (not AI-generated), correct image assets available.
3. Date and time options are generated from configured service windows and are unavailable for closed dates/past slots.
4. No booking can exceed table inventory/party-size configuration.
5. Overlapping bookings occupy capacity for their **full dining duration**, not merely identical start times.
6. Two simultaneous reservations for the last available allocation cannot both succeed.
7. Repeated POST/idempotency key does not create duplicate bookings.
8. AUTO_CONFIRM vs MANUAL_APPROVAL label, email content and statuses are accurate.
9. Staff-created phone booking updates public availability.
10. Authorized cancellation releases held capacity and updates audit/email state; invalid token does not expose data.
11. Login, unauthorized admin API calls, CSRF and rate limiting behave correctly.
12. SMTP failure retains the saved booking and queues a retry without misrepresenting delivery.
13. Timezone and summer/winter DST edge cases handled for Rennes (`Europe/Paris`).
14. Keyboard navigation, input labels, visible focus and reduced-motion settings work.
15. Public Google Map, homepage CTAs, V2 content and existing images continue to work.

If any test cannot be run in your current environment, state exactly which tests were not executed and why; do not claim everything passed without execution. When done, summarize changed files, setup commands, configuration still needed and launch blockers.

## 8. Required client decisions — do not guess

Before production launch, obtain:
- official opening hours and actual reservation service windows (including exceptions)
- number of bookable tables, sizes, combination rules and garden/interior availability
- maximum party size; dining duration, time-slot interval, min advance notice and maximum booking horizon
- instant confirmation vs manager approval; whether pending requests hold inventory and for how long
- cancellation/change policy and whether customers may select garden vs interior
- staff email inbox for alerts, approved SMTP credentials and first manager access
- hosting location, persistence/backup plan, legal business information and privacy/retention review

**A local prototype with clearly identified demo values is allowed. Public acceptance of real reservations before client confirmation is not.**

## 9. Execution sequence (avoid huge single-shot rewrites)

1. Inspect and back up current V2 project; preserve it.
2. Correct authentic logo usage using `OFFICIAL_LOGO_SOURCE.png`.
3. Build polished booking frontend to Bar 1806-inspired visual reference; keep it independent from the legacy DISH flow.
4. Create schema/migrations and configurable seating/service availability engine.
5. Implement API, atomic persistence, idempotency and email outbox.
6. Build protected staff dashboard and settings interface.
7. Connect all flows, add tests and sample development configuration clearly labelled `DEMO ONLY`.
8. Run the tested application locally, report results and clearly identify information needed before deployment.

**Definition of done:** A real, navigable booking experience connected to persistent reservation storage and controllable by staff, with truthful confirmation status and no dependence on DISH. A static mock-up does not satisfy V3.
