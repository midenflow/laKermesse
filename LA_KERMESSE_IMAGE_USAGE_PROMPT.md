# LA KERMESSE — IMAGE USAGE & PLACEMENT PROMPT FOR CODEX

Use this file together with:
- `LA_KERMESSE_CODEX_PROMPT.md`
- `LA_KERMESSE_PROJECT_BRIEF.md`
- `LA_KERMESSE_MENU_SOURCE.md`

This document is specifically about **how to use the provided images correctly**, in a deliberate editorial way, and **not randomly**.

---

## 1) Core rule

The website must feel like a **designed hospitality brand website**, not a generated template and not a random photo dump.

The image system must:
- make the hidden garden feel like the main attraction
- use images intentionally by section
- preserve image quality and aspect ratio
- avoid awkward crops
- use refined transitions and placements
- create a premium editorial rhythm across the page

Do **not** place images randomly just because they exist.

---

## 2) File inventory and intended usage

### images/01_hero_sunset_people.png
- Primary use: Primary homepage hero (desktop)
- Why: Best cinematic hero image. Strong sunset sky, lively atmosphere, palm trees, yellow chairs, festive lights.

### images/02_evening_garden_empty_vertical.png
- Primary use: Evening garden feature / mobile visual
- Why: Great for 'Le Jardin' section or a tall editorial image block. Clean composition and strong blue-hour mood.

### images/03_day_garden_framed_arch.png
- Primary use: Daytime garden feature
- Why: Natural leaf frame. Excellent for the hidden garden story and daytime atmosphere.

### images/04_dj_booth_event.png
- Primary use: Events / DJ / programming section
- Why: Best event-driven image. Use for live moments, DJ sets, ambiance and programming.

### images/05_golden_hour_people.png
- Primary use: Atmosphere section
- Why: Warm human scene. Strong for community vibe, social life and garden atmosphere.

### images/06_indoor_room.png
- Primary use: Interior section / supporting gallery
- Why: Best indoor shot. Useful to show the venue is not only outdoor.

### images/07_day_garden_foreground_plant.png
- Primary use: Editorial supporting image
- Why: Strong depth and foreground layering. Good for gallery or supporting image block.

### images/08_arcade_machine.png
- Primary use: Games / lifestyle detail
- Why: Shows fun personality of the venue. Use as a detail shot, not as a large hero.

### images/09_day_garden_wide.png
- Primary use: Garden section / gallery
- Why: Bright wide terrace shot. Great supporting image for the hidden garden.

### images/10_people_garden_group.png
- Primary use: Atmosphere / social gallery
- Why: Lively crowd shot. Good for a gallery tile or atmosphere block.

### images/11_people_garden_group_blurred.png
- Primary use: Background-safe atmosphere image
- Why: Use when a people-focused image is desired but less facial detail is preferable.

### images/12_pano_terrace.png
- Primary use: Wide panoramic support image
- Why: Best panoramic overview. Good for wide break sections or an immersive strip.

### images/13_garden_left_entrance.png
- Primary use: Supporting garden image
- Why: Nice entrance-side composition. Good for masonry gallery.

### images/14_garden_center_canopy.png
- Primary use: Supporting garden image
- Why: Good center-canopy composition for the garden section.

### images/15_logo_blue_background.png
- Primary use: Brand asset
- Why: Use as source for brand/logo treatment and palette reference.


---

## 3) Section-by-section image placement plan

### A. Header / branding
- Use `images/15_logo_blue_background.png` as the logo source / brand reference.
- The site color palette should be sampled from that deep blue background and the playful logo colors.
- If necessary, isolate/recreate the wordmark cleanly for better UI usage, but keep the spirit of the provided logo.

### B. Hero section
**Primary desktop hero:**
- `images/01_hero_sunset_people.png`

**Hero intent:**
- This is the main image that should sell the venue instantly.
- Keep it large, full-bleed, cinematic and emotionally strong.
- Use a subtle dark overlay so white/cream hero text remains readable.
- Keep the sky, palm trees and lit atmosphere clearly visible.
- Avoid cropping out too much of the foreground chair or the people cluster on the right; they add life.

**Optional mobile alternative if needed:**
- `images/02_evening_garden_empty_vertical.png`
- Only if a tall mobile crop works better than forcing the sunset hero.

### C. “Le Jardin Caché” section
Use 2–3 strong editorial images, not a slider overload.

**Preferred images:**
- `images/03_day_garden_framed_arch.png`
- `images/09_day_garden_wide.png`
- `images/14_garden_center_canopy.png`

**Intent:**
- Show the hidden garden as spacious, sunny and surprising.
- The first image in this section should feel inviting and lush.
- Use a mixed layout: one large dominant image + one or two smaller supporting images.

### D. “À table / La vie à La Kermesse” / atmosphere section
**Preferred images:**
- `images/05_golden_hour_people.png`
- `images/10_people_garden_group.png`
- `images/11_people_garden_group_blurred.png`

**Intent:**
- Show that the venue is social, warm and lively.
- Use `11_people_garden_group_blurred.png` when a more privacy-safe or softer background-style people image is better.
- Do not overuse the sharp crowd image as the first thing users see after the hero. Keep it as supporting atmosphere.

### E. Events / DJ / programming section
**Primary image:**
- `images/04_dj_booth_event.png`

**Optional supporting image:**
- `images/05_golden_hour_people.png`

**Intent:**
- This section must communicate live energy and event potential.
- The DJ image is ideal and should be used prominently here.
- If using a split layout, pair the DJ image with short text about DJs, concerts, blind tests, stand-up or evolving programming.

### F. Indoor / games / personality detail section
**Preferred images:**
- `images/06_indoor_room.png`
- `images/08_arcade_machine.png`

**Intent:**
- Use these as supporting personality details, not primary brand-defining visuals.
- They help prove that La Kermesse has character beyond the terrace.
- Good approach: interior image as main block, arcade machine as a smaller accent tile.

### G. Gallery section
The gallery should feel curated, not repetitive.

**Best gallery pool:**
- `images/02_evening_garden_empty_vertical.png`
- `images/03_day_garden_framed_arch.png`
- `images/07_day_garden_foreground_plant.png`
- `images/09_day_garden_wide.png`
- `images/10_people_garden_group.png`
- `images/12_pano_terrace.png`
- `images/13_garden_left_entrance.png`
- `images/14_garden_center_canopy.png`
- `images/06_indoor_room.png`
- `images/08_arcade_machine.png`

**Gallery layout rule:**
- Use an editorial masonry / asymmetrical grid.
- Alternate between wide, tall and standard image blocks.
- Do not make every image the same size.
- Do not crop every image to the same card ratio.

### H. Wide break / immersive strip image
**Best option:**
- `images/12_pano_terrace.png`

**Intent:**
- Use as a wide panoramic strip between sections or near the gallery / map transition.
- It works well as a horizontal visual “breather”.

---

## 4) Creative treatment rules

The site should use images creatively but tastefully.

### Recommended visual treatments
- soft fade-in on scroll
- slight upward reveal (`opacity + translateY`)
- staggered reveal for image groups
- very subtle zoom-on-hover (for gallery only)
- gentle clip reveal or mask reveal for large editorial images
- subtle dark gradient overlays on text-over-image sections
- thin warm-gold or low-contrast cream borders where appropriate
- selective image shadowing, subtle and elegant
- use layered compositions where one smaller image slightly overlaps a larger block

### Avoid
- cheesy carousel overuse
- excessive rounded corners
- random collage chaos
- loud drop shadows
- over-animating every image
- heavy parallax on mobile
- gaudy filters
- slideshow spam

---

## 5) Motion / animation guidance

### Hero
- On initial load: very subtle fade-in + scale from 1.03 to 1.00 over ~1.2s–1.8s
- Text can reveal slightly after the image

### Section images
- Reveal on scroll with intersection observer
- Fade + 20px upward motion
- Duration around 600–900ms
- Stagger gallery items by 60–120ms

### Hover behavior
- For gallery images only:
  - scale image to about 1.02–1.04
  - optional slight brightness lift
- Keep hover elegant and lightweight

### Borders / frames
- Use either:
  - no border for large full-bleed images
  - or a subtle 1px line / refined frame for smaller editorial blocks
- Borders should feel curated, not boxed like a template grid

---

## 6) Cropping and focal-point rules

- Preserve focal points:
  - sky + palms + terrace on hero images
  - pathway / chairs / canopy on garden images
  - DJ setup in event image
  - wallpaper + lighting + room depth in interior image
  - full cabinet in arcade image
- Never stretch images
- Prefer `object-fit: cover` carefully
- Use `object-position` intentionally
- Keep wide images wide; keep tall images tall where possible
- On mobile, do not aggressively crop away the strongest visual story

---

## 7) Performance / implementation notes

- Use responsive image sizing
- Convert to WebP/AVIF if helpful, but keep originals as source assets
- Lazy-load all below-the-fold images
- Do not lazy-load the main hero image
- Reserve width/height space to reduce layout shift

---

## 8) Final implementation instruction for Codex

Treat this asset pack as the official photo direction for the website.
Your job is not only to display the images, but to **art direct them in code**.

That means:
- choose the right image for the right section
- give each image a role
- create a refined visual hierarchy
- support the story of the hidden garden, social atmosphere and neighborhood identity
- make the website feel custom, polished and hospitality-grade

Do not place these images randomly.
Use them intentionally, elegantly and creatively.
