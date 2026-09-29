# CODEX BUILD PROMPT — LA KERMESSE RENNES

You are building the first production-ready frontend for **La Kermesse**, a Rennes bar-restaurant / guinguette.

## STACK
Use only:
- HTML5
- CSS3
- Vanilla JavaScript

No React, no framework, no build dependency unless absolutely unavoidable.
The result must be clean, maintainable, responsive and easy to deploy as a static site.

## LANGUAGE
All customer-facing website copy must be in **French**.

## PAGES
Build exactly:
1. `index.html` — homepage
2. `reservation.html` — booking page

Also create:
- `styles.css`
- `script.js`
- `/assets/` structure with clearly named placeholders for supplied restaurant images
- optional small `data/menu.js` or JSON only if it improves maintainability

## BRAND / ART DIRECTION
La Kermesse already has a recognizable deep teal/petrol-blue identity.
The website should feel:
- atmospheric
- modern
- playful but refined
- premium without becoming luxury/corporate
- highly visual and photography-led

Palette:
- dominant deep teal / petrol blue inspired by the logo/background
- charcoal / near-black
- cream / warm off-white
- restrained muted-gold accents
- tiny touches of the logo’s playful multicolor palette only where tasteful

Typography / layout direction:
- strongly inspired by the editorial mood, spacing and typography of Death & Co
- use a sophisticated display serif for headings and a clean sans-serif for body/UI
- do NOT copy another site’s exact layout, assets or code
- visual references: Death & Co, 1806, Coso Ristorante, Librairie Rennes
- avoid generic template cards, excessive rounded rectangles, gradients everywhere, glassmorphism, or SaaS-looking components

## RESPONSIVE
Must be carefully designed for:
- desktop
- tablet
- mobile
Mobile must feel intentionally designed, not merely stacked.

## HOMEPAGE
Recommended flow:

### 1. HEADER
- La Kermesse logo/wordmark area
- navigation: La Kermesse / Le Jardin / La Carte / Événements / Infos
- prominent `Réserver` CTA linking to `reservation.html`
- mobile menu

### 2. HERO
Use one of the strongest supplied terrace/garden images as a large cinematic hero.
Suggested copy:
Eyebrow: `BAR · RESTAURANT · JARDIN`
Headline: `Votre parenthèse à Rennes.`
Supporting line: `Un bistrot de quartier, un grand jardin caché, une cuisine conviviale et des soirées qui se prolongent.`
Primary CTA: `Réserver une table`
Secondary CTA: `Découvrir La Kermesse`

Use subtle image darkening for legibility. Motion should be elegant and restrained.

### 3. STORY
Heading: `Un lieu de vie derrière la rue de Vern`
Copy:
`Installée à Rennes depuis 2023, La Kermesse cache derrière sa façade un grand jardin arboré où l’on vient déjeuner, partager des tapas, boire un verre et profiter des rendez-vous de la maison.`

Add a short historical note but DO NOT publish founder/current-owner names because management may have changed.

### 4. LE JARDIN CACHÉ
Make this one of the strongest sections.
Use wide terrace imagery, alternating editorial layout and large typography.
Highlight:
- palmiers / végétation
- transats
- grande terrasse
- ambiance guinguette urbaine
- moments en famille ou entre amis

### 5. À TABLE
Introduce seasonal/simple/homemade-style cooking.
Include three editorial feature blocks:
- `Le midi`
- `Le soir`
- `À partager`

Add a menu preview using the verified supplied lunch-menu data from `LA_KERMESSE_MENU_SOURCE.md`.
Label it clearly as an example/current menu and make the component easy to update.

### 6. ATMOSPHÈRE / EVENTS
Visual section about DJ sets, concerts, blind tests, stand-up/improv/sports nights.
Do not hard-code fake upcoming event dates.
Use wording such as:
`La programmation évolue au fil des semaines — suivez-nous sur Instagram pour les prochains rendez-vous.`

CTA to Instagram.

### 7. GALLERY
Build a polished masonry/editorial gallery using the supplied venue images.
Optimize via `loading="lazy"` below the fold.
Add tasteful hover/reveal interactions.
Do not crop every image identically.

### 8. RESERVATION CTA
High-contrast band:
`Une table au jardin ?`
`Réservez votre moment à La Kermesse.`
Button => `reservation.html`
Secondary phone CTA => `09 82 68 44 17`

### 9. PRACTICAL INFO
Show:
- `121 Rue de Vern, 35200 Rennes`
- `09 82 68 44 17`
- Instagram `@la_kermesse_rennes`

Opening hours:
Do NOT publish unverified hours as factual.
Create an obvious placeholder/config block in code with a comment:
`// Replace after client confirms current opening hours`
For the visible prototype, label the area `Horaires — à confirmer`.

### 10. INTERACTIVE GOOGLE MAP
Near the bottom of the homepage, embed an interactive Google Maps window centered on:
`121 Rue de Vern, 35200 Rennes, France`

Requirements:
- user can pan the map
- zoom in/out
- map remains interactive
- responsive
- approximately the visual role used on whitefields-cafe.com
- integrate smoothly into the site with a section heading and address
- no screenshot/static map
- prefer a standard Google Maps embed iframe that works without exposing an API key
- include a text/button fallback to open Google Maps externally

### 11. FOOTER
Must contain exactly:
`©2027 La-Kermesse-Rennes - All rights reserved.  By : midenflow.com`

Make `midenflow.com` clickable.

## RESERVATION PAGE
This page is the main operational priority.

Visual inspiration:
- OpenTable reservation flow
- CoverManager
But fully branded as La Kermesse.

Create a focused, premium reservation experience:
- title: `Réserver votre table`
- short reassurance text
- step/progress UI
- party size selector
- date selector
- time/service area
- contact details explanation
- mobile-first usability
- clear phone fallback

### CRITICAL BOOKING RULE
The restaurant currently uses:
`https://reservation.dish.co/shortlink/336941`

Do NOT create a fake local reservation system and do NOT display a fake success state.

First attempt a clean embedded DISH reservation iframe inside the branded booking page.

Implementation requirements:
- responsive iframe container
- loading state
- accessible title
- if DISH blocks iframe embedding, reveal a fallback card/button:
  `Continuer la réservation`
  opening the official DISH URL in a new tab
- phone fallback:
  `Réserver par téléphone — 09 82 68 44 17`

If you cannot reliably prefill DISH from the custom selectors without an official supported API, do not pretend to do so. In that case, keep the branded intro/step UI minimal and hand off transparently to DISH.

## UX / ACCESSIBILITY
- semantic HTML
- keyboard-accessible navigation and controls
- visible focus states
- proper alt text placeholders
- respect `prefers-reduced-motion`
- strong color contrast
- no autoplay audio/video
- no intrusive popups

## PERFORMANCE
- lazy-load non-hero images
- use `object-fit` carefully
- minimize JS
- no giant libraries
- smooth but lightweight transitions
- prepare for WebP/AVIF assets
- reserve image dimensions to reduce layout shift

## SEO BASICS
Homepage:
- title: `La Kermesse Rennes | Bar, Restaurant & Jardin`
- meta description in French mentioning restaurant, bar à tapas, garden/terrace and Rue de Vern
- LocalBusiness/Restaurant JSON-LD using only confirmed data
- Open Graph basics
- canonical placeholders only if domain is unknown

## CONTENT FACTS
Use only these confirmed/researched facts:
- La Kermesse
- 121 Rue de Vern, 35200 Rennes, France
- +33 9 82 68 44 17
- Instagram: @la_kermesse_rennes
- opened at this location as La Kermesse in 2023
- bar-restaurant / tapas / large planted garden / terrace
- reservation link is DISH above

Use `LA_KERMESSE_PROJECT_BRIEF.md` and `LA_KERMESSE_MENU_SOURCE.md` as content source files.

Do not invent:
- current owners
- current Sunday brunch status
- exact current hours
- cocktail names/prices
- tapas item names/prices
- allergens
- policies
- emails
- event dates

## FINAL QUALITY BAR
The first viewport must immediately feel like a real hospitality brand, not a generated template.
The site should visually sell the hidden garden and convivial atmosphere first, then convert toward reservations.
Aim for refined editorial composition, strong image hierarchy, excellent typography and smooth transitions.
