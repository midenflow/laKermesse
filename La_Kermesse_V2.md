# La Kermesse V2

## Objective
This document captures the **V2 changes** requested after reviewing the current V1 website.
The homepage foundation is strong, but several design/content adjustments must now be made before the next iteration.

---

## Global V2 Direction
Keep the same overall quality, smooth UX, clean scroll feel, and strong editorial structure from V1.

However, for V2:
- keep the website elegant and premium
- make the brand feel slightly **stronger, warmer, and more memorable**
- shift the palette from **blue + dark** as the dominant direction
- improve the hero message and logo presentation
- redesign buttons to feel more high-end and creative
- make the **pizza offer** a clear and important part of the food proposition

---

## 1) Logo presentation — must change
### Current issue
The logo currently appears with its **blue rectangular background**, which weakens the header/footer presentation and makes it feel less refined.

### V2 instruction
- Remove the visible blue rectangle behind the logo in the header and footer.
- Use the **La Kermesse wordmark alone** on a transparent background, or recreate/isolate the lettering cleanly.
- Keep the multicolor lettering spirit, but present it in a more elegant way.
- The logo should feel integrated into the site, not like a pasted image block.
- In the header, the logo should sit naturally on the dark/blue background with enough spacing and visual breathing room.

---

## 2) Hero typography — make it slightly smaller
### Current issue
The main hero title is too large and occupies too much space.

### V2 instruction
- Reduce the size of the main hero title slightly on both desktop and mobile.
- Keep it visually strong, but give the hero image more room to breathe.
- Do not shrink everything drastically — just enough to improve elegance and balance.
- Also slightly rebalance line-height and spacing so the hero feels more refined and less oversized.

---

## 3) Replace current hero line
### Current issue
The current headline:
**“Votre parenthèse à Rennes.”**
does not hit hard enough.

### V2 task
Below are **10 stronger/suitable French hero headline options**. Use these as copy exploration for the hero section.

## 10 Suggested Hero Lines
1. **Le jardin caché où Rennes se retrouve.**
2. **Une adresse à part, au cœur de Rennes.**
3. **Le goût des beaux moments à Rennes.**
4. **Derrière la façade, tout un lieu de vie.**
5. **À Rennes, le rendez-vous se vit ici.**
6. **Le jardin, la table, l’ambiance.**
7. **Une table vivante, un jardin inattendu.**
8. **Le spot caché qui prolonge vos soirées.**
9. **Rennes a trouvé son jardin.**
10. **Plus qu’un restaurant, un vrai lieu de vie.**

### Recommendation
Best first candidates:
- **Le jardin caché où Rennes se retrouve.**
- **Une table vivante, un jardin inattendu.**
- **Plus qu’un restaurant, un vrai lieu de vie.**

These three are the strongest directions.

---

## 4) “La Carte” — simpler future update system
### Current issue
The current menu section is hard-coded and later updates should be easier without requiring code edits.

### V2 direction
For now, keep the V2 layout visually strong, but prepare the section so it can later be updated without touching code.

### Recommended future system
Use a **simple external data source**:
- either a lightweight JSON file
- or a simple admin-friendly data file
- or later even a Google Sheet / Airtable / CMS connection

### Important principle
The menu content should eventually be editable without needing to redesign the section every time.

### V2 implementation suggestion
Structure the “La Carte” section in clear blocks:
- Déjeuner
- Pizzas
- Soir / tapas (if confirmed later)
- Call to action toward reservation

Even if the content is still hardcoded in V2, the HTML structure should be modular enough to be replaced later by dynamic content.

---

## 5) Color direction — switch to “blue + dark”
### Current issue
There is too much white background.

### V2 instruction
The new core palette direction is:
- **deep blue / petrol blue** (same successful brand blue already used in the current site)
- **dark / charcoal / near-black**
- restrained cream/sand only as supporting accent, not as dominant large background
- subtle gold accents where useful

### Important
Do **not** change the brand blue.
Use the exact same blue family already present in the current site, because it fits the identity very well.

### V2 desired mood
The website should feel:
- moodier
- richer
- more immersive
- more premium at night
- less bright / less airy-white
- more “hospitality atmosphere” and less “light editorial minimalism”

### Practical instruction
- Large white/cream sections should be converted to dark/blue-driven sections where appropriate.
- Keep enough contrast and readability.
- Avoid making the site flat-black everywhere; it should remain warm and welcoming.

---

## 6) Button redesign — inspired by the Bar 1806 reference
### Current issue
The current buttons are too standard.

### V2 instruction
Redesign the buttons so they feel more bespoke and premium, inspired by the **Bar 1806** reference.

### Desired button direction
- dark button body / framed look
- elegant thin double-border effect
- refined typography in uppercase
- subtle arrow on the right
- more luxurious / crafted feel
- slightly elongated proportions
- tasteful hover animation

### Important note
The button should feel in the **same spirit** as the Bar 1806 example:
- refined
- framed
- slightly classic
- premium
- distinctive

### V2 button behavior
- subtle hover shift / glow / border animation
- should work consistently across:
  - hero CTA
  - nav CTA
  - reserve band CTA
  - reservation page CTA

---

## 7) Pizza offer — now an important part of the food offer
The boss confirmed that the pizza offer is becoming a strong and important part of the restaurant.

This means the V2 website must give the pizza menu a much stronger presence inside **“La Carte”**.

### V2 pizza strategy
The pizza offer should be presented as a **designed sub-section**, not as a buried note.

### Presentation goal
Make the pizza block:
- visually attractive
- easy to scan
- better designed than a plain list
- clearly separated from the lunch formula
- faithful to the restaurant’s personality

### Suggested structure for the “La Carte” section
1. Intro / food philosophy
2. Lunch formula block
3. **Pizza menu block**
4. Later: other food/drink blocks if confirmed
5. CTA toward reservation

### Suggested pizza design treatment
- title such as **“Les Pizzas de La Kermesse”**
- short line like:
  **Sur place et à emporter jusqu’à 21h30**
- structured cards or clean editorial list
- each pizza name highlighted
- ingredients in smaller supporting text
- prices aligned clearly
- maybe a small accent badge for:
  - “Sur place”
  - “À emporter”
  - “Jusqu’à 21h30”

### Important
This pizza menu should feel **designed**, not just copied as raw text from the post.

---

## 8) Pizza menu transcription from the Instagram post
Below is the readable content extracted from the image.
Some spellings may need final visual confirmation, but this is the working transcription for V2.

## PIZZAS SUR PLACE ET À EMPORTER JUSQU’À 21H30

### Les Pizzas de la Kermesse
1. **La sans chichi** — **11,50 €**  
   Base tomate, mozzarella, origan

2. **La rue de la Vern** — **12,50 €**  
   Base tomate, mozzarella, jambon blanc, origan

3. **La Kermesse Royale** — **13 €**  
   Base tomate, mozzarella, jambon blanc, champignons frais, origan

4. **La 4 Ch’vaux** — **14,50 €**  
   Base crème, mozzarella, gorgonzola, chèvre, copeaux de parmesan

5. **La Véggie land** — **14 €**  
   Base tomate, mozzarella, légumes de saison, pesto, champignons, roquette  
   *(final ingredients to visually confirm if needed)*

6. **La Bolo** — **13 €**  
   Base tomate, mozzarella, viande hachée, tomates, oignons

### Sur place & à emporter
7. **La Montagne Russe** — **14,50 €**  
   Base crème, mozzarella, reblochon, pommes de terre, lardons, oignons

8. **La Mimi Ferme** — **12,50 €**  
   Base crème, chèvre frais, miel

9. **La Chicken Run** — **13,00 €**  
   Base tomate, tenders de poulet maison, oignons frits, sauce barbecue

### V2 instruction for pizza content
Use the above content as the initial working pizza menu in the V2 La Carte section, while keeping the structure easy to update later.

---

## 9) What stays strong from V1
The following should be preserved:
- the overall homepage structure
- the clean and professional feel
- the smooth scrolling experience
- the editorial use of photography
- the strong hidden-garden storytelling
- the polished UX foundation
- the sense that the site feels custom and premium

This is not a rebuild from zero.
It is a **design refinement and strengthening of the V1 direction**.

---

## 10) Priority order for V2
Focus on these in this order:

1. **Logo presentation fix**
2. **Hero headline replacement**
3. **Hero title size adjustment**
4. **Global palette shift to blue + dark**
5. **Button redesign**
6. **Pizza menu integration**
7. **Prepare cleaner future menu update structure**

---

## 11) Short implementation note for Codex
When updating the site:
- preserve the current clean architecture and smooth UX
- do not overcomplicate the page
- improve visual richness without losing clarity
- treat the pizza section as a real selling point
- make the UI feel more premium, more intentional, and more brand-owned

---

## 12) Scope note
For now, focus only on the homepage / visual/content refinements listed above.

**Booking page changes will be handled later.**
