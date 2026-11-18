# Design changes

Tracks changes to the Figma file so Claude Code can tell which frames need
re-checking, instead of re-reading the whole document each session.

**Figma file:** `The Working Tribe Website` — `fvvCEIlOGqFy33Tdw3eUSI`
**Required by:** CLAUDE.md §2.

## How to use this

- Add an entry whenever a Figma change is noticed, with the date, the frame or
  node id, what changed, and whether implemented code needs revisiting.
- Compare against the **verified baseline** below rather than memory.
- Figma stays read-only (CLAUDE.md §1). This file records changes; it never
  causes one.
- When a change invalidates shipped code, say so explicitly in **Impact** and
  open a follow-up — do not silently re-implement.

---

## Verified baseline — 2026-11-11

Read live from Figma via the `figma-console` bridge, read-only.

### Design system foundations

| Item                 | Count   | Verified                                                                               |
| -------------------- | ------- | -------------------------------------------------------------------------------------- |
| Variable collections | 6       | Primitives 56 · Color 65 · Segment 36 · Spacing & Shape 36 · Layout 24 · Typography 82 |
| Variables            | **299** | 0 unresolved aliases                                                                   |
| Text styles          | **42**  | Desktop/Tablet/Mobile × 11 + 9 UI                                                      |
| Effect styles        | 9       | 4 elevation, brand glow, 3 focus rings, header-glass blur                              |
| Grid styles          | 4       | 12/8/4 column + 8px baseline                                                           |
| Paint styles         | 4       | 2 gradients, 2 overlays                                                                |

Implemented in Phase 1 — `src/styles/tokens.css`, `design/TOKENS.md`.

### Pages

| Page              | Node    |
| ----------------- | ------- |
| 🎨 Design System  | `19:2`  |
| 🏠 Home — Desktop | `46:94` |
| Inner Pages       | `54:94` |

### Design System sections

| Section                             | Node    |
| ----------------------------------- | ------- |
| 00 · Cover                          | `19:3`  |
| 01 · Brand Colours & Variables      | `19:24` |
| 02 · Typography                     | `19:31` |
| 03 · Spacing & Layout Grid          | `19:38` |
| 04 · Effects & Borders              | `19:45` |
| 05 · Buttons & Interactive Elements | `19:52` |
| 06 · Navigation & Footer            | `19:59` |
| 07 · Cards & Content Components     | `19:66` |
| 08 · Forms & Accordions             | `19:73` |
| 09 · Component Variants & States    | `19:80` |

### Component sets — section 05 (implemented in Phase 2)

| Component           | Node                                              | Variants | Axes                                                                         |
| ------------------- | ------------------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| Button/Primary      | `31:96`                                           | 15       | Size[Large\|Medium\|Small] × State[Default\|Hover\|Focus\|Pressed\|Disabled] |
| Button/Secondary    | `31:199`                                          | 15       | same                                                                         |
| Button/Outline      | `31:302`                                          | 15       | same                                                                         |
| Button/Inverse      | `31:405`                                          | 15       | same                                                                         |
| Icon Button         | `32:66`                                           | 20       | Style[Primary\|Secondary\|Outline\|Inverse] × State[5]                       |
| Text Link           | `32:102`                                          | 4        | State[Default\|Hover\|Focus\|Disabled]                                       |
| Icon/* (standalone) | `28:9`–`28:198`, `95:4201`, `95:4207`, `227:9236` | 39       | —                                                                            |

### Component sets — section 08 (forms)

| Component                  | Node       | Variants | Implemented in Phase 2     |
| -------------------------- | ---------- | -------- | -------------------------- |
| Form/Label                 | `87:2131`  | 2        | ✅                         |
| Form/Helper Text           | `87:2150`  | 3        | ✅                         |
| Form/Validation Message    | `87:2183`  | 4        | ✅                         |
| Form/Text Input            | `87:2305`  | 7        | ✅                         |
| Form/Textarea              | `87:2431`  | 7        | ✅                         |
| Form/Dropdown              | `88:2580`  | 7        | ✅                         |
| Form/Dropdown Option       | `88:2460`  | 4        | ✅ (inside Select)         |
| Form/Checkbox              | `88:2688`  | 15       | ✅                         |
| Form/File Upload           | `95:4327`  | 6        | ✅                         |
| Form/Package Option        | `111:5945` | 6        | ✅                         |
| Form/Submit Button         | `111:5964` | 3        | ✅                         |
| Accordion Item             | `88:2773`  | 8        | ❌ pending                 |
| Form/Consultation          | `111:6601` | 6        | ❌ pending (composed form) |
| Form/Tribe Capital Enquiry | `111:7297` | 6        | ❌ pending (composed form) |

### Component sets — section 09

| Component       | Node      | Variants | Implemented |
| --------------- | --------- | -------- | ----------- |
| Tag/Filter Chip | `57:929`  | 5        | ❌ pending  |
| Card/Service    | `88:3257` | 12       | ❌ pending  |

### Key page frames

| Frame                                 | Node        | Size        |
| ------------------------------------- | ----------- | ----------- |
| **Home — Desktop** (canonical)        | `46:95`     | 1440 × 9363 |
| Home 2 Desktop (do not use)           | `113:8483`  | 1440 × 9937 |
| Home 3 Desktop (do not use)           | `113:8733`  | 1440 × 9836 |
| A · About Us — Desktop                | `54:95`     | 1440 × 6544 |
| B0 · Services Overview — Desktop      | `85:923`    | 1440 × 8999 |
| B · Service Detail Template           | `56:329`    | 1440 × 6534 |
| C · Industries — Desktop              | `57:502`    | 1440 × 8615 |
| D · Case Studies — Desktop            | `57:930`    | 1440 × 5574 |
| E · Contact Us — Desktop              | `90:4009`   | 1440 × 3538 |
| F · FAQ — Desktop                     | `90:4638`   | 1440 × 6614 |
| G · Careers — Desktop                 | `95:4335`   | 1440 × 3138 |
| I · Why TWT — Desktop                 | `108:5091`  | 1440 × 6310 |
| **Training Programs — Desktop**       | `248:10353` | 1440 × 6502 |
| H · Newsletter Archive — Desktop      | `108:4718`  | 1440 × 4202 |
| Newsletter · Edition reading template | `102:3931`  | 1440 × 4707 |
| Service Portfolio — Variation 01      | `102:5003`  | 1440 × 2244 |
| Service Portfolio — Variation 02      | `102:5208`  | 1440 × 1860 |

### Outstanding design decisions

Mirrors CLAUDE.md §10 — the authoritative list lives there.

1. Industries marquee — Dark/violet (`180:10249`) or Light (`185:11530`)
2. Industries section heading — final wording
3. Asia contact number — country code
4. Africa contact number — correct digits
5. Form backend — undecided
6. Newsletter Reading page — header layout
7. Header layout — `Original` or `Grouped Dropdown`
8. Footer layout — `Original` or `Modern`
9. Service Portfolio — Variation 01 or 02
10. Footer QR code — artwork, URL, placement not supplied
11. Stock image scope — 43 reported vs 54 photo IDs / 89 collection fills / 47 placed
12. Desktop breakpoint — implemented at 1280px; Figma `breakpoint/desktop` is 1440px (artboard width)

---

## Change log

### 2026-11-11 — observed since the 2026-11-04 audit

| Node                                               | Change                                                                              | Impact                                                                                        |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `46:95`                                            | `Home — Desktop` height 10121 → **9363**                                            | None yet — the homepage is not built. Re-measure before Phase 3.                              |
| `248:10353`                                        | **New** `Training Programs — Desktop` (1440 × 6502)                                 | Confirms `/training-programs` has a real design (CLAUDE.md §7.1). Finality still unconfirmed. |
| `249:10847`, `249:10927`, `249:11007`, `249:11087` | **New** Training Programs registration overlays (Spring / Summer / Autumn / Winter) | Needed for the Training Programs page in Phase 3.                                             |
| `264:12250`                                        | **New** `05 · Training Programs` homepage section                                   | Homepage section list changed — re-inspect before building the homepage.                      |
| `179:9389`                                         | **New** `Stoke images collection` section (27014 × 12155)                           | Stock image library; see open decision 11. Name is misspelled in Figma — do not fix (§1).     |
| `227:8669`                                         | **New** `Instagram Link` frame (802 × 1080)                                         | Relates to the footer Instagram link (CLAUDE.md §7.4).                                        |
| `227:9236`                                         | **New** `Icon/instagram` component                                                  | Implemented in the Phase 2 icon set.                                                          |
| `179:9464`, `179:9402`                             | **New** `Panel · Company` frames                                                    | Company dropdown contents, confirms Training Programs placement.                              |
| `227:10051`                                        | **New** `Home — Desktop Copy` (1440 × 9363)                                         | Duplicate of the canonical homepage. **Not** canonical — `46:95` remains the reference.       |
| `180:10073`–`185:11530`                            | Industry marquee component sets, dark and light                                     | Both built in Figma; neither chosen. Open decision 1.                                         |

> No entry here authorises a code change. Each one is a prompt to re-verify
> against Figma before building the affected surface.

### 2026-11-11 — Phase 3 decisions and build-vs-Figma divergences

| Node       | Change / divergence                                                                              | Impact                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `109:5770` | **Client decision:** header is `Layout=Grouped Dropdown`.                                        | Implemented in `SiteHeader`.                                                             |
| `109:5770` | **Client decision:** Newsletters removed from the header. Figma still shows `Nav / Newsletters`. | Build intentionally differs from Figma here. Do not re-add; Figma is not to be edited.   |
| `44:176`   | **Client decision:** footer is `Layout=Original`.                                                | Implemented in `SiteFooter`; renders 1440 × 760, matching the frame.                     |
| `46:95`    | Canonical homepage still instantiates Header `Original`.                                         | Use the shared `SiteHeader` when the homepage is built, not the frame's header instance. |
| —          | Footer QR code: no node, text or URL in Figma.                                                   | Not built. Open decision 10.                                                             |
| —          | No tablet or mobile header/footer frames exist in Figma.                                         | Drawer and stacked footer are token-based adaptations, pending design review.            |

### 2026-11-11 — Phase 4 homepage build: re-verified baseline and divergences

| Node                                           | Change / divergence                                                                                                                                     | Impact                                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `46:95`                                        | Frame has 10 children: Header, 8 content sections (01–06, 08, 09 — no "07"), Footer. Section heights 864 / 1084 / 1831 / 998 / 1030 / 1426 / 670 / 572. | Homepage built to these; rendered heights match (Services 1830).                                      |
| `48:312`                                       | Layer is still named `06 · Newsletters` but holds the Training Programs content.                                                                        | Built as the Training Programs section. Eyebrow still reads "The Working Tribe newsletter", as drawn. |
| `102:4219`, `102:4298`, `102:4377`, `102:4456` | Registration overlays on the homepage (component `95:5568`). The earlier `113:99xx` ids no longer exist.                                                | Built as one dialog. No backend: nothing is sent and no success state exists.                         |
| `48:312`                                       | `Sample badge` instances in the Venue and Date & time rows occupy layout space but do not render.                                                       | Build reserves the same space and draws no badge.                                                     |
| `111:7317`, `111:7432`                         | Consultation and Tribe Capital enquiry overlays.                                                                                                        | Not built in Phase 4. CTAs link to `/contact` (pending route).                                        |
| `48:427`                                       | Closing CTA email is `info@theworkingtribe.com`; footer (`44:176`) is `hello@theworkingtribe.com`.                                                      | Both rendered as drawn. Needs client confirmation.                                                    |
| —                                              | No tablet or mobile homepage frames exist in Figma.                                                                                                     | 768 and 375 layouts are token-based adaptations, pending design review.                               |
| —                                              | Hero and brand-intro images are the AI concept images in the frame.                                                                                     | Shipped as `@placeholder`; replace when stock imagery is placed (CLAUDE.md §6.4).                     |

### 2026-11-11 — Phase 5.1 About Us build

| Node               | Change / divergence                                                                                                                                         | Impact                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `54:95`            | `A · About Us — Desktop`, 1440 × 6544: Header (Grouped Dropdown), 7 sections, Footer (Original). Section heights 1074 / 622 / 533 / 1077 / 880 / 898 / 572. | Built at `/about`; rendered heights match exactly.                                                        |
| `109:5567`         | `Nav Menu Item` → `State=Hover` shows a 16px `Icon/arrow-right` in `icon/brand`, 16px from the right edge.                                                  | Added to the Company dropdown rows (hover and keyboard focus). `State=Active` (6px dot) is not built yet. |
| `54:382`           | About closing CTA email is `hello@theworkingtribe.com` (homepage `48:427` shows `info@`).                                                                   | Rendered as drawn on each page. Still needs client confirmation.                                          |
| `54:159`, `54:221` | Stock photos (1500 × 1001 each) exported unmodified from the image fills.                                                                                   | In `public/images/`. Credits not yet recorded.                                                            |
| —                  | No tablet or mobile About frames exist in Figma.                                                                                                            | 768 and 375 layouts are token-based adaptations, pending design review.                                   |

### 2026-11-12 — Phase 5.2 Why TWT build

| Node       | Change / divergence                                                                                                                                 | Impact                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `108:5091` | `I · Why TWT — Desktop`, 1440 × 6310: Header (Grouped Dropdown), 6 sections, Footer (Original). Section heights 816 / 946 / 1764 / 680 / 644 / 572. | Built at `/why-twt`; rendered heights match exactly.                    |
| `108:5287` | Tribe Capital's overline row reserves a 28px slot for a `Provisional` badge drawn at 0% opacity.                                                    | Build reserves the space and draws no badge, as in Figma.               |
| `108:5332` | Closing CTA email is `hello@theworkingtribe.com` (homepage shows `info@`).                                                                          | Rendered as drawn. Still needs client confirmation.                     |
| `46:140`   | **Client instruction:** homepage hero heading capped at 64px on desktop; Figma draws it at 72px.                                                    | Build intentionally differs from Figma for that one heading.            |
| —          | No tablet or mobile Why TWT frames exist in Figma.                                                                                                  | 768 and 375 layouts are token-based adaptations, pending design review. |

### 2026-11-12 — Phase 5.3 Careers build

| Node                 | Change / divergence                                                                                                                         | Impact                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `95:4335`            | `G · Careers — Desktop`, 1440 × 3138: Header, 2 sections (hero 816, application 1434), Footer.                                              | Built at `/careers`; hero 816, application 1433 (form card 1193 vs 1194).                                             |
| `95:4605`            | Upload & validation states reference (marked "For review — not live content").                                                              | All states built: drag over, selected, error, field errors. Uploading is designed but needs a real transport to show. |
| `95:4887`            | `G2` acknowledgement state; summary labelled "· SAMPLE".                                                                                    | Built; renders only on real success. Reviewable in Storybook only.                                                    |
| `87:2305`, `88:2580` | Text Input / Dropdown Error and Success variants carry a 20px status icon; `Focus/Ring · Error` exists.                                     | Added to the shared components — they were missing from Phase 2.                                                      |
| —                    | No option lists for Region or Area of interest; no copy for a missing CV or the consent error.                                              | Placeholders used and flagged in `careers.ts`.                                                                        |
| —                    | Client instructions (Phase 5.3): homepage sector list capped at 14px; Why TWT portrait (`111:5596`) cropped left so the subject is centred. | Build differs from Figma for those two details.                                                                       |

### 2026-11-12 — Training Programs build

| Node                                               | Change / divergence                                                                                                                                                                                                                         | Impact                                                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `248:10353`                                        | `Training Programs — Desktop`, 1440 × 6502: hero 808, training year 654, programmes 2816, registration 712, closing CTA 624.                                                                                                                | Built at `/training-programs`; 808 / 660 / 2908 / 714 / 624.                                                                                                                                 |
| `248:10353`                                        | Off-scale type in this frame: status values Bold 28/34, labels Bold 12/16, season titles Bold 24/30, Winter topic Bold 52/60, step titles Bold 22/28, fact values Bold 16/22. Radii 40 (Winter card), 28 (Winter image), 20 (format tiles). | Nearest tokens used (CLAUDE.md §3.1 — systematic gaps are reported, not inlined). The Winter title wraps to two lines at H1 56px, which is most of the programmes-section height difference. |
| `249:10847`, `249:10927`, `249:11007`, `249:11087` | Page-specific registration overlays — same `Modal/Registration` as the homepage, details line without sample dates.                                                                                                                         | Served by the existing overlay with a per-page details line.                                                                                                                                 |
| `248:10354`                                        | The frame's header still shows `Nav / Newsletters`.                                                                                                                                                                                         | Header unchanged — Newsletters stays out per the client decision (CLAUDE.md §7.2).                                                                                                           |

### 2026-11-12 — Modal & CTA refinements

| Node                    | Change / divergence                                                                                                                                                   | Impact                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `111:6601` / `111:7317` | `Form/Consultation` (640 wide) built as the site-wide consultation popup, opened from the header CTA. `State=Acknowledgement` is deliberately not built (no backend). | Header "Request a consultation" no longer links to `/contact`.   |
| `95:5568`, `102:4219`…  | **Client instruction:** the "PROVISIONAL FIELDS — TO BE CONFIRMED" badge is removed from the registration popup. Figma still draws it.                                | Build intentionally differs from Figma.                          |
| `95:5568`               | Registration popup rebuilt on the shared `Modal` shell: scroll-locked page, internally scrolling body, fixed header. Visual design unchanged.                         | Fixes the page scrolling behind the popup.                       |
| `111:6601`              | Consultation `Phone number` error text in Figma repeats the full-name message; `Company`/`consent` error copy is not drawn.                                           | Placeholder copy used, flagged in `src/content/consultation.ts`. |

### 2026-11-12 — Phase 5.4 Industries build

| Node                   | Change / divergence                                                                                                                                                                                                                                                                                          | Impact                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `57:502`               | `C · Industries — Desktop`, 1440 × 8615: 15 children, 11 visible content sections. Heights 776 / 406 / 596 / 690 / 747 / 919 / 691 / 691 / 308 / 1331 / 572.                                                                                                                                                 | Built at `/industries`; every section height matches at 1440.                                                       |
| `180:10250`, `87:1661` | Hidden layers: dark `01b · Specialisations` marquee and a superseded `Sector index` ("delete after approval").                                                                                                                                                                                               | Not built as sections. The dark marquee is available as `tone="dark"`; open decision #1 stays open.                 |
| `185:11636`            | The visible marquee is the **Light** variation; its own note says one set is 2,531px, but the set measures 2,337px.                                                                                                                                                                                          | Loop sized from the measured set width (−33.3333% of three sets), so it is seamless regardless; 45 s as documented. |
| `185:11636`            | Intro count "05" is Bold 96/96 −3% — not a type step.                                                                                                                                                                                                                                                        | `Display/Hero` (72/80) used; flagged as a token gap.                                                                |
| `185:11636`            | The five marquee labels (Healthcare, Manufacturing, Consumer Goods, Hospitality, Technology) do not map 1:1 to the five sector groups; heading wording is open decision #2.                                                                                                                                  | Transcribed as drawn; flagged for client confirmation.                                                              |
| `264:12250`            | `05 · Training Programs` here is a **newer variant** of the homepage block (`48:312`): no Venue, dates "To be announced", no "Browse all editions", season-only cover names, "The full training year" + "View all Training Programs". Its sticker is tilted −8°; the homepage code currently draws it level. | Served by a content variant of `Programmes`; the homepage is unchanged. The sticker follows the homepage code.      |
| `57:651`               | Healthcare section: full-bleed photo (1880 × 1200 at −440, −140) under a 22% navy scrim with a floating card.                                                                                                                                                                                                | Built as drawn at desktop; below 1280px the photo stacks above the card.                                            |
| —                      | No tablet or mobile Industries frames exist in Figma.                                                                                                                                                                                                                                                        | 768 and 375 layouts are token-based adaptations, pending design review.                                             |

### 2026-11-13 — Phase 5.5 Contact Us, favicon and consultation CTAs

| Node                   | Change / divergence                                                                                                                                                                                                                                                                                       | Impact                                                                                                                                                                                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `90:4009`              | `E · Contact Us — Desktop`, 1440 × 3538: Header 128, `01 · Page hero` 812, `02 · Enquiry` 1266, `05 · Closing CTA` 572, Footer 760. There is no `03`/`04` section in this frame.                                                                                                                          | Built at `/contact`; measured 812 / 1258 / 572 at 1440. The 8px on the enquiry section is the message textarea's resting height.                                                                                                                                                                                   |
| `90:4009`              | **Phone numbers are drawn without a leading `+`** in the contact list — Asia `1 33 7024 0773`, Africa `233 598 277 323` — while the footer on the _same frame_ draws `+1 33 7024 0773` and `+233 598 277 323`.                                                                                            | The page renders the numbers from `site.ts`, so the list and the footer agree. ⚠️ Which form is correct is a client question, on top of open decisions #3 and #4.                                                                                                                                                  |
| `90:4008`              | `Contact Option` sets `Show action = true` on all three phone rows, so Figma draws a "Call →" affordance on Asia and Africa too.                                                                                                                                                                          | **Resolved 2026-11-13 (client instruction):** all three rows now show "Call →" and take the same hover state, as drawn. Only USA is a link — Asia and Africa still carry no `tel:` (CLAUDE.md §6.3), are not focusable, and their action label is `aria-hidden`, so nothing promises a call that cannot be placed. |
| `90:4008`              | `Show action = false` on both address rows; their component defaults ("Directions", "Email us") are not shown. `Show badge = true` only on Asia Region.                                                                                                                                                   | Built exactly so. Row heights match Figma at 1440: 82 / 82 / 82 / 82 / 82 / 106 / 118.                                                                                                                                                                                                                             |
| `90:4068`              | Hero `Button/Primary` "Start your enquiry" prototypes to `02 · Enquiry` (a scroll, not a navigation).                                                                                                                                                                                                     | Built as an in-page anchor to `#enquiry`, using the existing sticky-header scroll padding.                                                                                                                                                                                                                         |
| `90:4080` → `104:5829` | The "Enquiring about Tribe Capital?" row prototypes to `03 · Tribe Capital enquiry` (`104:5829`) — a **separate frame**, not a section of this page, and not built (its packages are provisional, CLAUDE.md §6.5).                                                                                        | Points at `/services/tribe-capital`, the canonical path for that pillar. Route is `pending` and 404s until Phase 5.6+, per "do not stub pages to make links resolve".                                                                                                                                              |
| `90:4113`              | `Enquiry form` is an instance of `Form/Consultation` (`111:6601`) — the same component as the site-wide popup, at 792 wide instead of 640.                                                                                                                                                                | Rendered by the same `ConsultationForm` React component, inline. One form, one validation, one stubbed transport — no duplicate implementation.                                                                                                                                                                    |
| `90:4009`              | Figma draws the H1 over three lines at 644 wide; the browser fits it in two at the identical token (72/80, −2%, Bold).                                                                                                                                                                                    | Token values verified against `Desktop/Display/Hero` and left alone. Figma's text engine measures wider than Chrome at the same settings.                                                                                                                                                                          |
| `309:10928`            | Design System `10 · Favicon & Site Icon` — export spec: `favicon.ico` 16/32/48 (radius kept), `favicon.svg` from the 512 master, `apple-touch-icon.png` 180 **without** corner radius, `icon-192/512.png` with `theme_color #6242FB`, `background_color #FFFFFF`. Tab title `"Page — The Working Tribe"`. | All five assets rendered from `Favicon / Colourway=Primary` (`309:10940`); nothing redrawn. Title template changed to the em-dash form.                                                                                                                                                                            |
| `111:7317`             | Every "Request a consultation" CTA in the designs opens the consultation overlay.                                                                                                                                                                                                                         | All 37 triggers across the seven built routes now open the one shared popup (previously several were `/contact` links).                                                                                                                                                                                            |

### 2026-11-13 — Contact Us and Footer refinements (client instruction)

| Node                | Change / divergence                                                                                                                                                                        | Impact                                                                                                                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `90:4008`           | **Client instruction:** remove the `Badge/Tone=Placeholder` "TO CONFIRM" from the Asia Region row. Figma still draws it (`Show badge = true`).                                             | Build intentionally differs from Figma. The row drops from Figma's 118 to 106 at 1440, matching African Region. `Office.unconfirmed` stays in `site.ts` as review metadata — the address is still unconfirmed (§6.5), it is just no longer called out. |
| `90:4008`           | **Client instruction:** all three phone rows show the same "Call →" action and hover state. This restores Figma's `Show action = true`, reversing the divergence logged for Phase 5.5.     | Verified identical at 1440/768/375: same height, resting fill, border, tile, and hover (`primary/soft` fill, `violet/100` border, solid violet tile, white icon).                                                                                      |
| `90:4008`, `44:176` | Only the USA number is dialable. Asia and Africa keep `tel: null` (§6.3), so on both the Contact page and the footer they are not links, not focusable, and their action is `aria-hidden`. | Looks identical, cannot be activated. ⚠️ Still blocked on open decisions #3 and #4 plus the leading-`+` conflict; wire up `tel:` the moment the numbers are confirmed.                                                                                 |

### 2026-11-13 — Phase 5.6 Services Overview build

Baseline read from `B0 · Services Overview — Desktop` (`85:923`), 1440 × 8999:
Header 128, nine content sections, Footer 760.

| Section                               | Node      | Figma | Built |
| ------------------------------------- | --------- | ----: | ----: |
| 01 · Page hero                        | `85:986`  |  1082 |  1082 |
| 02 · How our services connect         | `85:1050` |   837 |   836 |
| 03 · Training & Capacity Building     | `85:1076` |   992 |   992 |
| 04 · Advisory & Management Consulting | `85:1123` |   935 |   938 |
| 05 · Global Solutions                 | `91:3543` |   760 |   760 |
| 06 · Tribe Capital                    | `91:3583` |   952 |   952 |
| 07 · Why work with us                 | `87:1499` |   852 |   852 |
| 08 · Services across sectors          | `87:1542` |  1129 |  1129 |
| 09 · Closing CTA                      | `85:1370` |   572 |   572 |

| Node                 | Change / divergence                                                                                                                                                         | Impact                                                                                                                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `85:923`             | Each of the four pillars is drawn with a **different** layout — image/list, soft panel, abstract visual, package journey — not four instances of one card.                  | Built as four distinct section components in `sections/services/service-pillars.tsx`, each monochromatic in its own `Segment` hue.                                                                                                       |
| `85:1076`, `85:1123` | The frame adds a one-line **description to every service module**. The module NAMES are the approved portfolio from `home.ts`; the descriptions exist only here.            | `moduleOf()` in `content/services.ts` reads each name out of `services.pillars` and throws at build if one is renamed, so the pages cannot drift.                                                                                        |
| `85:1076`, `85:1123` | Figma labels Training and Advisory `SERVICE · CONFIRMED`, and Global Solutions and Tribe Capital just `SERVICE`.                                                            | Transcribed as drawn — a status the designs state, not a judgement made in code.                                                                                                                                                         |
| `91:3583`            | Tribe Capital carries `Badge/Tone=Placeholder` "PROVISIONAL" on the index line, a provisional caption, and a "TO CONFIRM" badge on each of the three packages.              | **All kept**, per the Phase 5.6 brief. This does NOT contradict the badge removals on the registration popup and the Asia Region row — those were two specific client instructions, not a global rule. Packages stay provisional (§6.5). |
| `91:3567`            | The Global Solutions `Orbit arcs` instance overrides the Light component's violet stroke to `orange/500` at 16%.                                                            | Exported as `public/decor/orbit-arcs-light-1px.svg` with `non-scaling-stroke`, so the 1px stroke survives the 720 → 1040 stretch as it does in Figma.                                                                                    |
| `85:986`, `87:1499`  | Decor instance opacities are not all 1: hero `Violet glow` 0.5; `07` glow 0.85 and `Flow lines` 0.75.                                                                       | Passed through as `opacity` props rather than rendering the decor at full strength.                                                                                                                                                      |
| `91:3583`, `91:3543` | The Tribe Capital `Contour` and the Global Solutions `Orbit arcs` are positioned against their own **panels** (1280 / 520 wide), not the 1440 artboard.                     | Placed on the panel itself rather than through `DecorLayer`, whose stage is the artboard.                                                                                                                                                |
| `85:986`             | The hero `Service index` rows and the four "Explore …" CTAs point at `/services/{pillar}` — routes that do not exist yet.                                                   | Rendered as real links, exactly as the header's Services dropdown already renders them. No page is stubbed to make them resolve; they 404 until Phase 5.7+.                                                                              |
| `87:1542`            | `08 · Services across sectors` is a 3-column map (380 / 377 / 377). Only Training and Advisory have columns — Global Solutions and Tribe Capital are not mapped to sectors. | Built as a list that stacks below 1280. Each cell keeps its column label in the DOM at every width (`desktop:sr-only`), so assistive tech never depends on the viewport.                                                                 |
| `85:1123`            | `Service copy` padding is asymmetric — 64/56/64/64 — which is what keeps the H2 on one line at 640.                                                                         | Reproduced exactly; with symmetric 64 padding the title wrapped and the section ran 87px long.                                                                                                                                           |
| —                    | No tablet or mobile Services frames exist in Figma.                                                                                                                         | 768 and 375 layouts are token-based adaptations, pending design review.                                                                                                                                                                  |

### 2026-11-13 — Footer Company column (client instruction)

| Node       | Change / divergence                                                                                                                                                                                                                                                | Impact                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `179:9683` | **Client instruction:** in the `Layout=Original` footer, **Newsletters** is removed from the `Column / Company` and **Training Programs** takes its place (fourth position), linking to the built `/training-programs` route. Figma still draws Newsletters there. | Build intentionally differs from Figma. It now agrees with `Layout=Modern`, whose Company column already listed Training Programs.                                            |
| —          | With the Phase 3 header removal, **Newsletters now has no entry point in the site chrome at all**. The newsletter pages and the homepage newsletter section are untouched, and Newsletters is NOT to be re-added to the header.                                    | One content-layer change (`footerCompany` in `site.ts`); the footer component, layout, typography, spacing and hover styles are unchanged. Footer still measures 760 at 1440. |

### 2026-11-13 — Phase 5.7 Training & Capacity Building service detail

Baseline read from `B · Service Detail Template — Training & Capacity
Building` (`56:329`), 1440 × 6534: Header 128, seven content sections,
Footer 760.

| Section                           | Node     | Figma | Built |
| --------------------------------- | -------- | ----: | ----: |
| 01 · Service hero                 | `56:380` |   640 |   640 |
| 02 · Overview & value proposition | `56:393` |   656 |   656 |
| 03 · Modules                      | `56:423` |  1356 |  1354 |
| 04 · Imagery & outcomes           | `56:462` |   860 |   860 |
| 05 · Methodology                  | `56:492` |   688 |   688 |
| 06 · Related services             | `56:530` |   874 |   874 |
| 07 · Enquiry CTA                  | `56:673` |   572 |   572 |

| Node     | Change / divergence                                                                                                                                                           | Impact                                                                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `56:380` | The hero is an instance of `Service Hero` and the cards of `Service Module`; both component sets carry a `Segment` axis, and `B2` (`56:761`) shows all four segment variants. | Built as reusable, hue-parameterised section components. Phase 5.7 ships the Violet instance only; the other three services are 5.8+ and were NOT started. |
| `56:679` | **Only one CTA in the frame has a prototype reaction**: `07`'s `Request a consultation` → `Overlay · Request a consultation` (`111:7556`).                                    | Wired to the shared consultation popup via `ClosingCta`.                                                                                                   |
| `56:380` | The hero's `Enquire about this service` button has **no** prototype reaction, so its destination is unspecified by the design.                                                | Links to `/contact`, which renders the same enquiry form inline — consistent with `Enquire about training` on the Services Overview. ⚠️ Worth confirming.  |
| `56:393` | Section `02` has no section heading component — a bare `OVERVIEW` overline plus an H2, with the value list in the right column.                                               | Built as drawn rather than forcing the shared `SectionHeading`.                                                                                            |
| `56:462` | The `Outcomes` and `06 · Related services` headings both have their `Description` slot **hidden** (placeholder copy left in the layer).                                       | Rendered without a description. The hidden placeholder text is not shipped.                                                                                |
| `56:465` | The collage circle is 280 at (320, 340) of a 600 × 620 box, with an 8px white ring overlapping the portrait's lower-right.                                                    | Positioned in percentages of that box, so the overlap holds at every width. The collage box drives the section height (860), not the outcome list (816).   |
| `56:541` | The Advisory related-services card carries **shorter copy** than the portfolio description in `home.ts`.                                                                      | Transcribed as drawn; the other two cards use the portfolio copy, which matches.                                                                           |
| `85:986` | **Client instruction (Phase 5.7):** the Services Overview hero is capped at 64/72 on desktop, matching the homepage hero. Figma draws it at `Display/Hero` 72/80.             | That one heading only. Tablet/mobile unchanged; the token is untouched; every other page still renders 72/80. Build intentionally differs from Figma.      |
| —        | No tablet or mobile Service Detail frames exist in Figma.                                                                                                                     | 768 and 375 layouts are token-based adaptations, pending design review.                                                                                    |

**Unrelated defect noticed, NOT fixed (out of Phase 5.7 scope):**
`src/components/sections/about/page-hero.tsx:54` carries the class
`text-desktop-heading-h1--line-height` — a raw token variable name used as a
utility. It has no breakpoint prefix, so it sets `font-size: 64px` at every
width; at 375 the About hero renders 64px glyphs on a 44px line-height. It
should almost certainly read `desktop:text-desktop-heading-h1`.

### 2026-11-13 — Phase 5.8 Advisory & Management Consulting + Training refinements

**Figma changed.** `B · Service Detail Template — Training & Capacity
Building` (`56:329`) is now 1440 × 6406 (was 6534).

| Node     | Change                                                                                                                                                                                                        | Impact                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `56:393` | `02 · Overview` 656 → **528**. The lead paragraph moved from the top of the right value column into the left `Statement` column, under the H2 (gap 24). `Statement` 144 → 264; `Value proposition` 416 → 288. | Applied. Built section now measures 528, matching exactly. |
| `56:492` | `05 · Methodology`: `Step 04` gained a `Connector` (224 × 2, `white/a24`) — all four steps now have one, so the line runs past step 04.                                                                       | Applied. Section still measures 688.                       |

**Advisory & Management Consulting — no detail frame exists.**

| Node      | Finding                                                                                                                                                                                                                                        | Impact                                                                                                                                                                         |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `56:761`  | `B2` supplies only the **hero** for each of the four segment variants. The Pink hero gives breadcrumb, `SERVICE 02`, title, intro, CTA label, `segment/pink/solid` (#bb0271) and image `0a6d50f1`.                                             | Built from this. The 3-line title makes the hero 666 tall against the component's nominal 640 — the design overflows its own fixed frame; the build grows instead of clipping. |
| `85:1123` | The Services Overview Advisory panel supplies the four module names and descriptions.                                                                                                                                                          | Read straight from `content/services.ts`, so the two pages cannot drift.                                                                                                       |
| —         | **No Advisory copy exists** for the template's Overview statement + three value propositions, the per-module `SCOPE` lines, the outcomes list + two-image collage, or the four methodology steps. The Training versions are training-specific. | Those sections are NOT built (§6: do not invent). The components take content as props, so each drops in unchanged once copy arrives.                                          |
| —         | Figma draws no Advisory enquiry panel.                                                                                                                                                                                                         | `07` reuses the approved, service-neutral closing CTA from `B0 · Services Overview` (`85:1370`). ⚠️ Confirm whether Advisory should get its own.                               |
| —         | The Modules section heading is not drawn for Advisory.                                                                                                                                                                                         | Marked `@placeholder`: the Training heading re-pointed at advisory work, so the section is not headless. Needs client approval.                                                |

### 2026-11-13 — Phase 5.10 Tribe Capital service detail

Phase 5.9 (Global Solutions) was skipped; `/services/global-solutions` is
still `pending` and 404s.

| Node       | Finding / divergence                                                                                                                                                                         | Impact                                                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `56:761`   | `Service Hero / Segment=Yellow` fills `#FFBE2C` and draws breadcrumb, overline, title and intro in **navy `#070052`**, not white. The CTA label stays violet (the `Button/Inverse` default). | `SERVICE_HUE` gained `surface`, and the hero now uses `{hue}/on-solid`. Verified: navy on yellow, violet CTA label. Other heroes unchanged.     |
| `104:5829` | `03 · Tribe Capital enquiry`, 1440 × 1529 — a `segment/yellow/soft` panel: packages left (440), inline `Form/Tribe Capital Enquiry` right (670).                                             | Built as the page's enquiry section (1564 at 1440, +35 on Figma from form control heights). Replaces the template's generic `07 · Enquiry CTA`. |
| `111:7297` | `Form/Tribe Capital Enquiry` has six states, including `State=Acknowledgement`.                                                                                                              | Default/Focused/Error/Submitting are built from the shared form components. **Acknowledgement is deliberately unreachable** — no backend (§9).  |
| `111:7432` | `Form/Package Option` draws a **20px radio** at the left of each card, with the timeline in `#805F16`.                                                                                       | The Phase 2 component had no radio and used `text/muted`. Corrected to match Figma; it is used only by this form.                               |
| `91:3583`  | Package names, timelines, the `PROVISIONAL` badge, the `TO CONFIRM` badges and the provisional caption.                                                                                      | Read from `content/services.ts`, so the Services Overview, this page and the form selector cannot drift.                                        |
| —          | **No Tribe Capital copy exists** for the template's Overview + value propositions, Modules, Outcomes + collage, or Methodology steps.                                                        | Those sections are NOT built (§6). No eligibility, rates, returns, conditions or client outcomes were invented.                                 |
| —          | Figma gives no validation or "not sent" copy for this form.                                                                                                                                  | Marked `@placeholder` in `service-capital.ts`; needs client approval.                                                                           |

### 2026-11-13 — Phase 5.9 Global Solutions service detail

Built after 5.10, having been skipped. All four service detail routes now
exist and `pendingRoutes()` returns an empty list.

| Node      | Finding / divergence                                                                                                                                 | Impact                                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `56:761`  | `Service Hero / Segment=Orange` fills `#BE4B2C` with **white** breadcrumb, overline, title and intro; the CTA label stays violet.                    | Built from this; hero measures 640, the template's exact height.                                                                                            |
| `91:3543` | The Services Overview draws the three Global Solutions modules as **name-only** cards (208 × 68: number + name) in a single row — no descriptions.   | `ServiceDetailModule.description` made optional; `ServiceModules` goes three-up when the module count divides by 3. Training/Advisory unchanged.            |
| —         | **No per-module descriptions exist anywhere in the file.** A document-wide text search found only the service description and the bare module names. | Modules ship name-only. Nothing invented (§6); the client copy needed is listed in `service-global.ts`.                                                     |
| `F · FAQ` | `Topic 04 · Global Solutions` → `Topic header` carries the approved line "Networking and digital platforms that sustain value."                      | Used as the modules section title, so the heading is approved copy rather than written here — unlike the Advisory modules heading, which is `@placeholder`. |
| `91:3543` | Three `Badge/Tone=Orange` chips: `NETWORKING`, `DIGITAL PLATFORMS`, `SUSTAINABLE VALUE`.                                                             | Rendered under the module row via the new optional `chips` prop.                                                                                            |
| —         | **No Global Solutions copy** for the template's Overview + value propositions, Outcomes + collage, or Methodology steps.                             | Those sections are NOT built (§6). The components take content as props, so each drops in once copy arrives.                                                |
| —         | Figma draws no Global Solutions enquiry panel.                                                                                                       | `07` reuses the approved service-neutral closing CTA (`85:1370`), as on the Advisory page. ⚠️ Confirm whether it should get its own.                        |

### 2026-11-16 — Phase 6.0 Forms, overlays and mocked submission

No Figma change. This phase closed the gap between the designed form
states and the reachable ones.

| Node       | Finding                                                                                                                                            | Impact                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `111:6601` | `Form/Consultation` has six states; `State=Acknowledgement` had never been built because nothing can resolve `{ ok: true }`.                       | Built as the shared `Acknowledgement` component. Reachable only on success, i.e. never in production.                                     |
| `111:7297` | `Form/Tribe Capital Enquiry` draws an identical acknowledgement panel.                                                                             | Same component, different copy. One implementation, not two.                                                                              |
| both       | Figma puts `Badge/Tone=Placeholder` **"DRAFT WORDING — PENDING CLIENT APPROVAL"** on both acknowledgements, and both promise a confirmation email. | Badge ships with the copy; marked `@placeholder`. ⚠️ Wording, sender and routing of that email are all unspecified (§9).                  |
| `95:5568`  | `Modal/Registration` has only `State=Default` and `State=Validation` — **no acknowledgement and no loading state are designed**.                   | Gave it the missing transport and `Loading` state; on success the dialog closes. No success surface invented. ⚠️ Worth a design decision. |
| —          | The registration popup had **no transport at all**: a valid submit set a local flag and showed the notice directly, so `Loading` was unreachable.  | Added `lib/submit-registration.ts`; it now matches the other three forms.                                                                 |
| —          | Radix Dialog 1.3.1 does not set `aria-modal`; it hides the background instead.                                                                     | Not a defect. Verified behaviourally: background content cannot be focused while a dialog is open.                                        |

### 2026-11-16 — Phase 7 responsive & accessibility audit

No Figma change. 12 routes × 3 widths, axe-core 4.14.0 (WCAG 2.0/2.1 A+AA),
plus every dialog, dropdown and form open state.

Three code defects fixed; see CLAUDE.md §9.4. The remaining 33 violations
are all `color-contrast` and all faithful to Figma — a palette decision,
logged as open decision #13 rather than changed unilaterally (§1).

| Node                | Finding                                                                                                                                                                          | Impact                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `54:95` (About)     | The `Value / Commitment` numeral "04" is `yellow/500` `#FFBE2C` on white — **1.65:1** against the 3:1 WCAG AA needs for large text. The sharpest contrast failure in the design. | Reported, not changed. A darker `segment/yellow/text` would fix it.                |
| `85:923` (Services) | Index numeral "03" is `orange/500` on `background/subtle` — 2.86:1. Figma's own Global Solutions module numbers use `orange/700`, so the palette already has the fix.            | Reported. The detail pages now use `orange/700` for the same element.              |
| `54:95`, `108:5091` | Copy on violet cards is `white/a72` on `violet/500` — 3.69:1 against 4.5:1.                                                                                                      | Reported. Full-white would fix it.                                                 |
| `Badge/Tone=Orange` | `orange/700` on `orange/soft` — 4.38:1 against 4.5:1, 16 instances.                                                                                                              | Reported. Marginal; a slightly darker orange or a denser soft fill would clear it. |
| —                   | Radix NavigationMenu renders a 1×1 `aria-hidden` focus proxy with `tabindex="0"`, which axe flags as `aria-hidden-focus`.                                                        | Library internal; not fixable in our markup.                                       |

---

### 2026-11-17 — Contact Us: Google Maps links & phone actions

**Client instruction, not a Figma change.** Figma is unchanged and still draws
the two office rows as plain `Contact Option` cards with no action.

| Change                                                                                                                                             | Impact                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Both office rows on `/contact` are now links to Google Maps, searching the complete address verbatim, `target="_blank" rel="noopener noreferrer"`. | Implemented. The drawn card is unchanged; being a link adds the component's existing `State=Focus` and a pointer cursor.    |
| No visible "Directions" action label was added.                                                                                                    | Deliberate. Figma's action slot would reflow the two-line addresses; the instruction was to preserve the displayed address. |
| `rel` on external contact rows changed from `noreferrer` to `noopener noreferrer`.                                                                 | Also affects the Website row. Strictly additive.                                                                            |
| Asia and Africa "Call →" actions remain non-clickable.                                                                                             | **Unchanged by design.** Both numbers are still unconfirmed — open decisions #3 and #4. See §6.3.                           |

The footer carries the same two addresses and was **not** changed: the
instruction scoped this to the Contact page, and the footer appears on every
route. Awaiting a decision on whether it should match.

---

### 2026-11-18 — Figma changes detected and synced

Read live from Figma (read-only). Figma was **being edited while this sync
ran**: the two Home images were swapped mid-session (hashes `cf18d52f99` /
`ae673e461e` at 05:3x, then `f18ffee31e` / `66b9b4fbcb`, with the nodes
re-created as `388:7746` / `388:7748`). The images below are those present at
the time of export; re-check Home before relying on them.

All baseline frame sizes are unchanged (Home 9363, About 6544, Industries 8615,
Services 8999, Contact 3538, Service template 6406).

| Node                                               | Change                                                                                                                                                                                                                                                                               | Implemented                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `46:95` Home — `388:7746`, `388:7748`              | Hero arch and brand-introduction photographs replaced (both AI-generated, OpenAI C2PA). Crops are plain `FILL`.                                                                                                                                                                      | ✅ `home-hero.jpg`, `home-intro.jpg`                                                     |
| `54:95` About — `54:161`/`54:162`                  | `WORKING GLOBALLY` caption copy rewritten: "Delivering expertise across hospitality, manufacturing, healthcare, technology, and the public sector to drive sustainable growth and lasting transformation." Card is now 400 × 192, 15 px from the bottom (was 18); text box 353 wide. | ✅ copy verbatim; offset and wrap matched                                                |
| `54:163` About — `OUR POSITIONING`                 | **No change found.** Eyebrow, H2, lead, body and pull quote all match their Figma styles at 1440 / 1280 / 1536 / 768 / 375; live render vs Figma: mean diff 0.78/255.                                                                                                                | — nothing to fix                                                                         |
| `57:502` Industries — `57:594`, `57:652`, `57:710` | Hospitality, Healthcare and Conglomerates photographs replaced. Healthcare's `CROP` fill pans the photo right by 0.1485 × 1880 px.                                                                                                                                                   | ✅ three new files; Healthcare box `left −11.17%`                                        |
| `85:923` Services — `85:1156`                      | Advisory panel photograph replaced (AI-generated). `CROP` a 0.4211, tx 0.2014.                                                                                                                                                                                                       | ✅ `services-advisory-meeting.jpg`, `object-position 34.8%`                              |
| `90:4009` Contact — `90:4092`                      | Hero photograph replaced **and the arch window resized**: 520 × 660 at (65, −40) in the 540 × 620 stage, was 460 × 620 at x 80. `CROP` a 0.59, tx 0.2198.                                                                                                                            | ✅ `contact-hero-conversation.jpg`, `object-position 53.6%`, new window from `tablet` up |
| `56:329` Service template — `56:543`               | Related Services Advisory card now uses the new Advisory photograph (`FILL`, centred). Global and Tribe Capital cards unchanged.                                                                                                                                                     | ✅ all four detail pages                                                                 |
| `56:761` B2 — Pink hero                            | Advisory hero is a `CROP` of the new photograph (a 0.6331, tx 0.0897).                                                                                                                                                                                                               | ✅ `object-position 24.4%`                                                               |
| `56:761` B2 — Orange hero                          | Global Solutions hero is a `CROP` (a 0.6331, tx 0.367) → `object-position 100%`. The build centres it (MAD 61.2 vs 1.2).                                                                                                                                                             | ⚠️ **not changed** — outside this brief; one content line                                |
| `367:7271`, `376:7285`                             | **New** `Shared images` (11 items) and `Other images` (5 items) sections: the client's image library, named by filename, no attribution.                                                                                                                                             | — reference only                                                                         |
| `227:10051`                                        | `Home — Desktop Copy` — a duplicate of the Home frame. Not canonical (§1).                                                                                                                                                                                                           | — ignored                                                                                |
| Design System                                      | 299 variables, 42 text styles; `font/family/brand` = `Sofia Sans Semi Condensed`. All 42 styles match `tokens.css` exactly.                                                                                                                                                          | — verified, no change                                                                    |

**Not changed on purpose:** Training, Why TWT, Careers, Training Programs and
Tribe Capital images — their placed fills are byte-identical to what ships,
or visually identical (mean diff < 7/255).

**Credits:** none recorded. No source or photographer exists in Figma for any
replaced image, and three carry AI provenance. `credits.ts` still does not
exist (CLAUDE.md §6.4).

---

### 2026-11-18 (second sync) — 404, Homepage CTA, Careers hero, typography

Read live from Figma (read-only).

| Node                                            | Finding                                                                                                                                                                                                                            | Implemented                                                                                           |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| — (searched every page)                         | **No 404 / error-page frame exists.**                                                                                                                                                                                              | ✅ built from tokens; supporting line is `@placeholder`                                               |
| `46:95` Home — `111:5752`, `111:5759`           | The Training Programs block **still draws** `Link · Browse all editions` and `Link · View the archive` (→ newsletters). Not updated for the client's instruction.                                                                  | ✅ by instruction: Browse removed; archive link → "View all Training Programs" → `/training-programs` |
| `95:4335` Careers — `95:4415`                   | Hero arch photograph replaced: hash `8a02d87995` → `3e9ebdf88a` (1122 × 1402, AI-generated, ChatGPT C2PA). Still a plain centred `FILL` in the 460 × 600 arch at x 80 of the 540 × 600 stage.                                      | ✅ `careers-hero-team.jpg`; old file deleted                                                          |
| Design System                                   | **No typography change.** 6,838 of 6,839 text nodes are `Sofia Sans Semi Condensed`; 0 missing fonts; the 42 text styles and `font/family/brand` are unchanged.                                                                    | — font kept (CLAUDE.md §12 has the evidence)                                                          |
| `90:4083` Contact — `Button/Outline` "Email us" | `Show leading icon = true` (a mail icon). **The build omits it.** Pre-existing, outside this brief.                                                                                                                                | ⚠️ **not changed**                                                                                    |
| `90:4074` Contact — H1                          | Figma wraps "Let’s talk about the change that must last." onto 3 lines in its 644 px box; the browser fits it on 2, because the string measures **643.4 px**. Glyph widths agree (Figma ink 542 / 502 px vs 549 / 507 px advance). | ⚠️ **not changed** — a sub-pixel tipping point, not a font difference                                 |
| `249:10668` Training Programs — Winter months   | "December, January, February" wraps in 2 lines in a 134 px box in Figma; 3 lines in a 117 px box in the build.                                                                                                                     | ⚠️ **not changed** — box width                                                                        |

**Typography verdict.** Line counts of 810 Figma text blocks vs the browser at
1440: 791 identical (97.7 %). Pixel diff of real pages vs Figma renders:
Sofia Sans Semi Condensed 0.8–1.6/255 against 3.0–13.2 for Sofia Sans
Condensed, Sofia Sans, Barlow, Fira, IBM Plex, Roboto Condensed, Segoe UI and
Arial. No change to fonts, tokens, sizes, weights, line heights or letter
spacing.

---

### 2026-11-18 (third sync) — Let’s talk email, footer MMXXVI, image re-sync

Read live from Figma (read-only). Every `imageHash` placed in Home, Why TWT,
Services Overview, the Service template (`56:329`), `B2` (`56:761`) and the
Tribe Capital frame was compared with the one shipping; every changed fill was
exported byte-exact, and each crop was checked against Figma's own render of
the node.

**Text**

| Node                        | Finding                                                                                                                                                                               | Implemented                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `46:95` Home — `48:458`     | The closing CTA ("Let’s talk") **still draws `info@theworkingtribe.com`**. Every other frame — footer, About, Why TWT, Contact, service pages — draws `hello@`.                       | ✅ **by client instruction:** `hello@theworkingtribe.com` in `home.ts`; the `mailto:` uses the same field. Deliberate divergence |
| `44:229` `Footer/Desktop`   | Bottom row reads "© **MMXXVI** The Working Tribe. All rights reserved." on every page frame built from it. `Layout=Modern` (`111:8589`) and `Home 3` still read 2026 — neither ships. | ✅ `copyright()` in `site.ts` now defaults to `"MMXXVI"`; one shared footer, so every page changes                               |
| `90:4638` FAQ — `I104:6223` | One FAQ answer still says "email info@theworkingtribe.com".                                                                                                                           | — FAQ is on hold; nothing built                                                                                                  |

**Images** (all exported un-cropped; the crop is CSS)

| Figma node(s)                                              | Hash change                                     | Fill → CSS                                                                                                                                   | New file                                | Pages affected                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `85:923` → `87:1494` Services hero 1280 × 400              | `1b9c9ef2e9` → `9fe45a3bc7` (1205 × 808)        | `CROP` a 1, d 0.466, ty 0.1732 → `object-position 50% 32.4%` (MAD 9.0 vs 63.4 centred)                                                       | `services-hero-presentation.jpg`        | `/services`                                                                                |
| `85:1077` Services Training 560 × 700                      | `325dc6cb3d` → `787927efd3` (803 × 805)         | `FILL` → centred (MAD 1.47)                                                                                                                  | `training-workshop.jpg`                 | `/services`; also the "Training" related card on the Advisory, Global, Tribe Capital pages |
| `108:5091` → `108:5174` Why TWT hero arch 440 × 580        | previous photograph → `787927efd3`              | `FILL` → centred (MAD 3.98 inside the arch mask)                                                                                             | `training-workshop.jpg` (shared)        | `/why-twt`                                                                                 |
| `85:1156` Services Advisory panel 520 × 695                | `e72c59d95d` → `1368bdf91c` (1038 × 800)        | `CROP` a 0.5766, tx 0.2115 → `50% 50%` (MAD 1.06)                                                                                            | `services-advisory-laptop.jpg`          | `/services`                                                                                |
| `56:761` B2 Pink hero 360 × 320                            | `e72c59d95d` → `1368bdf91c`                     | `CROP` a 0.8671, tx 0.0326 → `24.5% 50%` (MAD 5.4 vs 47.6 centred)                                                                           | `services-advisory-laptop.jpg` (shared) | `/services/advisory-management-consulting`                                                 |
| `56:329` → `01 · Service hero` image 720 × 640             | `c850f938e2` → `7d31a8b80e` (1207 × 806)        | `CROP` a 0.7512, tx 0.0825 → `33.2% 50%` (MAD 1.57 vs 43.6 centred)                                                                          | `service-training-hero-seminar.jpg`     | `/services/training-capacity-building`                                                     |
| `56:543` Related card — Advisory 405 × 250                 | `e72c59d95d` → `122c501971` (1185 × 788)        | `FILL` → centred (MAD 4.7)                                                                                                                   | `service-card-advisory.jpg`             | Related services on Training, Global, Tribe Capital                                        |
| `56:553` Related card — Global; `B2` Orange hero 360 × 320 | previous photograph → `4500ddf357` (1442 × 803) | both `FILL` → centred (MAD 3.3 / 6.2). The hero used to be a right-hand `CROP`, so the "Global hero crop" note from the first sync is closed | `service-global-strategy.jpg`           | `/services/global-solutions` hero; Related services on Training, Advisory, Tribe Capital   |

Seven superseded files were deleted: `services-hero.jpg`, `services-training.jpg`,
`why-hero-arch.jpg`, `services-advisory-meeting.jpg`, `service-training-hero.jpg`,
`service-card-global.jpg`, `service-card-global.png`. New file names differ
from the old ones so a CDN or browser cannot serve a stale copy.

**Checked and unchanged**

- **Home `46:95`** — hero `f18ffee31e` and intro `66b9b4fbcb` are exactly the
  two files that already ship (render diff 1.35 / 1.36 out of 255). The intro
  also carries a **hidden** second fill (`787927efd3`, `CROP`) under the visible
  one; it does not render and was ignored.
- **Why TWT** circle `e9d87ae73e` and anchors `732d6ababb`, `96044c1390`,
  `3fc8bfab7a` — pixel-identical to the shipped files (MAD 0.0).
- **Service template** collage `548a62339b` / `1c308bd5ba` and Tribe Capital
  card `9345d93bde`, **Tribe Capital hero** `e67d7a9273` (MAD 1.15) — same
  hashes as before. `104:5829` (Tribe Capital enquiry) holds no image fills.

**Noticed, not acted on** (outside this brief)

- **`54:95` About frame grew 6544 → 6600 (+56).** `02 · Positioning` is now
  678 px tall (was 622, which is also what the build renders). Copy column
  438 px: lead 128, two paragraphs 96 each, pull quote 42. Not synced.
- `227:10051` `Home — Desktop Copy` still exists and carries different Home
  photographs (`c1bf528a3d`, `4932a9571d`). Not canonical (§1); not used.
- `787927efd3` is only **803 × 805 px**. It is drawn at 560 × 700 on the
  Services Overview and 440 × 580 on Why TWT, so it will look soft on
  high-density screens. A larger original would fix it.

**Credits:** none recorded. None of the six new files carries C2PA or any
attribution, and Figma names no photographer, so `credits.ts` still does not
exist (CLAUDE.md §6.4).

---

### 2026-11-18 (fourth sync) — Home images, About Positioning, Tribe Capital breadcrumb, Contact map links

Read live from Figma (read-only).

| Node                                      | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Implemented                                                                                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `46:95` Home — `417:10991` hero arch      | The Home frame's image nodes were **re-created**. Hero is now hash `c1bf528a3d` (1442 × 802; was `f18ffee31e`, 1122 × 1402) — a `CROP` of a 520 × 680 window: a 0.4253, tx 0.3056.                                                                                                                                                                                                                                                                     | ✅ `home-hero-colleagues.jpg`, `object-position 53.2% 50%` (MAD 2.58 vs 39.0 centred); `home-hero.jpg` deleted                                                  |
| `46:95` Home — `417:10993` intro          | Intro is now hash `4932a9571d` (1206 × 803; was `66b9b4fbcb`, 1122 × 1402) — a `CROP`: a 0.541, tx 0.1962. A hidden second fill (`787927efd3`) still sits under it and does not render.                                                                                                                                                                                                                                                                | ✅ `home-intro-digital-table.jpg`, `object-position 42.8% 50%` (MAD 2.66 vs 31.8 centred); `home-intro.jpg` deleted                                             |
| `54:163` About — `02 · Positioning`       | **Redesigned: 622 → 678 px.** `Copy` column (`54:174`, 744 wide) is a 20 px-gap stack: lead 128, paragraph 96, paragraph 96, pull quote 58 (16 px top padding). The lead **and both paragraphs** are `Desktop/Body/Large` (Light 20/32) in `text/heading` `#070052`; the paragraphs were Body/Regular in `text/body` with a 28 px gap. Label column (440), 96 px column gap, eyebrow, 44/52 title, flow-lines background and pull quote are unchanged. | ✅ `positioning.tsx` only (gap `gap-5`, paragraphs `type.bodyLarge` + `text-text-heading`). Section 678 px; every block at Figma's y; render diff 1.39/255      |
| `56:761` B2 — `Variant / Tribe Capital`   | `Service Hero` → `Breadcrumb` is filled with `segment/yellow/on-solid` = navy `#070052` (rgb 7, 0, 82), 13 px, ls 1, at 100 % opacity. The build fell back to the generic `text/muted` grey.                                                                                                                                                                                                                                                           | ✅ colour only: optional `Breadcrumb` `className`, hero passes `tone.onSolid` on a light surface (Tribe Capital only). Layout, type and links unchanged         |
| `56:761` B2 / `56:380` — the other heroes | The same rule draws the Training, Advisory and Global breadcrumbs in **100 % white** (`segment/{violet,pink,orange}/on-solid`). The build uses `text/inverse-muted` (white 72 %).                                                                                                                                                                                                                                                                      | ⚠️ **not changed** — outside the brief; one prop at each hero would fix it                                                                                      |
| `90:4009` Contact — office cards          | Client supplied the exact Google Maps links: African Region → `https://maps.app.goo.gl/7hQzpkS2upNyhho88` (Accra Office), Asia Region → `https://maps.app.goo.gl/rGe85iydRNUBq2jD9` (China Office). Resolved: the first is _Airport Residential Area, Accra_ (5.604, −0.187); the second _Zhongjun Plaza, Min Hang Qu, Shanghai_ (31.211, 121.313).                                                                                                    | ✅ `Office.mapUrl` in `site.ts`, used verbatim; cards open in a new tab (`rel="noopener noreferrer"`); `lib/maps.ts` deleted; card design and content unchanged |

**Note:** the two Home photographs are the same two that `Home — Desktop Copy`
(`227:10051`) already carried when the third sync noted it — the canonical Home
now uses them. Neither file has C2PA or attribution metadata, and Figma names no
photographer, so no credit exists (CLAUDE.md §6.4).

**Files changed:** `src/content/{home,site}.ts`,
`src/components/sections/home/{hero,brand-intro}.tsx`,
`src/components/sections/about/positioning.tsx`,
`src/components/sections/breadcrumb.tsx`,
`src/components/sections/services/service-detail-sections.tsx`,
`src/components/sections/contact/contact-sections.tsx`; added
`public/images/home-hero-colleagues.jpg` and `home-intro-digital-table.jpg`;
deleted `public/images/home-hero.jpg`, `home-intro.jpg` and `src/lib/maps.ts`.

**Reported, not changed:** both new Home photographs are low-resolution for
their slots (hero: 802 px source height for a 680 px slot, i.e. 1.18×; intro:
803 px for 640 px, 1.25×), so they will look soft on high-density screens.
_(Superseded by the fifth sync below, which replaces both again.)_

---

### 2026-11-18 (fifth sync) — Home photographs: higher-resolution versions and image quality

Read live from Figma (read-only). The two Home image nodes (`417:10991`,
`417:10993`) were updated in place; nothing else on Home carries a photograph
(the programme covers and the closing CTA use SVG decor, not image fills).

**Replaced assets**

| Node (section)                                   | Before (hash, px)                                         | Now (hash, exported px)                                             | New file (stored)                                                               | Fill → CSS                                                                                                                             |
| ------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `417:10991` Hero arch 520 × 680 (`01 · Hero`)    | `c1bf528a3d`, 1442 × 802 (`home-hero-colleagues.jpg`)     | **`4c6066000c`, 1536 × 864** PNG (an unchanged hidden fill remains) | `home-hero-meeting-room.jpg`, 1536 × 864, q95 4:4:4, 430 KB (was 146 KB)        | `CROP` a 0.4277, d 0.9944, tx 0.3051, ty 0.0004 → exact window via `figmaCropStyle()` (MAD 3.3 vs Figma; `object-fit: cover` was 13.4) |
| `417:10993` Intro 520 × 640 (`02 · Brand intro`) | `4932a9571d`, 1206 × 803 (`home-intro-digital-table.jpg`) | **`927f76f4bc`, 1536 × 1024** PNG                                   | `home-intro-digital-workspace.jpg`, 1536 × 1024, q95 4:4:4, 414 KB (was 103 KB) | **now a plain `FILL`** (was a `CROP`) → centred `object-cover` (MAD 1.4 vs Figma)                                                      |

Both exports are Figma's own bytes, sRGB, with no ICC profile; **never resized
or upscaled**. Both carry OpenAI `gpt-image` C2PA credentials (AI-generated), so
there is no photographer credit. `home-hero-colleagues.jpg` and
`home-intro-digital-table.jpg` were deleted. Frame sizes are unchanged (hero
864, intro 1084).

**What made the images look dull and low-quality** (measured in Chrome against
the ideal Lanczos downscale of the full-resolution original; detail =
sharpness relative to the ideal, 1.0 = identical):

| Cause                                                                                                                                                                                                                                                                                                                      | Evidence                                                                                                                                                                                | Fixed                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **1. `sizes` described the slot, not the photo (the main cause).** Landscape photos are cropped into portrait slots, so they are painted 2.3× (hero) and 1.85× (intro) wider than the 520 px slot. `sizes="520px"` made the optimizer serve a **640 px** file that the browser then stretched about **1.9×** (2.2× at 2×). | At 1440 / 1×: hero served `w=640` (640 × 360), **detail 0.35**; intro `w=640`, detail 0.52. At 2×: `w=1080`, detail 0.53 / 0.59. The browser was painting ~1216 px from 640 px of data. | ✅ `sizes` now states the painted width; hero is served 1536 × 864, intro 1080–1536 px   |
| **2. WebP quality 75** on large, smooth, AI-generated gradients (sky, walls), which band and lose texture.                                                                                                                                                                                                                 | `q=75` in every served URL.                                                                                                                                                             | ✅ `quality={90}` + `images.qualities: [75, 90]` in `next.config.ts` (Next 16 allowlist) |
| **3. The stored JPEGs were over-compressed:** q86 with 4:2:0 chroma subsampling.                                                                                                                                                                                                                                           | PSNR against the PNG original: **37.8 dB** (hero) / 39.5 dB (intro); q95 4:4:4 gives 44.0 / 45.2 dB.                                                                                    | ✅ q95 4:4:4 mozjpeg                                                                     |
| **4. Crop was ~2–4 px off** (hero only): Figma's window zooms a further 0.56 % and is top-anchored; cover cannot express that.                                                                                                                                                                                             | MAD vs Figma's render 13.4 (cover) → **3.3** (exact window).                                                                                                                            | ✅ `lib/figma-crop.ts`                                                                   |
| _Not causes:_ CSS opacity / filter / blend / overlay (none on either photo or any ancestor; only the Kaizen card sits over the hero), colour profile (originals are untagged sRGB), `object-fit`, Next `unoptimized`.                                                                                                      | Computed-style walk up the DOM + `elementFromPoint` grid: 30/36 and 36/36 sample points are the photo itself; the rest is the card.                                                     | —                                                                                        |

**After** (production build via `next start`, dev server and static export all
agree): 1440 / 1× — hero served **1536 × 864, q90, detail 0.82** (static
original file 0.83), intro **1080 × 720, detail 0.78** (original file 0.95); at
2× both are served at the full 1536 px (the source's real resolution — never
upscaled on the server). Against Figma's own node renders: hero 3.3 / 3.6
(1× / 2×), intro 1.4 / 1.2 out of 255; against Figma's section frames at 1440
(hero photo half 2.0, intro 1.4–1.7). At 768 and 375 the same checks hold
(sub-pixel placement aside). No broken images, no layout shift (CLS < 0.01),
no horizontal overflow.

**Known, unchanged:** the hero headline is 64/72 on desktop by client
instruction while Figma draws 72/80, which is why a whole-section comparison of
the hero reads ~10/255 — the photograph half is 2.0.

**Files changed:** `src/content/home.ts`,
`src/components/sections/home/{hero,brand-intro}.tsx`, `next.config.ts`; added
`src/lib/figma-crop.ts`, `public/images/home-hero-meeting-room.jpg` and
`home-intro-digital-workspace.jpg`; deleted `public/images/home-hero-colleagues.jpg`
and `home-intro-digital-table.jpg`.

**Same problem on other pages — reported, NOT changed (Home only, per the
brief).** Scan of every route at 1440 / 1×: images served at less than 90 % of
the width they are painted at. Fix is the same: correct `sizes` (and, where
smooth gradients band, `quality`).

| Page                                       | Image                               | Painted |  Served | Served / painted |
| ------------------------------------------ | ----------------------------------- | ------: | ------: | ---------------: |
| `/training-programs`                       | `training-winter.jpg`               | 1120 px |  640 px |             0.57 |
| `/industries`                              | `training-summer.jpg`               |  604 px |  384 px |             0.64 |
| `/industries`                              | `ind-healthcare-team.jpg`           | 1880 px | 1206 px |             0.64 |
| `/services/global-solutions`               | `service-global-strategy.jpg`       | 1149 px |  750 px |             0.65 |
| `/about`                                   | `about-philosophy.jpg`              |  959 px |  640 px |             0.67 |
| `/services`                                | `services-advisory-laptop.jpg`      |  906 px |  640 px |             0.71 |
| `/contact`                                 | `contact-hero-conversation.jpg`     |  881 px |  640 px |             0.73 |
| `/training-programs`                       | `training-summer.jpg`, `-autumn`    |  853 px |  640 px |             0.75 |
| `/services/tribe-capital`                  | `service-capital-hero.jpg`          |  960 px |  750 px |             0.78 |
| `/services/training-capacity-building`     | `service-training-hero-seminar.jpg` |  958 px |  750 px |             0.78 |
| `/industries`                              | `ind-public.png`                    |  800 px |  640 px |             0.80 |
| `/services/advisory-management-consulting` | `services-advisory-laptop.jpg`      |  864 px |  750 px |             0.87 |
| `/training-programs`                       | `training-spring.jpg`               |  720 px |  640 px |             0.89 |

The static export is unaffected (it serves the original files); this concerns
`npm run dev`, `npm run build` + `npm start`, or any host that runs the Next.js
image optimizer.
