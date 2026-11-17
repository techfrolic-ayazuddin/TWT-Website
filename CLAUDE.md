# The Working Tribe — Website

Next.js App Router frontend for The Working Tribe (TWT), built from the approved
Figma designs.

- **Figma file:** `The Working Tribe Website` — `fvvCEIlOGqFy33Tdw3eUSI`
- **Figma pages:** `🎨 Design System`, `🏠 Home — Desktop`, `Inner Pages`
- **MCP bridge:** `figma-console` (Figma Desktop Bridge)

---

## 1. Source of truth

**Figma is the source of truth for all approved visual design.** When code and a
written summary disagree, re-read the Figma node. Do not rely on a previous
summary, a screenshot, or this file's own description when the value can be read
from Figma directly.

**`Home — Desktop` (node `46:95`) is the canonical homepage.**
`Home 2 Desktop` (`113:8483`) and `Home 3 Desktop` (`113:8733`) are alternative
explorations. **Never** implement from them.

**Never modify the Figma file.** Figma MCP is **read-only** for this project. No
renaming layers, re-binding variables, "tidying" components, or fixing design
bugs in Figma. If a design looks wrong or a token is missing, stop and report it
— a design change is a separate, client-approved activity.

---

## 2. Design & development workflow

1. **Figma is the design source of truth.** Claude Code never edits it.
2. **Build only pages whose Figma designs are final.** A frame that exists is not
   a frame that is approved. If finality is unclear, ask — do not assume.
3. **Individual pages are built only after they are marked final in Figma.**

### Phase plan

| Phase   | Scope                                                                                               | Status                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 0 | Audit, tooling, project scaffold                                                                    | ✅ complete                                                                                                                                                                                                                                                                                                                                                                                               |
| Phase 1 | **Design tokens and fonts only** — token stylesheet, self-hosted brand font, `/dev/tokens` specimen | ✅ complete (2026-11-11)                                                                                                                                                                                                                                                                                                                                                                                  |
| Phase 2 | Reusable UI primitives and form components, built from the Figma component sets                     | ✅ complete (2026-11-11)                                                                                                                                                                                                                                                                                                                                                                                  |
| Phase 3 | Global layout — Header (`Grouped Dropdown`), Footer (`Original`), Container/Section/MainLayout      | built 2026-11-11, awaiting review                                                                                                                                                                                                                                                                                                                                                                         |
| Phase 7 | Responsive and accessibility audit across every completed route                                     | ✅ audited 2026-11-16, awaiting review                                                                                                                                                                                                                                                                                                                                                                    |
| Phase 6 | Forms, overlays and mocked submission states                                                        | ✅ built 2026-11-16, awaiting review                                                                                                                                                                                                                                                                                                                                                                      |
| Phase 4 | Page assembly, one finalised Figma frame at a time                                                  | homepage, About (5.1), Why TWT (5.2), Careers (5.3), Training Programs, Industries (5.4), Contact Us (5.5), Services Overview (5.6), Training & Capacity Building (5.7) Advisory & Management Consulting (5.8, partial), Tribe Capital (5.10, partial) and Global Solutions (5.9, partial) built, awaiting review. **All four service detail pages now exist**; the remaining inner pages are not started |

Phases 2–3 produced the component library and the global chrome only — **no
pages and no new routes.** Page assembly is Phase 4 and must not be started
early.

### `DESIGN-CHANGES.md`

[`DESIGN-CHANGES.md`](DESIGN-CHANGES.md) tracks Figma changes so Claude Code can
tell which frames need re-checking rather than re-reading the whole file. It
holds the verified design baseline (node ids for every page, section and
component set) plus a dated change log.

- Add an entry whenever a Figma change is noticed: date, node id, what changed,
  and whether shipped code needs revisiting.
- Compare against the recorded baseline rather than memory.
- No entry there authorises a code change; it is a prompt to re-verify.

---

## 3. Design tokens

All visual values come from the Figma variable collections (299 variables across
6 collections) — never from eyeballed hex codes or arbitrary pixel values.

| Collection        | Count | Covers                                                                    |
| ----------------- | ----- | ------------------------------------------------------------------------- |
| `Primitives`      | 56    | raw ramps: `violet/500`, `neutral/0`, `white/a72`                         |
| `Color`           | 65    | semantic roles: `text/heading`, `background/brand`, `border/focus`        |
| `Segment`         | 36    | per-service hues: `segment/{violet,pink,orange,yellow}/{solid,soft,text}` |
| `Spacing & Shape` | 36    | `space/*`, `radius/*`, `stroke/*`, `size/*`                               |
| `Layout`          | 24    | `breakpoint/*`, `container/*`, `margin/*`, `gutter/*`, `section-y/*`      |
| `Typography`      | 82    | `font/family/brand`, `font/weight/*`, `type/{desktop,tablet,mobile}/*`    |

Rules:

- **Use semantic tokens, not primitives, in components.** Reach for
  `text/heading`, not `neutral/900`. Primitives exist to define semantics.
- **Do not hardcode** a colour, spacing, radius, font size or line height that a
  token already expresses. No `#6242FB`, no `p-[23px]`, no `text-[44px]`.
- Each service page stays **monochromatic in its own segment hue** (Brand
  Guidelines rule). Drive this from the `Segment` tokens via a typed `segment`
  prop — never by hand-picking colours per page.
- Typography tokens are **per breakpoint** (`type/desktop/*`, `type/tablet/*`,
  `type/mobile/*`). Respect the three-step scale; do not interpolate.

### 3.0 The tokens are implemented — use them

As of Phase 1 all 299 variables, 42 text styles, 9 effect styles and 4 paint
styles live in [`src/styles/tokens.css`](src/styles/tokens.css), imported by
`globals.css`. The Figma → Tailwind mapping, the naming rule and the
judgement calls are documented in [`design/TOKENS.md`](design/TOKENS.md); the
read-only extraction script is
[`design/extract-tokens.figma.js`](design/extract-tokens.figma.js).

Three things that will bite if you do not know them:

1. **Tailwind's stock scales are cleared.** There is no `bg-red-500`, no
   `text-xl`, no `rounded-3xl`. Every utility traces to Figma.
2. **Responsive variants are `tablet:` and `desktop:`** — `sm:` `md:` `lg:`
   `xl:` `2xl:` no longer exist.
3. **Primitives generate no utilities.** `bg-violet-500` does not exist; use
   `bg-background-brand`. The semantic-only rule above is enforced structurally.

Do not hand-edit values in `tokens.css`. Change Figma, re-extract, regenerate.

### 3.1 Legitimate token exceptions

Not every value in a design is a design token, and **development must not stop
because a one-off value has no token.** Legitimate exceptions include:

- Image crop dimensions and focal-point offsets
- Newsletter cover image rotations
- Industries marquee speed, track width and edge-fade distances

For these: use the literal value, keep it in one place, and add a short comment
explaining where it came from. They are to be collected into a single commented
`design-exceptions` file once there are enough to warrant it.

> Do not create that file during an unrelated task — it is a documented
> requirement, not a Phase 1 deliverable.

What has **not** changed: if a value _does_ have a token, use the token. If a
_systematic_ value (a colour, a type step, a spacing step) is missing from the
token set, that is a gap — report it rather than inventing a token or inlining
the value.

---

## 4. Components

**Convert Figma component variants into typed React props.** A Figma variant
axis becomes a union-typed prop with the same name and the same options.

```tsx
// Figma: Card/Service — Segment:[Violet|Pink|Orange|Yellow] State:[Default|Hover|Focus]
type ServiceCardProps = {
  segment: "violet" | "pink" | "orange" | "yellow";
  title: string;
  description: string;
  // `State` is interaction, not a prop — express it as :hover / :focus-visible.
};
```

- Variant axes that describe **interaction** (`State`, `Open`, `Checked`) are
  CSS states or component state — not props set by the caller.
- Variant axes that describe **appearance or content shape** (`Segment`, `Size`,
  `Layout`, `Tone`, `Align`, `Type`, `Motion`, `Position`) are props.
- Figma `BOOLEAN` properties (e.g. `Show description`) map to optional props;
  prefer making the content prop optional over adding a separate boolean flag.
- Match the Figma component's name so the mapping stays greppable.

**Header, Footer, Service Portfolio and the Industries marquee each have more
than one variant.** Which one ships is a client decision, not a developer one —
see §10.

---

## 5. Content is separate from presentation

Website copy **never** lives inside a component file. It lives in typed modules
under `src/content/`, and components receive it as props or read it through a
typed accessor. This keeps a future CMS integration a data-layer swap rather
than a UI rewrite.

- Components take data in; they do not reach out for it.
- Every content module is typed, and that type is the contract a CMS must later
  satisfy.
- No copy in JSX except genuinely structural microcopy (e.g. a visually-hidden
  "Skip to content").

---

## 6. Content status

Mark anything unconfirmed with a consistent, greppable marker:

```ts
/** @placeholder Awaiting client confirmation — Spring Training venue & date. */
```

**Do not invent client-approved content.** Never write plausible-sounding copy,
a testimonial, a client name, a statistic, a case study or a service description
that was not supplied. If copy is missing, render the approved placeholder and
flag it.

### 6.1 Training programmes — CONFIRMED

The four seasonal programmes are **client-confirmed**. Source:
`../Spring Training.docx`; verified against Figma (`Home — Desktop` and
`Inner Pages`).

| Programme           | Topic                             | Months             | Audience                                                                        | Format          |
| ------------------- | --------------------------------- | ------------------ | ------------------------------------------------------------------------------- | --------------- |
| **Spring Training** | Executive Leadership Skills       | March–May          | Line managers, SME owners, management trainees, undergraduates                  | Virtual Meeting |
| **Summer Training** | Building a Culture of Innovation  | June–August        | Non-executives, enterprise business owners, undergraduates, management trainees | Virtual Meeting |
| **Autumn Training** | Embracing AI to Scale Up Business | September–November | Entrepreneurs, management trainees, undergraduates                              | Virtual Meeting |
| **Winter Forum**    | The Woman Mentorship Forum        | December–February  | Open to all                                                                     | Virtual Meeting |

**Winter Forum** additionally carries a **Panel**: diverse industries, run as
hyper-interactive, open case scenarios for discussion.

Rules:

- These titles, topics, months, audiences and the Virtual Meeting format are
  **confirmed content** — do not mark them `@placeholder`.
- **Only `Venue` and `Date & time` remain `@placeholder`** — they are sample
  details in both the source document and Figma.
- Use the Figma display titles (e.g. "Building a Culture of Innovation"); the
  source document contains raw casing and typos that are not display copy.
- Do not invent, extend or reword programme information.

> **Superseded:** the earlier "Topic 01–04 — Title to be confirmed" placeholders
> no longer apply. Figma section `07 · Training registration` may still show
> those labels in older frames — the table above wins.

### 6.2 Client voices — CONFIRMED

The approved content for this section, verified in Figma on both
`Home — Desktop` and `Inner Pages`:

> "If you haven't found it yet, keep looking." — **Steve Jobs**

**This is an attributed third-party quotation, not a client testimonial.**
That distinction is load-bearing:

- It is **not** a TWT client, customer or partner, and must never be presented
  as one — no client logo, no company name, no "what our clients say" framing,
  no implication of endorsement.
- Attribute it to Steve Jobs exactly as shown.
- Content modelling should keep it distinct from any future testimonial type,
  so that real testimonials cannot be confused with or slotted into it.
- **TWT still has zero approved client testimonials.** Do not invent one, and
  do not reintroduce placeholder testimonials, names, roles or logos.

> **Superseded:** the earlier holding line _"Client testimonials will be
> featured here soon."_ is no longer the active state.

### 6.3 Contact numbers

Three numbers are in play. All three are present in Figma:

| Region     | Number as supplied | Status                                      |
| ---------- | ------------------ | ------------------------------------------- |
| **USA**    | `+1 315 832 0551`  | Stable — unchanged across all versions      |
| **Asia**   | `1 33 7024 0773`   | ⚠️ Country code **not confirmed**           |
| **Africa** | `233 598 277 323`  | ⚠️ Digits **conflict** with earlier version |

**Unresolved discrepancies — do not resolve these in code:**

- **Africa.** The previously approved number was `+233 59 822 7323`. The newer
  number is `+233 598 277 323`. These are not the same digits
  (`…598227323` vs `…598277323`). Client confirmation required.
- **Asia.** No confirmed country code. Figma currently renders it as
  `+1 33 7024 0773`, which reads as two different dialling prefixes concatenated
  and is unlikely to be dialable as shown. Client confirmation required.
- **The leading `+` is inconsistent inside one frame.** On
  `E · Contact Us — Desktop` (`90:4009`) the contact list draws Asia as
  `1 33 7024 0773` and Africa as `233 598 277 323`, while the footer on that
  same frame draws both with a `+`. The build renders every number from
  `site.ts` — the `+` form — so the page and its own footer agree. Client
  confirmation required.

**Rules — these are firm:**

- **Display phone numbers exactly as supplied by the client.** No reformatting,
  no re-grouping of digits, no prettifying.
- **Keep the visible number and the `tel:` value as separate fields** in the
  content model:
  ```ts
  type PhoneNumber = {
    region: "usa" | "asia" | "africa";
    display: string; // rendered verbatim
    tel: string | null; // E.164; null until confirmed
  };
  ```
- **Never guess, normalise or invent a country code**, and never derive `tel:`
  from `display` by stripping characters.
- **Do not finalise clickable phone links** until the client confirms the
  international numbers. While `tel` is `null`, render the number as plain text,
  not as an anchor.

> Figma also contains `+233 00 000 0000` dummy strings in the Design System
> page. These are layout placeholders — never ship them.

### 6.4 Photography & stock images

**Collected vs placed — these are different numbers.** Measured in Figma on
2026-11-11:

| Measure                                                            | Count   |
| ------------------------------------------------------------------ | ------- |
| Distinct Unsplash photo IDs documented by URL                      | **54**  |
| Distinct image fills inside `Stoke images collection` (`179:9389`) | **89**  |
| Distinct image fills **placed on designs**                         | **47**  |
| …of which come from the collection                                 | **35**  |
| Distinct image fills in the whole document                         | **101** |

Read that as: the collection is a **review library**, not a manifest of what
ships. It holds more crops/variants (89) than it has source photos (54),
because a single Unsplash photo appears at several crops. Only **47** fills are
actually placed on designs, **35** of them sourced from the collection — the
other 12 are the older AI-generated concept images still awaiting replacement.

- The reported figure of **43** matches none of these measurements. It may
  count a subset of the collection, or predate additions. **Reconcile the
  in-scope set with the client before populating `credits.ts`** (§11, §10 #11).
- **Only placed images need credits.** Do not transcribe the whole collection.
- Figma records the licence basis: images were inserted with the Unsplash plugin
  using the **"Free" licence filter (no Unsplash+ assets)** — free for
  commercial and non-commercial use, attribution not required but appreciated.
- **Site-wide image replacement is still pending.** Most of the site still shows
  the original AI-generated concept imagery.
- **`A · About Us — Desktop` has already been manually updated with stock
  photos. Do not modify the About Us desktop design again unless explicitly
  instructed.**

**Image credits are required.** Every stock image must eventually have a record
in `src/content/credits.ts`:

```ts
type ImageCredit = {
  id: string; // stable key used by the image component
  sourceUrl: string; // e.g. https://unsplash.com/photos/KdeqA3aTnBY
  photographer: string; // e.g. "Dylan Gillis"
  licence: string; // e.g. "Unsplash License (free)"
};
```

Figma carries `Photo by …` attributions alongside the URLs, so photographer
names are available to transcribe. **Do not invent credit information** — if a
field cannot be read from Figma, leave it absent and flag it.

### 6.5 Still unconfirmed

- Tribe Capital package definitions and KYC timelines are **provisional**.
- Case studies are **placeholders only**.
- Asia Region address awaits confirmation.
- Training programme **Venue** and **Date & time** (see §6.1).
- Imagery not yet replaced site-wide (see §6.4).

---

## 7. Navigation & scope

### 7.1 Routes

- **`/training-programs` is a separate route** and must be created as its own
  page — not a section of another page.
- **Its Figma design exists and is a full page frame.** Verified 2026-11-11:
  `Training Programs — Desktop` (`248:10353`, 1440 × 6502) on `Inner Pages`,
  with four registration overlays — `Overlay · Training Programs — Register —
Spring Training` (`249:10847`), Summer (`249:10927`), Autumn (`249:11007`)
  and Winter Forum (`249:11087`).
- The homepage also carries a `05 · Training Programs` section (`264:12250`)
  and a `Link · View all Training Programs` (`264:12300`) pointing at the route.
- Breadcrumb in Figma reads `Home / Company / Training Programs`, consistent
  with the dropdown placement in §7.2.

> The frame exists, which is not the same as the client having signed it off.
> Confirm finality before building it (§2, rule 2).

### 7.2 Header navigation

Verified in Figma (`Header/Desktop`):

| Layout             | Top-level items                                                               |
| ------------------ | ----------------------------------------------------------------------------- |
| `Original`         | About · Services · Industries · Why TWT · **Newsletters** · Careers · Contact |
| `Grouped Dropdown` | Company · Services · Industries · **Newsletters** · Contact                   |

- **Training Programs sits under the Company dropdown.** Verified: the header
  Company panel (`109:5675`) contains About Us · Why TWT · Careers · **Training
  Programs**. It also appears in the `Footer/Desktop → Layout=Modern` Company
  column (`179:9683`).
- **Newsletters is NOT in the header.** Client decision (Phase 3), overriding
  the Figma header, which still shows a `Nav / Newsletters` item. The header
  is: Company · Services · Industries · Contact · Request a consultation.
  Do not re-add it; do not edit Figma.
- **Newsletters is NOT in the footer either, as of 2026-11-13.** A second
  client instruction replaced it with **Training Programs** (→
  `/training-programs`) in the `Layout=Original` footer Company column, where
  Figma still draws Newsletters. The column is: About us · Who we serve ·
  Why TWT · **Training Programs** · Careers · Contact. This matches the
  `Layout=Modern` Company column (`179:9683`), which already listed Training
  Programs. The newsletter pages and the homepage newsletter section are
  unaffected — only the two chrome links are gone. Newsletters now has no
  entry point in the site chrome at all.

> Header layout is decided: `Grouped Dropdown` (§10 #7), so Training Programs
> lives in the Company dropdown as designed.

### 7.3 Industries marquee

Two complete variants exist in the Design System — **both are built, neither is
chosen**:

| Variant                                          | Component set | Description                                                                                              |
| ------------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------- |
| **Dark / violet** (`Marquee / Industries`)       | `180:10249`   | The default violet marquee                                                                               |
| **Light** (`Industry Marquee — Light Variation`) | `185:11530`   | Navy display type on white between hairline rules, violet index numerals, brand figure-bars as separator |

Mechanics, per the Figma specification:

- The track (`Marquee Track / Industries`, `183:10708`) holds **three identical
  sets**; `Position=Start → Position=End` slides **exactly one set width
  (2,630 px)** over **40 s linear**, then snaps back. `End` is pixel-identical
  to `Start`, so the loop is seamless.
- Place the track in a **clipped viewport with 160 px edge fades**.
- Both variants expose `Motion:[Animated|Reduced]`.

**A complete static fallback is required.** `Motion=Reduced` is the designed
static alternative and **must** be implemented for `prefers-reduced-motion`. The
reduced state shows the full, legible set of industries — not a frozen
mid-scroll frame, not an empty track.

### 7.4 Footer

- The footer carries an **Instagram** link (`@theworkingtribe`) in both
  `Layout=Original` (`Item / Instagram`) and `Layout=Modern`
  (`Contact / Instagram`).
- A **QR code** is to be reused in the footer. ⚠️ **Unverified:** no QR node or
  QR-related text exists in the Figma file as read on 2026-11-11. Its artwork,
  target URL and placement all need to be supplied before this can be built.

---

## 8. Accessibility and motion

- **Semantic HTML first.** `<header>`, `<nav>`, `<main>`, `<footer>`,
  `<button>`, `<a>`, real headings in order. A `<div>` with an `onClick` is a
  bug.
- Everything operable by **keyboard**: dropdowns, accordions, modals, filter
  chips, file upload. Modals trap focus, restore it on close, and close on
  `Esc`.
- The design system ships `Focus/Ring`, `Focus/Ring · Error` and
  `Focus/Ring · On dark` effect styles — use them. **Never** remove a focus
  indicator without replacing it with a visible one.
- Respect **`prefers-reduced-motion`**. Every transition, scroll effect,
  animated hero headline and decorative motion must degrade to a static,
  _complete_ state — not a broken, frozen or empty one. The Industries marquee
  has a designed `Motion=Reduced` variant for exactly this (§7.3).
- Meet contrast on the segment palettes; yellow in particular needs
  `text/on-yellow`, not `text/inverse`.

---

## 9. Forms

- **Never show a successful submission state before the submission resolves.**
  No optimistic "Thank you". The acknowledgement renders only after the request
  succeeds; a failure renders an error and the user's input is preserved.
- Submit buttons have a real `Loading` state (`Form/Submit Button` provides it)
  and are disabled only while in flight.
- Validation messages come from `Form/Validation Message` and
  `Form/Helper Text`; errors are associated with their field via
  `aria-describedby` and announced.
- **Form submission is deferred to the development phase.** The backend has
  **not been decided** (§10).
- **Automatic reply messages are also deferred to development** — wording,
  sender and routing are all unspecified.
- Until a backend exists, forms must **not** pretend to submit. Build the UI,
  the validation and the states; leave the transport unimplemented and flagged.

### 9.1 The four transports (Phase 6.0)

Every form goes through one of these, and all four return
`{ ok: false, reason: "not-configured" }`:

| Form                  | Transport                       |
| --------------------- | ------------------------------- |
| Consultation          | `lib/submit-consultation.ts`    |
| Training registration | `lib/submit-registration.ts`    |
| Careers application   | `lib/submit-application.ts`     |
| Tribe Capital enquiry | `lib/submit-capital-enquiry.ts` |

Wiring a real backend means editing these four files and nothing else.

### 9.2 Development-only mock submission adapter

`lib/submit/mock-submission.ts` simulates an asynchronous success or failure
so the designed Loading, Acknowledgement and failure states are reviewable.
Without it they are unreachable, because nothing ever resolves `{ ok: true }`.

- **It cannot reach production.** Every entry point is gated on
  `process.env.NODE_ENV !== "production"`, which Next replaces statically, so
  the adapter is dead code in a production build and is dropped.
- `npm run check:no-mock` proves it: it scans `.next/{static,server}` for the
  adapter's identifiers and asserts all four transports still fall through to
  `not-configured`. Run it after `npm run build`.
- Arm it two ways, both development-only: `setMockSubmission({ outcome })` in
  Storybook, or `?mock=success|failure|not-configured` on any page in
  `npm run dev`.
- Verified 2026-11-16: against `next start`, `?mock=success` is ignored and
  the consultation and Tribe Capital forms both still show their honest
  "not sent" notice.

### 9.3 Acknowledgements

`components/ui/form/acknowledgement.tsx` is the panel from
`Form/Consultation` → `State=Acknowledgement` (`111:6601`) and
`Form/Tribe Capital Enquiry` → `State=Acknowledgement` (`111:7297`), which
draw it identically. It renders **only** on `{ ok: true }`, so on the live
site it is unreachable.

- Figma puts a `Badge/Tone=Placeholder` reading "DRAFT WORDING — PENDING
  CLIENT APPROVAL" on both acknowledgements. That badge ships with the copy
  until the client signs the wording off, and the automatic-reply it promises
  is still unspecified (§9).
- **`Modal/Registration` has no acknowledgement** — only `State=Default` and
  `State=Validation`. None was invented: on success the registration dialog
  simply closes.
- The Careers form already had its own full-page acknowledgement
  (`G2 · Careers — Application received`), which is unchanged.

---

## 9.4 Accessibility baseline (Phase 7)

Audited 2026-11-16: 12 routes × 3 widths (1440 / 768 / 375), axe-core 4.14.0
(WCAG 2.0/2.1 A + AA), plus the open states of every dialog, dropdown and form.

**Clean:** 0 horizontal overflow, 0 broken images, 0 JavaScript errors,
0 heading-order skips, 0 missing `alt`, focus indicators on 100% of visible
focusables at all three widths.

Fixed in Phase 7:

- `definition-list` / `dlitem` ×90 — `training-programmes.tsx` nested its
  `<dt>`/`<dd>` two `<div>`s deep inside the `<dl>`; only one level is
  allowed. Rebuilt as a two-column grid, same Figma layout.
- `label-content-name-mismatch` ×3 — the CV dropzone's `aria-label` stopped at
  the prompt and omitted the formats caption below it, so the accessible name
  did not contain the visible text (WCAG 2.5.3). The button now names itself
  from its own content; the field label is associated by `aria-describedby`.
- `color-contrast` ×6 — Global Solutions module numerals used
  `segment/orange/accent` (2.86:1). `SERVICE_HUE` gained a `numeral` key that
  maps orange to `segment/orange/text`, which is what Figma itself uses for
  that element on `91:3543`.

### Known, unfixed, and why

**33 `color-contrast` violations remain. Every one is faithful to Figma** and
is a palette decision, not an implementation bug — §1 says report, do not
change. Measured ratios:

| Ratio | Needs |   × | Pair                                | Where                                 |
| ----- | ----- | --: | ----------------------------------- | ------------------------------------- |
| 1.65  | 3.0   |   3 | `yellow/500` on white               | About — value numeral "04"            |
| 2.86  | 3.0   |   1 | `orange/500` on `background/subtle` | Services — index numeral "03"         |
| 2.97  | 3.0   |   3 | `orange/500` on white               | About — value numeral "03"            |
| 3.69  | 4.5   |   6 | `white/a72` on `violet/500`         | About, Why TWT — copy on violet cards |
| 4.05  | 4.5   |   1 | `orange/700` on pink-soft panel     | Services — `Badge/Tone=Orange`        |
| 4.38  | 4.5   |  16 | `orange/700` on `orange/soft`       | Training Programs, Global Solutions   |
| 4.43  | 4.5   |   1 | `neutral/500` on `neutral/50`       | Services — "Sector" column header     |

The 1.65:1 yellow numeral is the one that matters most. The rest are between
0.03 and 0.81 short. All need a client/design decision — see §10 #13.

**1 `aria-hidden-focus`** on the open header dropdown: Radix
NavigationMenu renders its own 1 × 1 `aria-hidden` focus proxy with
`tabindex="0"`. It is a library internal, not our markup, and cannot be fixed
without patching `@radix-ui/react-navigation-menu`.

### Verified behaviours

- Dialogs: one at a time, background scroll-locked and unreachable, focus
  trapped and restored, `Esc` closes, internal scrolling at every width.
  Radix 1.3.1 does not set `aria-modal`; it hides the background instead.
- Reduced motion: no visible running animations on any route. The Industries
  marquee removes its animated track entirely and shows `Motion=Reduced` —
  the complete static row of all five industries (§7.3).
- Forms: no fake success anywhere without the development mock; inputs are
  preserved after a failed submission.

---

## 10. Open decisions — do not choose these unilaterally

| #   | Decision                       | Options / what is needed                                                                                                                                                  |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Industries marquee variant** | Dark/violet (`180:10249`) or Light (`185:11530`)?                                                                                                                         |
| 2   | **Industries section heading** | Final wording pending                                                                                                                                                     |
| 3   | **Asia contact number**        | Country code confirmation required (§6.3)                                                                                                                                 |
| 4   | **Africa contact number**      | Correct digits need client confirmation — `+233 59 822 7323` vs `+233 598 277 323` (§6.3)                                                                                 |
| 5   | **Form backend**               | Google Forms, Google Sheets, Apps Script, or another solution?                                                                                                            |
| 6   | **Newsletter Reading header**  | Confirm intended header layout (§11)                                                                                                                                      |
| 7   | **Header layout**              | ✅ DECIDED — `Layout=Grouped Dropdown`, with Newsletters removed from the header (§7.2)                                                                                   |
| 8   | **Footer layout**              | ✅ DECIDED — `Layout=Original`                                                                                                                                            |
| 9   | **Service Portfolio**          | `Variation 01` (`102:5003`) or `Variation 02` (`102:5208`)                                                                                                                |
| 10  | **Footer QR code**             | Artwork, target URL and placement not yet supplied (§7.4)                                                                                                                 |
| 11  | **Stock image scope**          | Which images are in scope? Reported 43; Figma holds 54 photo IDs / 89 collection fills / 47 placed (§6.4)                                                                 |
| 13  | **Segment palette contrast**   | 33 axe violations, all faithful to Figma. Worst is `yellow/500` on white at 1.65:1 (needs 3:1). Darker segment `text` tokens already exist and would fix them — see §9.4  |
| 12  | **Desktop breakpoint**         | CSS breakpoint is **1280px** (from the text-style specs). Figma `breakpoint/desktop` is **1440px**, the artboard width. Confirm 1280 is intended — see `design/TOKENS.md` |

Note: the canonical `Home — Desktop` frame still instantiates Header `Original`.
The approved header for the build is `Grouped Dropdown` regardless — when
assembling pages, take page content from the frame and the header from the
shared `SiteHeader`.

---

## 11. Observed inconsistencies

These are **observations, not approved decisions.** Do not "fix" them in Figma
and do not pick a side in code.

- **Newsletter header layout.** The `Newsletter · Edition reading template`
  (`102:3931`) uses Header `Layout=Grouped Dropdown`. So does
  `H · Newsletter Archive — Desktop` (`108:4718`). The canonical
  `Home — Desktop` uses `Layout=Original`. Confirm the intended layout before
  building either newsletter page (§10, #6).
- **Stock image count.** 43 images were reported as collected; Figma holds 54
  distinct Unsplash photo IDs, 89 image fills inside the collection section and
  47 placed on designs. The in-scope set needs reconciling before `credits.ts`
  is populated — see §6.4 for the full breakdown.
- **Collection section is misspelled in Figma** — `Stoke images collection`
  (`179:9389`), presumably "Stock". Cosmetic, and **not** to be fixed in Figma
  (§1); noted so searches for "Stock images collection" do not come up empty.

---

## 12. Technology decisions

### Font

- **Primary font: `Sofia Sans Semi Condensed`** — implemented in Phase 1.
  This is what the Figma design system actually binds (`font/family/brand`).
- **`Antipasto Pro` must not be used** unless a web licence is purchased
  separately. The Figma text styles are _described_ as Antipasto Pro, but that
  description does not reflect what is bound.
- **Never ship trial font files.** The Antipasto Pro files present on the design
  machine are all `*_trial.ttf` desktop-trial fonts and are not licensed for web
  embedding.

As shipped:

|           |                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Files     | `src/fonts/sofia-sans-semi-condensed-latin-wght-normal.woff2` (41.5 KB, preloaded) and `…-latin-ext-wght-normal.woff2` (18.7 KB, on demand) |
| Origin    | official Fontsource package `src/fonts/sofia-sans-semi-condensed.zip` → `variable/`, copied unmodified (2026-11-12)                         |
| Loader    | `src/lib/fonts.ts` → two `next/font/local` faces, each with Fontsource's `unicode-range`; `display: swap`; weight `1 1000`                  |
| Stack     | `brandLatin, brandLatinExt, "brandLatin Fallback", sans-serif` — set as `--font-brand` on `<html>` by `layout.tsx`                          |
| Axis      | variable `wght` 1–1000 — covers Light 300, Regular 400, Bold 700                                                                            |
| Version   | 4.101                                                                                                                                       |
| Licence   | SIL Open Font License 1.1 — `src/fonts/OFL.txt` (matches the ZIP's `LICENSE`)                                                               |
| Copyright | Copyright 2019 The Sofia Sans Project Authors                                                                                               |
| Source    | Fontsource (upstream: `lettersoup/Sofia-Sans`)                                                                                              |

Self-hosted, so no runtime request leaves our origin. The italic cut is not
shipped — no Figma text style uses italic. Greek and Cyrillic subsets are not
shipped — no content uses them.

- **No `system-ui` in the stack.** On Windows `system-ui` is Segoe UI. The
  only fallback is Next's size-adjusted local Arial, then `sans-serif`; both
  paint only while the font loads or if it fails.
- **Order matters.** Both Sofia faces must come before the fallback. A
  fallback with no `unicode-range` placed between them would claim every
  accented character and paint it in Arial.
- `next/font` options must be inline literals — the `unicode-range` strings
  cannot be shared constants.
- Verified 2026-11-12 with CDP `CSS.getPlatformFontsForNode` on `/`,
  `/about` and `/why-twt` at 1440 and 375 (header, Company dropdown, mobile
  drawer, footer, registration dialog, input values and placeholders): every
  glyph paints in Sofia Sans Semi Condensed from the web font.

### Approved dependencies

Approved **for the phase that needs them**. Install each when the work that
requires it starts — not in advance, and not as a side effect of another task.

Status checked against `package.json` on 2026-11-11:

| Package                                                    | Purpose                                | Phase   | Installed       |
| ---------------------------------------------------------- | -------------------------------------- | ------- | --------------- |
| `class-variance-authority`                                 | Figma variant axes → typed props       | Phase 2 | ✅ 0.7.1        |
| `clsx`                                                     | conditional class composition          | Phase 2 | ✅ 2.1.1        |
| `tailwind-merge`                                           | Tailwind class conflict resolution     | Phase 2 | ✅ 3.7.0        |
| `@radix-ui/react-{select,checkbox,slot}`                   | accessible select, checkbox, `asChild` | Phase 2 | ✅ in use       |
| `@radix-ui/react-{dialog,accordion,navigation-menu,label}` | installed for Phase 3 surfaces         | Phase 2 | ✅ not yet used |
| `react-hook-form`                                          | form state                             | Phase 2 | ✅ 7.92.0       |
| `zod` + `@hookform/resolvers`                              | validation + content schema contracts  | Phase 2 | ✅ 4.6.7        |
| `motion`                                                   | **hero animation only**                | Phase 3 | ❌ No           |

- **`motion` is scoped to the hero animation** and is still uninstalled: the
  Phase 4 hero reveal was achievable in pure CSS, so it was not needed.
  Everything else uses CSS too.
- Radix `navigation-menu` (header dropdowns), `dialog` and `accordion` (mobile
  drawer) are in use since Phase 3; `label` is installed but not yet imported.

Dev tooling: `tailwindcss@4`, `typescript@5`, `eslint@9`,
`eslint-config-next@16.4.5`, `prettier`, `prettier-plugin-tailwindcss`,
`@tailwindcss/turbopack`, `storybook@10.6.7` + `@storybook/nextjs-vite`,
`vite@7`, `@tailwindcss/vite`.

### Next.js configuration

`next.config.ts` sets **no caching options at all**. Next 16's
`cacheComponents` and `partialPrefetching` were removed from the generated
config during Phase 0 and are therefore **off by default** — the file does not
set them to `false`, it simply omits them.

The site is static-first marketing content, so the explicit `"use cache"`
model adds friction without a payoff. Revisit if live data arrives (for
example a CMS-backed newsletter archive). The only option configured is the
Turbopack CSS rule that Tailwind v4 requires.

### Git

- **Git identity must be confirmed before the first commit.** Ask; do not
  configure it automatically.
- The repository currently resolves to
  `techfrolicayaz <ayazuddin@techfrolic.com>` from the global config.
- The repository has exactly **one commit**, created automatically by
  `create-next-app` during Phase 0:

  |                    |                                             |
  | ------------------ | ------------------------------------------- |
  | SHA                | `3942037c6aa72f164e7ac78fbd89a90f7d3eb805`  |
  | Subject            | `Initial commit from Create Next App`       |
  | Author / committer | `techfrolicayaz <ayazuddin@techfrolic.com>` |
  | Date               | 2026-11-04T13:00:29+05:30                   |
  | Branch             | `master`                                    |

  It was not authored deliberately by the team. **Do not amend, rebase or
  rewrite it** — if the identity is wrong, correct it going forward rather
  than rewriting history.

- All Phase 0, Phase 1 and Phase 2 work is **uncommitted** and awaiting review.

---

## 13. Commands

```bash
npm run dev              # dev server
npm run build            # production build
npm run typecheck        # next typegen && tsc --noEmit
npm run lint             # eslint
npm run format           # prettier --write .
npm run storybook        # component review at :6006
npm run build-storybook  # static Storybook build
```

Run `typecheck` and `lint` before considering any task done.

> **Memory note.** `next build`, `eslint` and `storybook build` each OOM on a
> machine with under ~1 GB free — the failure surfaces as "Failed to type
> check" or a Rust allocator error, not as a code error. If a check fails that
> way, close some apps and re-run before hunting for a bug.

---

## 14. Stack

Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · ESLint 9
(flat config) · Prettier.

Tailwind v4 is **CSS-first**: tokens are declared with `@theme` in
`src/styles/tokens.css`, which `src/app/globals.css` imports. There is no JS
Tailwind config in this project and one should not be added.

### Layout of what exists

```
src/
├─ app/
│  ├─ layout.tsx          root layout — loads the brand font
│  ├─ page.tsx            homepage — `Home — Desktop` (46:95), 8 sections in frame order
│  ├─ globals.css         imports tokens.css + base/reduced-motion layers
│  └─ dev/tokens/page.tsx token specimen — 404s in production
├─ components/ui/         Phase 2 component library
│  ├─ icon.tsx            39 icons read from Figma `Icon/*`
│  ├─ button.tsx          4 variants × 3 sizes
│  ├─ icon-button.tsx · badge.tsx · text-link.tsx
│  ├─ *.stories.tsx       Storybook stories
│  └─ form/               label, helper-text, validation-message, text-input,
│                         textarea, select, checkbox, file-upload,
│                         package-option, submit-button, field.ts
├─ fonts/                 Sofia Sans Semi Condensed woff2 + OFL.txt
├─ lib/
│  ├─ fonts.ts            next/font/local definition
│  └─ cn.ts               class merge, with our type steps registered
└─ styles/tokens.css      ALL design tokens  ← single source in-repo

.storybook/               main.ts + preview.tsx (Vite builder, Tailwind v4)
design/
├─ extract-tokens.figma.js  read-only Figma extraction script
└─ TOKENS.md               Figma → Tailwind mapping + decisions
DESIGN-CHANGES.md          Figma baseline + change log
```

Phase 3 added `src/content/{navigation,site}.ts` (typed nav, footer and contact
content, each link carrying a `status: "live" | "pending"`), `src/components/
layout/` (Container, Section, SiteHeader, DesktopNav, MobileNav, SiteFooter,
MainLayout), `src/components/brand/logo.tsx` and `src/components/decor/
flow-lines.tsx` (both real Figma vectors).

**Container rule:** max-width is the 1440 artboard (`--canvas-desktop`) with
`--page-margin` gutters — that yields the 1280 / 704 / 343 content widths.
Never cap the outer box at 1280.

Phase 4 (homepage) added `src/content/home.ts` (all homepage copy, typed),
`src/components/sections/section-heading.tsx` (Eyebrow, SectionHeading,
`sectionFrame`), `src/components/sections/home/` (hero, brand-intro, services,
industries, why-twt, programmes, client-voices, closing-cta,
registration-dialog), `src/components/decor/decor.tsx` (DecorLayer, Pattern,
Glow), `src/lib/type.ts` (responsive type-step strings) and the Figma pattern
exports in `public/decor/`.

- **Hero animation is pure CSS** (`.hero-rise` in `globals.css`, timings from
  Figma `Hero/Animated Headline`). `motion` was not needed and stays
  uninstalled. Reduced motion removes the animation outright.
- **Registration overlay** = Figma `Modal/Registration` (`95:5568`; instances
  `102:4219`, `102:4298`, `102:4377`, `102:4456`). One Radix Dialog opened by
  four `RegisterButton`s. It has no transport: a valid submit shows a
  "not sent" notice, never a success state (§9).
- **Consultation popup** = Figma `Form/Consultation` (`111:6601`, overlay
  `111:7317`), built in `src/components/consultation/`. One dialog for the
  whole site, provided by `MainLayout` and opened by the header CTA (desktop
  button and mobile-drawer button) via `ConsultationTrigger` /
  `useConsultation()`. Transport is stubbed in `lib/submit-consultation.ts`
  (never renders Figma's `State=Acknowledgement`). Other "Request a
  consultation" CTAs (hero, closing panels, footer) still link to `/contact`.
- **`Modal` (`components/ui/modal.tsx`) is the shell for every popup**
  (registration and consultation). The page behind is scroll-locked and the
  dialog is capped at `100dvh − 2rem`: the header stays fixed and only the
  body scrolls. The scroll container must stay INSIDE `Dialog.Content` —
  Radix only lets wheel/touch scrolls through for elements inside it.
- The registration overlay's "Provisional fields — to be confirmed" badge was
  removed on client instruction (the Figma overlays still draw it).
- **Not built yet:** the Tribe Capital enquiry overlay (`111:7432`); its
  "Enquire" CTA links to `/contact`.
- **In-page anchors:** `globals.css` gives `html` a `scroll-padding-top`
  matching the sticky header (101px below 1280px, 129px from 1280px) and
  `scroll-behavior: smooth` ONLY under `prefers-reduced-motion:
no-preference`. A section target uses `scroll-mt-[calc(1.5rem_-_var(--section-y))]`
  so its content (not its empty padding) lands under the header.
- `public/images/home-*-concept.jpg` are the AI concept images from Figma —
  `@placeholder`, to be replaced (§6.4).
- The homepage frame has **8 content sections** (there is no "07"); its Figma
  layer `06 · Newsletters` holds the Training Programs content.
- The closing CTA shows `info@theworkingtribe.com`; the footer shows
  `hello@theworkingtribe.com`. Both are as drawn — client to confirm.

Phase 5.1 (About Us) added `/about` (`src/app/about/page.tsx`),
`src/content/about.ts` and `src/components/sections/about/` — built from
`A · About Us — Desktop` (`54:95`), seven sections in frame order.

- `ClosingCta` now takes its copy as a `content` prop; the homepage and About
  share the one panel.
- `SectionHeading` gained the Figma `Align` axis (`left` | `center`).
- **Ligatures:** `globals.css` sets `font-feature-settings: "liga", "clig"`.
  Browsers drop ligatures wherever letter-spacing is non-zero; Figma does not.
  Do not remove it — headings render wider than the design without it.
- **Pattern strokes:** the `*-1px.svg` decor variants keep strokes at 1px when
  stretched, as Figma does. About uses them; the homepage still uses the
  original files (its patterns render heavier than Figma) pending a decision.
- `Desktop/Display/Hero` is **72/80** in Figma. `tokens.css` had been changed
  to 64px by hand; it was restored to 72 on 2026-11-11 (§3.0: do not hand-edit).
- `public/images/about-*.jpg` are the stock photos placed in the Figma frame.
  Their credit records are still owed in `credits.ts` (§6.4).

Phase 5.2 (Why TWT) added `/why-twt` (`src/app/why-twt/page.tsx`),
`src/content/why-twt.ts`, `src/components/sections/why-twt/` and a shared
`src/components/sections/breadcrumb.tsx` — built from `I · Why TWT — Desktop`
(`108:5091`), six sections in frame order.

- **Homepage hero heading is 64/72 on desktop** — a client instruction
  (Phase 5.2) applied to that one heading only, in `sections/home/hero.tsx`.
  The `Desktop/Display/Hero` token stays at Figma's 72/80 for every other
  page. Do not "fix" either one to match the other.
- The "Areas of expertise" service titles and descriptions are read from
  `services.pillars` in `home.ts`, so the two pages cannot drift apart.
- `public/images/why-*.jpg` are the five stock photos placed in the frame;
  `public/decor/symbol-watermark-on-brand.svg` is the on-brand watermark.
  Credits are still owed (§6.4).

Phase 5.3 (Careers) added `/careers` (`src/app/careers/page.tsx`),
`src/content/careers.ts`, `src/components/sections/careers/` and
`src/lib/submit-application.ts` — built from `G · Careers — Desktop`
(`95:4335`), the `03 · Upload & validation states` reference (`95:4605`) and
the `G2 · Careers — Application received` state (`95:4887`).

- **The application transport is a stub.** `submitApplication` always
  returns `not-configured`, so a valid form shows a "not sent" notice and
  keeps every input. The acknowledgement (`ApplicationReceived`) renders only
  on `{ ok: true }`, so it cannot appear on the site until a backend exists.
  Review it in Storybook → `Pages/Careers/Application received`.
- `cvRules` in `careers.ts` is empty until accepted formats and maximum size
  are confirmed; only a 0-byte file is rejected today.
- Region options are the two office regions; Area of interest options are the
  four service pillars. Both are `@placeholder` — Figma supplies no lists.
- Shared form components were brought in line with Figma in this phase:
  `FileUpload` (all designed states and copy as props), `Textarea` (optional
  `maxLength` counter), `TextInput`/`Select` (Error/Success status icon), and
  `fieldControl` (`Focus/Ring · Error` on invalid fields).

Training Programs added `/training-programs`
(`src/app/training-programs/page.tsx`), `src/content/training-programs.ts`
and `src/components/sections/training/` — built from `Training Programs —
Desktop` (`248:10353`), five sections in frame order.

- Programme names, topics, months and audiences are read from `programmes`
  in `home.ts`; the page adds only its own descriptions, audience lists and
  images. Dates and times show "To be announced" — no sample dates here.
- **One registration overlay for the whole site.** The page reuses the
  homepage `RegistrationProvider` with its `details` prop (the page overlays
  `249:10847`… read "Dates and times to be announced"). `RegisterButton`
  gained `tone` (`inverse` on dark surfaces) and `showArrow`.
- The hue map moved from `sections/why-twt/hues.ts` to `sections/hues.ts`
  and gained `bar` and `badge`.
- `Breadcrumb` marks only the last crumb `aria-current`; a link-less crumb
  before it ("Company") is plain text.

Phase 5.4 (Industries) added `/industries` (`src/app/industries/page.tsx`),
`src/content/industries.ts` and `src/components/sections/industries/` — built
from `C · Industries — Desktop` (`57:502`), eleven sections in frame order.

- **Marquee** = `IndustryMarquee` (`industries/industry-marquee.tsx`), built
  from the documented mechanics (§7.3): three identical sets, the track slides
  −1/3 of its own width (= one set at any size) over 45 s (Light) / 40 s
  (dark), linear, with 200px edge fades. `@keyframes marquee-slide` and
  `.marquee-track` live in `globals.css` — the hover pause must stay there too
  (an unlayered `animation` shorthand overrides Tailwind's layered
  `group-hover` utilities). Under `prefers-reduced-motion` the track is
  removed and `Motion=Reduced` — the complete static row — is shown. The
  repeated sets are `aria-hidden`; assistive tech gets the list once.
- **Both variants are built; neither is chosen (§10 #1).** The page uses
  `tone="light"`, the variant in the approved frame. `tone="dark"` is one
  prop away; review both in Storybook → `Pages/Industries/Marquee`.
- **The frame's Training Programs block (`264:12250`) is a newer variant of
  the homepage's (`48:312`)**: no Venue row, "To be announced" dates, no
  "Browse all editions" link, season-only cover nameplates, and a link to
  `/training-programs`. `Programmes` takes a `content` prop
  (`ProgrammesSectionContent`); the homepage passes nothing and is
  unchanged. Whether the homepage should adopt the newer design is a client
  question.
- "How we help" links are the approved service modules from `home.ts`
  (`serviceFor()` throws at build if a module is renamed). They go to the
  service pages, which are not built yet.
- `Specialisations` count "05" uses `Display/Hero` (72/80); Figma's 96/96 is
  not a type step (reported, §3.1).

Phase 5.5 (Contact Us, favicon, consultation CTAs) added `/contact`
(`src/app/contact/page.tsx`), `src/content/contact.ts` and
`src/components/sections/contact/contact-sections.tsx` — built from
`E · Contact Us — Desktop` (`90:4009`), three sections in frame order.

- **The enquiry form is the consultation form.** Figma's `02 · Enquiry`
  instantiates `Form/Consultation`, so `ConsultationForm` is exported from
  `consultation/consultation-dialog.tsx` and rendered inline here. One form,
  one validation, one stubbed transport — never a second implementation.
- **Contact details are not duplicated.** The email, website, phone numbers
  and office addresses all come from `site.ts`, so the page cannot contradict
  the footer that sits on it. Asia and Africa have `tel: null`, so they render
  as plain rows. All three phone rows look identical — same "Call →"
  action, same hover state, as Figma draws them — but only USA is a link:
  Asia and Africa are not focusable and their action is `aria-hidden`, so
  nothing promises a call that cannot be placed (§6.3). The "TO CONFIRM"
  badge Figma draws on the Asia Region row was removed on client
  instruction. Both recorded in `DESIGN-CHANGES.md`.
- **The two office rows open Google Maps** (client instruction, 2026-11-17).
  `googleMapsSearchHref()` in `lib/maps.ts` builds a plain Maps URL API link
  from the address **verbatim** — no key, no script, no iframe, nothing sent
  to Google until the visitor clicks. They open in a new tab with
  `rel="noopener noreferrer"`, which gives them the card's `State=Focus` and a
  pointer cursor on top of the `State=Hover` they already had. No visible
  action label is added — Figma's action slot would reflow the two-line
  addresses — so the destination is carried by an `sr-only` suffix **inside**
  the link, never an `aria-label` that could drift from the visible address
  (§9.4). Asia being unconfirmed does not block this: a map search cannot
  misdial, it searches the exact string we display.
- **Every "Request a consultation" CTA opens the shared popup.** Driven from
  the content layer: a link with `opens: "consultation"` renders as
  `CtaButton` (`consultation/cta-button.tsx`) → `ConsultationTrigger`. `href`
  stays as the no-JS destination. 37 triggers verified across all 7 routes.
- **Favicons are exports, not artwork.** `src/app/{icon.svg,favicon.ico,
apple-icon.png}` and `public/icon-{192,512}.png` all render from the one
  approved `Favicon / Colourway=Primary` master (`309:10940`), per the
  `10 · Favicon & Site Icon` export spec; `apple-icon` drops the corner radius
  because iOS applies its own mask. `src/app/manifest.ts` carries the spec's
  `theme_color`/`background_color`. The title template is
  `"%s — The Working Tribe"`, as the Figma tab preview shows.

Phase 5.6 (Services Overview) added `/services` (`src/app/services/page.tsx`),
`src/content/services.ts` and `src/components/sections/services/` — built from
`B0 · Services Overview — Desktop` (`85:923`), nine sections in frame order.

- **The four pillars are the approved portfolio from `home.ts`.** The frame
  adds a one-line description to each module; the module NAMES come from
  `services.pillars` via `moduleOf()`, which throws at build if one is
  renamed, so the overview and the homepage cannot drift apart. The outdated
  Facility Management / Event Management services appear nowhere.
- **Each pillar has its own layout** — image + numbered list (Training), soft
  panel + two-column modules (Advisory), copy + abstract visual (Global
  Solutions), panel + package journey (Tribe Capital) — so they are four
  components, not four instances of one card. Each stays monochromatic in its
  own hue, driven by `sections/services/service-hues.ts` (`SERVICE_HUE`),
  which extends the shared `sections/hues.ts` with the soft fills, segment
  borders and index numerals this frame needs. Every value is a `Segment`
  token.
- **Tribe Capital keeps all of its provisional markers** — the
  "PROVISIONAL" badge, the provisional caption and a "TO CONFIRM" badge on
  each package (§6.5). The badge removals recorded for the registration popup
  and the Asia Region row were two specific client instructions, not a
  general rule.
- `09 · Closing CTA` reuses the homepage `ClosingCta` with its own content.
- `public/decor/orbit-arcs-light-1px.svg` is the Light orbit-arcs pattern
  carrying the Global Solutions instance override to an `orange/500` stroke.
  That pattern and the Tribe Capital contour are positioned on their own
  panels, not through `DecorLayer`, whose stage is the 1440 artboard.
- `public/images/services-{hero,training,advisory}.jpg` are the stock photos
  placed in the frame. Credits are still owed (§6.4).
- **`/services` is now `live` in the content layer** (header dropdown "View
  all services", homepage, Why TWT and the Careers acknowledgement). The four
  `/services/{pillar}` detail routes stay `pending` and 404 — Phase 5.7+.

Phase 5.7 (Training & Capacity Building) added
`/services/training-capacity-building`, `src/content/service-training.ts` and
`src/components/sections/services/service-detail-sections.tsx` — built from
`B · Service Detail Template — Training & Capacity Building` (`56:329`),
seven sections in frame order.

- **This is the shared Service Detail template.** Its hero is an instance of
  `Service Hero` and its cards are instances of `Service Module`, both of
  which carry a `Segment` axis, so every section component takes a `hue`
  prop and the page passes `violet` once. The other three services reuse
  these components in later phases — do not fork them.
- `07 · Enquiry CTA` is the same panel as the homepage closing CTA, so it
  reuses `ClosingCta`. Its `Request a consultation` button is the only CTA
  in the frame with a prototype reaction (→ `Overlay · Request a
consultation`), and it opens the shared popup.
- **The hero CTA has no prototype reaction in Figma.** `Enquire about this
service` links to `/contact`, where the same enquiry form is rendered
  inline — matching `Enquire about training` on the Services Overview. It is
  deliberately NOT wired to the consultation popup, which the designs
  reserve for `Request a consultation`.
- Module names come from `services.pillars` through a `moduleOf()` guard, as
  on the Services Overview; the per-module descriptions and `SCOPE` lines
  are copy this frame carries and exist nowhere else.
- The `06 · Related services` card for Advisory carries **shorter copy than
  the portfolio description** in `home.ts`; it is transcribed as drawn.
- `public/images/service-training-{hero,collage-a,collage-b}.jpg` and
  `service-card-{global,capital}.jpg` are the stock photos placed in the
  frame; the Advisory card reuses `services-advisory.jpg`. Credits are still
  owed (§6.4).
- **Services Overview hero is 64/72 on desktop** — a client instruction
  (Phase 5.7) applied to that one heading only, matching the homepage hero.
  Tablet (56/64) and mobile (44/52) are unchanged, and the
  `Desktop/Display/Hero` token stays at Figma's 72/80 everywhere else,
  including this service page's own hero.

Phase 5.8 (Advisory & Management Consulting + Training refinements) added
`/services/advisory-management-consulting` and
`src/content/service-advisory.ts`, and applied two Figma design updates to
the Training page.

**Training page updates** (Figma `56:329` changed; frame 6534 → 6406):

- `02 · Overview` (656 → 528): the lead paragraph moved out of the right
  value column and now sits under the H2 in the left `Statement` column.
- `05 · Methodology`: step 04 now carries a connector too, so the line runs
  on past the last node to the content edge. All four steps now match.

**Advisory page — PARTIAL, and deliberately so.**

- **Figma has no Advisory service-detail frame.** The only approved Advisory
  sources are the `Service Hero / Segment=Pink` instance in `B2`
  (`56:761`) and the `04 · Advisory` panel on the Services Overview
  (`85:1123`). Four of the template's seven sections have no Advisory copy
  at all, so they are **not built** rather than filled with invented text
  (§6). The scope note at the top of `src/content/service-advisory.ts`
  lists exactly what each one needs.
- Built: `01 · Service hero`, `03 · Modules` (without the `SCOPE` block,
  which has no Advisory copy), `06 · Related services`, `07 · Enquiry CTA`.
- Not built, awaiting client copy: `02 · Overview & value proposition`,
  `04 · Imagery & outcomes`, `05 · Methodology`, and the per-module
  `SCOPE` lines.
- `ServiceDetailModule.scope` / `.scopeLabel` are now **optional**; the card
  omits the hairline and SCOPE block when they are absent.
- The Modules section heading is `@placeholder` — it is the Training frame's
  heading re-pointed at advisory work so the section is not headless. The
  module names and descriptions under it ARE approved.
- `07 · Enquiry CTA` reuses the approved, service-neutral closing CTA from
  the Services Overview (`85:1370`); Figma draws no Advisory enquiry panel.
- **Every section component is shared with the Training page** — the hue is
  passed once as a prop. Nothing was duplicated, and Global Solutions and
  Tribe Capital were not started.

Phase 5.10 (Tribe Capital) added `/services/tribe-capital`,
`src/content/service-capital.ts`,
`src/components/capital/capital-enquiry-form.tsx`,
`src/components/sections/services/capital-enquiry-section.tsx` and
`src/lib/submit-capital-enquiry.ts`. Phase 5.9 (Global Solutions) was
skipped at the client's instruction and is still unbuilt.

- **Yellow is the one segment whose solid fill is a LIGHT surface.**
  `SERVICE_HUE` gained `surface: "dark" | "light"`, and the service hero now
  takes its text colour from `{hue}/on-solid` instead of a fixed white — so
  the Tribe Capital hero draws navy on `#FFBE2C`, as Figma does (§8: yellow
  never takes `text/inverse`). The other three heroes are unchanged.
- **Tribe Capital has a real, approved enquiry design**, unlike Training and
  Advisory: `Form/Tribe Capital Enquiry` (`111:7297`) inline in
  `03 · Tribe Capital enquiry` (`104:5829`). It replaces the template's
  generic `07 · Enquiry CTA`, and the hero CTA scrolls to it (`#enquiry`)
  rather than leaving for `/contact`.
- **It is NOT a duplicate of the consultation form.** It carries a package
  selector the consultation form does not have. The consultation popup is
  untouched and still opens from the header on this page.
- Transport is stubbed in `lib/submit-capital-enquiry.ts`: a valid submit
  shows an honest "not sent" notice, keeps every input, and never renders
  Figma's `State=Acknowledgement` (§9).
- **`Form/Package Option` was missing its radio.** Figma has always drawn a
  20px radio beside the text (`111:7432`); the Phase 2 component rendered
  only a stacked text card. It is now the Figma layout — radio, 12px gap,
  text column — with the timeline in `segment/yellow/text`. Used only by
  this form and its Storybook story.
- **Everything financial stays visibly provisional** (§6.5): a `PROVISIONAL`
  badge on the index row, a `TO CONFIRM` badge on each of the three
  packages, "· provisional" appended to every timeline in the selector, the
  selector's own caveat, and the panel's provisional note. No eligibility
  criteria, interest rates, returns, financing conditions or client outcomes
  exist in Figma and none were invented.
- **Sections not built** (no Tribe Capital copy in Figma): the template's
  Overview & value proposition, Modules, Imagery & outcomes and Methodology.
  The page is hero → enquiry (packages + form) → related services.

Phase 5.9 (Global Solutions) added `/services/global-solutions` and
`src/content/service-global.ts`. It was built after 5.10, having been
skipped at the time.

- `Service Hero / Segment=Orange` is `segment/orange/solid` (#BE4B2C) with
  **white** text — `surface: "dark"`, unlike Tribe Capital's yellow.
- **The three modules have no descriptions anywhere in Figma.** The Services
  Overview (`91:3543`) draws them as name-only cards and a document-wide
  search found no longer copy, so they ship as name-only cards here too.
  `ServiceDetailModule.description` is now optional alongside `scope`.
- `ServiceModules` lays modules out **three-up when the count divides by 3**
  and two-up otherwise, matching Figma: four Training/Advisory modules
  two-up, three Global Solutions modules in one row. Training and Advisory
  are unchanged (verified section-by-section).
- It also takes optional `chips` — the three `Badge/Tone=Orange` chips
  (`NETWORKING`, `DIGITAL PLATFORMS`, `SUSTAINABLE VALUE`) drawn beside the
  Global Solutions visual on `91:3543`.
- The modules heading is **approved copy, not invented**: the eyebrow is the
  `MODULES` overline from `91:3543`, and the title is the Global Solutions
  topic line from `F · FAQ — Desktop` → `Topic 04 · Global Solutions`.
- **Sections not built** (no Global Solutions copy): the template's Overview
  & value proposition, Imagery & outcomes, and Methodology.
- `07 · Enquiry CTA` reuses the approved, service-neutral closing CTA from
  the Services Overview (`85:1370`), as the Advisory page does.

**Routes:** `/`, `/about`, `/why-twt`, `/careers`, `/training-programs`,
`/industries`, `/contact`, `/services` and all four
`/services/{training-capacity-building,advisory-management-consulting,
global-solutions,tribe-capital}` pages exist. **Every route the navigation
references is now `live`** — `pendingRoutes()` returns an empty list. The
remaining `pending` links live in the footer only (FAQ, newsletters, the
three legal pages). Do not stub pages to make links resolve.

Not yet created, and expected in later phases:
`src/content/credits.ts` (§6.4), the `design-exceptions` file (§3.1),
layout/section components and routes (Phase 3).

> **`cn()` is not optional.** Our 42 type steps are `text-*` classes, and
> tailwind-merge's default config reads them as text _colours_ — so
> `cn("text-text-on-primary", "text-ui-button-large")` silently dropped the
> colour. `src/lib/cn.ts` registers the type steps under `font-size` to keep
> both. Use `cn()` rather than raw template strings when composing classes.

> **Note:** `/dev/tokens` is development-only. It calls `notFound()` when
> `NODE_ENV === "production"`, and the production build prerenders it with
> `status: 404`. Do not link to it from any real page.

> **Note:** `../WEB/` is a superseded pre-Figma prototype (Vite + React Router).
> It is reference-only and **must remain untouched**. Do not copy code or
> content from it — its service portfolio, fonts and page set no longer match
> the approved designs.

> **Note:** `AGENTS.md` exists in this directory. It is generated and re-added
> automatically by `next dev` and contains only Next.js' own advice to consult
> `node_modules/next/dist/docs/` for version-specific APIs. It does not conflict
> with anything here. `CLAUDE.md` is the authoritative project document.
