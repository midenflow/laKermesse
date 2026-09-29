# LA KERMESSE — MASTER CODEX MESSAGE

You are building the first production-ready website for **La Kermesse Rennes**.

Read and use **all attached files together**. Do not ignore any of them.

## ATTACHED FILES TO USE
1. `LA_KERMESSE_CODEX_PROMPT.md`
2. `LA_KERMESSE_PROJECT_BRIEF.md`
3. `LA_KERMESSE_MENU_SOURCE.md`
4. `LA_KERMESSE_CODEX_ASSET_PACK.zip`

Inside the ZIP, also use:
- `LA_KERMESSE_IMAGE_USAGE_PROMPT.md`
- `image_manifest.json`
- `LA_KERMESSE_IMAGE_CONTACT_SHEET.html`
- `/images/...` all supplied visual assets

---

## EXECUTION ORDER

Follow this exact order:

### STEP 1 — FOUNDATION
Read `LA_KERMESSE_CODEX_PROMPT.md` first.
This is the **main implementation brief** and the primary source of truth for:
- stack
- page structure
- UX direction
- visual direction
- reservation logic
- responsiveness
- SEO basics
- quality standard

### STEP 2 — CONTENT & FACTS
Read `LA_KERMESSE_PROJECT_BRIEF.md`.
Use it as the main source for:
- business identity
- address
- phone
- story / positioning
- confirmed facts
- practical website constraints
- things that must NOT be invented

Then read `LA_KERMESSE_MENU_SOURCE.md`.
Use it as the source for:
- lunch menu section
- pricing
- food wording
- menu preview content
Do not invent extra dishes, cocktails, prices or policies beyond what is confirmed.

### STEP 3 — IMAGE DIRECTION
Unzip and inspect `LA_KERMESSE_CODEX_ASSET_PACK.zip`.

Read `LA_KERMESSE_IMAGE_USAGE_PROMPT.md` carefully.
This is the source of truth for:
- which image belongs in which section
- which image is the hero
- which image is for events, atmosphere, indoor, gallery, etc.
- how images should animate
- how images should be cropped
- how they should be placed creatively and intentionally

Use `image_manifest.json` as the structured asset map.
Use `LA_KERMESSE_IMAGE_CONTACT_SHEET.html` to visually understand the image roles at a glance.

Do not place images randomly.
Treat the photo usage as art direction, not simple content filling.

---

## WHAT TO BUILD

Build a responsive static website using only:
- HTML
- CSS
- Vanilla JavaScript

Create:
- `index.html`
- `reservation.html`
- `styles.css`
- `script.js`
- an `/assets/` or `/images/` structure that cleanly organizes the final assets

The site language must be **French**.

---

## WEBSITE GOAL

The website must do 2 things extremely well:

### 1. Sell the venue visually
It must immediately communicate:
- hidden garden
- warm neighborhood atmosphere
- bar / restaurant / terrace identity
- relaxed but refined personality
- social and event-friendly vibe

### 2. Convert toward reservation
The website must guide users naturally toward booking.
Reservation is a priority.

---

## VISUAL PRIORITIES

This must **not** look like a generic restaurant template.

The first impression should feel:
- editorial
- atmospheric
- hospitality-grade
- image-led
- elegant but not pretentious
- playful in subtle ways because of La Kermesse’s identity

Use the deep blue/petrol tone from the brand as the dominant color base.
Support it with:
- charcoal / dark tones
- warm cream text/background accents
- restrained gold accents
- occasional small playful color touches inspired by the logo

Typography and composition should be mainly inspired by the mood of **Death & Co**, while still being original.

---

## IMAGE USAGE — NON-NEGOTIABLE

Follow the image placement instructions exactly.

### Required image logic:
- sunset crowd terrace image = primary homepage hero
- hidden-garden daytime images = “Le Jardin Caché” section
- DJ booth image = events / programmation section
- indoor room + arcade machine = supporting interior/personality section
- panoramic terrace image = wide editorial strip or immersive break
- gallery = curated, asymmetrical, not repetitive

### Required visual treatment:
- subtle fade-in / upward reveal
- staggered reveals where useful
- gentle hover zooms in gallery only
- refined borders or frames where appropriate
- tasteful overlays when text sits on images
- no random cropping
- no image dumping
- no heavy-handed animation

---

## RESERVATION PAGE — OPERATIONAL REQUIREMENT

The restaurant currently uses:
`https://reservation.dish.co/shortlink/336941`

This must be handled honestly.

Build a branded reservation page inspired by OpenTable / CoverManager, but do **not** fake a reservation system.

Preferred behavior:
1. Try a clean embedded DISH reservation iframe
2. If embedding is blocked, show a clean fallback card/button:
   `Continuer la réservation`
   which opens the official DISH booking page in a new tab
3. Also provide:
   `Réserver par téléphone — 09 82 68 44 17`

Do not simulate booking success locally if there is no real booking submission.

---

## MAP REQUIREMENT

On the homepage, integrate a **real interactive Google Maps embed** near the bottom of the page for:

**121 Rue de Vern, 35200 Rennes, France**

Requirements:
- zoomable
- pannable
- responsive
- smooth visual integration into the overall design
- include an external “Open in Google Maps” fallback link/button

Do not use a static screenshot for the map.

---

## IMPORTANT RESTRICTIONS

Do NOT invent:
- current owners / managers
- exact opening hours unless clearly marked as to be confirmed
- cocktail names or prices
- evening tapas items or prices unless confirmed
- cancellation policies
- group booking policies
- email addresses
- legal business data that has not been supplied
- event dates that are not real

If information is unconfirmed, structure the code so it is easy to update later.

---

## QUALITY BAR

The final result should feel like a real custom hospitality website.

The site should:
- feel premium enough to impress a client
- feel operational enough to actually use
- look strong on desktop and mobile
- use the supplied imagery as a competitive advantage
- make the hidden garden unforgettable
- convert clearly toward reservation

Avoid:
- generic SaaS feel
- cookie-cutter template sections
- over-designed luxury clichés
- weak typography
- random stock-like image placement

---

## FINAL DELIVERABLE EXPECTATION

Produce the complete frontend code and file structure for the site.

Make the output implementation-ready and clean.

If you need to make small assumptions for layout or placeholder microcopy, keep them aligned with the brand and the attached documents.

Most importantly:
**combine the implementation brief, research brief, menu source and image-usage pack into one coherent website system.**
