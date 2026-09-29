# LA KERMESSE — Website Project Brief
Last research pass: 23 September 2026

## 1. Core identity
- Name: La Kermesse
- Type: bar-restaurant / bar à tapas / guinguette de quartier
- Address: 121 Rue de Vern, 35200 Rennes, France
- Phone: +33 9 82 68 44 17
- Instagram: @la_kermesse_rennes
- Reservation platform: DISH Reservation
- Public positioning: relaxed, family-friendly neighborhood venue with a large hidden garden/terrace, seasonal homemade food, tapas, drinks and events.

## 2. History / story
- La Kermesse opened in June 2023 in the former Teddy's premises at 121 Rue de Vern.
- Historical local coverage says it was launched by Jean-Alexis Lavaud, Yannick Marrec and François Pelé.
- The venue was redesigned around a convivial neighborhood-bar concept with a large planted garden.
- IMPORTANT: a recent 2026 public review mentions a “nouvelle patronne”, so current ownership/management should be confirmed with the client before publishing names on the new site.

Suggested website-safe story:
“La Kermesse est un lieu de vie rennais installé rue de Vern depuis 2023. Derrière sa façade se cache un grand jardin arboré, pensé comme une parenthèse conviviale où l’on vient déjeuner, partager des tapas, boire un verre et profiter des événements de la maison.”

## 3. Strongest selling points for the homepage
- Large hidden garden / terrace (“jungle urbaine” feel)
- Palm trees, banana trees, fig tree and greenery
- Casual, warm, multigenerational atmosphere
- Seasonal, simple, homemade-style cooking
- Lunch menu
- Tapas in the evening
- Drinks: wine, cocktails, beers, including local draft beers; non-alcoholic options have been mentioned in recent reviews
- Events historically include DJ sets, concerts, stand-up, improv, blind tests and major sports broadcasts
- Games / leisure atmosphere; photos show arcade/darts-style entertainment and outdoor seating
- Reservations are a core conversion goal

## 4. Current public contact information
- 121 Rue de Vern, 35200 Rennes
- +33 9 82 68 44 17
- Instagram: https://www.instagram.com/la_kermesse_rennes/?hl=fr
- Current booking link: https://reservation.dish.co/shortlink/336941

## 5. Opening hours — DO NOT hard-code before client confirmation
Public sources conflict.
Recent Google/Restaurant Guru data currently shows:
- Mon: 09:00–00:00
- Tue: 09:00–00:00
- Wed: 09:00–00:00
- Thu: 09:00–01:00
- Fri: 09:00–01:00
- Sat: 17:00–01:00
- Sun: closed

Other 2025–2026 editorial sources still mention Sunday lunch/brunch and different service hours.
=> Ask client for definitive current hours before production.

## 6. Reservation UX
Existing DISH flow requests:
- party/date/time/service selection
- first name
- last name
- email
- phone
- optional message
- acceptance of terms/privacy

Recommended implementation for the first HTML/CSS/JS version:
- Build a branded La Kermesse reservation page inspired by OpenTable/CoverManager.
- Keep the custom UI purely presentational unless there is a supported DISH API.
- Operational path: embed DISH Reservation in an iframe if DISH allows framing.
- If framing is blocked, use a prominent “Réserver maintenant” button that opens the official DISH booking page in a new tab.
- Do not fake successful bookings locally.
- Add phone reservation fallback.

## 7. Map
Embed an interactive Google Map near the bottom of the homepage:
121 Rue de Vern, 35200 Rennes, France
Requirements:
- interactive pan
- zoom controls
- clickable/open in Google Maps
- responsive full-width container
- styled to blend into dark/blue/gold website theme

## 8. Visual direction
Primary palette:
- deep teal / petrol blue sampled from La Kermesse branding
- near-black / charcoal
- warm muted gold accents
- off-white / cream for readable text

Style:
- editorial, atmospheric, premium-but-not-pretentious
- Death & Co-inspired typography and spacing
- large photography
- refined serif/display headings + clean sans-serif body text
- smooth reveal animations, subtle parallax/hover motion only
- avoid generic restaurant-template cards
- retain La Kermesse's playful multicolor identity as small accents, not as the dominant palette

## 9. Homepage structure
1. Header / logo / nav / primary “Réserver” CTA
2. Full-bleed hero using terrace/garden photography
3. Short story / identity section
4. “Le jardin caché” visual feature section
5. Food / lunch / tapas feature
6. Current menu preview + CTA
7. Events / atmosphere
8. Gallery
9. Reservation CTA band
10. Practical info / hours / phone / Instagram
11. Interactive Google Map
12. Footer

Footer exact text requested:
©2027 La-Kermesse-Rennes - All rights reserved.  By : midenflow.com

## 10. Must-confirm with client before launch
- current owners/management names
- definitive opening hours
- whether Sunday brunch still exists
- complete/current lunch menu
- complete evening tapas menu
- drinks/cocktail menu
- allergies/dietary information
- booking rules: max party size, advance booking window, grace period, cancellation/no-show policy
- terrace vs indoor booking availability
- group/private-event policy
- email address
- legal business information for Mentions légales / privacy
- accessibility information
- whether events schedule should be dynamic
