# Design tokens — Figma → Tailwind v4 mapping

How `src/styles/tokens.css` is produced, how each Figma value maps to a
Tailwind utility, and which decisions were judgement calls rather than
one-to-one transfers.

- **Source:** `The Working Tribe Website` — `fvvCEIlOGqFy33Tdw3eUSI`
- **Extracted:** 2026-11-11, read-only via the `figma-console` MCP bridge
- **Script:** [`extract-tokens.figma.js`](./extract-tokens.figma.js)
- **Output:** [`../src/styles/tokens.css`](../src/styles/tokens.css)

## What was extracted

| Source              | Count   | Where it lands                               |
| ------------------- | ------- | -------------------------------------------- |
| `Primitives`        | 56      | `:root` custom properties (no utilities)     |
| `Color`             | 65      | `@theme static` → `--color-*`                |
| `Segment`           | 36      | `@theme static` → `--color-segment-*`        |
| `Spacing & Shape`   | 36      | `:root` + `--radius-*` in `@theme`           |
| `Layout`            | 24      | `:root` + `--container-*` / `--breakpoint-*` |
| `Typography`        | 82      | `--text-*` / `--font-weight-*`               |
| **Variables total** | **299** | **0 unresolved aliases**                     |
| Text styles         | 42      | `--text-*` with size/lh/tracking/weight      |
| Effect styles       | 9       | `--shadow-*`, `--blur-header-glass`          |
| Grid styles         | 4       | documented below; not utilities              |
| Paint styles        | 4       | `--gradient-*`, `--overlay-*`                |

## Regenerating

1. Open the Figma file with the Desktop Bridge plugin running.
2. Run `extract-tokens.figma.js` through
   `mcp__figma-console__figma_execute`. It only reads.
3. Diff the result against the values embedded in `tokens.css` (every token
   carries its Figma path in a comment).
4. Update `tokens.css` and re-run the verification in §"Verification" below.

The extraction script is the reproducible artefact. `tokens.css` is
hand-maintained from its output so that each line can carry a provenance
comment — do not edit values in `tokens.css` without re-extracting.

## Naming rule

A Figma path maps to a CSS custom property by replacing `/` with `-`:

```
Figma                          CSS variable                      Utility
─────────────────────────────────────────────────────────────────────────────
violet/500                     --violet-500                      (none, by design)
background/brand               --color-background-brand          bg-background-brand
text/heading                   --color-text-heading              text-text-heading
border/focus                   --color-border-focus              border-border-focus
segment/yellow/on-solid        --color-segment-yellow-on-solid   text-segment-yellow-on-solid
radius/xl                      --radius-xl                       rounded-xl
Desktop/Heading/H1             --text-desktop-heading-h1         text-desktop-heading-h1
Elevation/1 · Card rest        --shadow-elevation-1              shadow-elevation-1
```

Names are verbose (`text-text-heading`) because fidelity to Figma was chosen
over brevity. Every utility in the codebase is greppable straight back to a
Figma variable, which is what CLAUDE.md §1 and §3 require.

## Architecture decisions

### Primitives generate no utilities

The 56 `Primitives` are plain `:root` properties, deliberately outside
`@theme`. There is no `bg-violet-500` utility. CLAUDE.md §3 says components
must use the semantic layer; this makes that structural rather than advisory.

### `@theme static`, not `@theme inline`

Tailwind v4 tree-shakes `@theme` variables down to the utilities it detects in
source. Semantic tokens referenced only dynamically — `var(--color-segment-…)`
built at runtime, or inline `style` attributes — were being dropped from
`:root` entirely, so they resolved to empty strings.

`@theme static` emits every declared token regardless of detected usage. A
design-token foundation has to guarantee that all 101 semantic tokens exist at
runtime, so `static` is correct here.

`@theme inline` was tried first and rejected: it inlines values into utilities
and emits **nothing** to `:root`, which breaks `var()` lookups from inline
styles and plain CSS rules such as the `body` colour.

### Tailwind's stock scales are cleared

`--color-*`, `--font-*`, `--text-*`, `--radius-*`, `--shadow-*`,
`--breakpoint-*` and `--container-*` are reset to `initial`. There is no
`bg-red-500`, no `text-xl`, no `rounded-3xl`, no `md:`. Everything available
traces to Figma.

Consequence worth knowing: **use `tablet:` and `desktop:`, not `sm:`/`md:`/
`lg:`/`xl:`/`2xl:`** — the stock variants no longer exist.

### Spacing keeps Tailwind's default scale

Figma's `space/*` is a 4/8-point scale. Tailwind's default `--spacing:
0.25rem` already generates every one of those values, so it was left intact
rather than overridden. Overriding it would have made `p-16` mean 16px instead
of the 64px every Tailwind developer expects.

The Figma names are still exposed as `--space-*` for traceability, usable as
`p-(--space-16)` where the provenance matters.

| Figma     | px  | Tailwind |
| --------- | --- | -------- |
| space/0   | 0   | `p-0`    |
| space/2   | 2   | `p-0.5`  |
| space/4   | 4   | `p-1`    |
| space/8   | 8   | `p-2`    |
| space/12  | 12  | `p-3`    |
| space/16  | 16  | `p-4`    |
| space/20  | 20  | `p-5`    |
| space/24  | 24  | `p-6`    |
| space/32  | 32  | `p-8`    |
| space/40  | 40  | `p-10`   |
| space/48  | 48  | `p-12`   |
| space/56  | 56  | `p-14`   |
| space/64  | 64  | `p-16`   |
| space/80  | 80  | `p-20`   |
| space/96  | 96  | `p-24`   |
| space/120 | 120 | `p-30`   |
| space/160 | 160 | `p-40`   |

### Breakpoints — the one real interpretation

This is the only place the implementation does not transfer a Figma value
literally, so it is called out explicitly.

Figma's `Layout` collection defines `breakpoint/desktop: 1440`,
`breakpoint/tablet: 768`, `breakpoint/mobile: 375`. Those are **artboard
widths** — the canvas sizes the designs were drawn at.

The 42 text styles carry the actual responsive thresholds in their
descriptions: **Desktop ≥1280 · Tablet 768–1279 · Mobile <768**.

A CSS breakpoint at 1440px would leave every 1280–1439px viewport rendering
tablet typography, contradicting the type specification. So:

| Purpose              | Token                  | Value  |
| -------------------- | ---------------------- | ------ |
| CSS media query      | `--breakpoint-desktop` | 1280px |
| CSS media query      | `--breakpoint-tablet`  | 768px  |
| Figma artboard width | `--canvas-desktop`     | 1440px |
| Figma artboard width | `--canvas-tablet`      | 768px  |
| Figma artboard width | `--canvas-mobile`      | 375px  |

Both sets are preserved; neither was silently discarded. **If the intent was
for the breakpoint to be 1440, this needs a design decision** — see the report
and CLAUDE.md §10.

### Typography is fixed-step, not fluid

Each of the 42 text styles is its own utility and does **not** change with the
viewport. `text-desktop-heading-h1` is 56px everywhere.

This is deliberate: the three scales are discrete design decisions, so a
component picks its step per breakpoint —
`text-mobile-heading-h1 tablet:text-tablet-heading-h1 desktop:text-desktop-heading-h1`
— rather than interpolating between them. CLAUDE.md §3 forbids interpolation,
and it also makes every step verifiable against Figma at any window size.

Figma tracking is a percentage of font size; converted to `em`
(−2% → `-0.02em`), which is the same relationship.

Figma weights map as: Light → 300, Regular → 400, Bold → 700.

**`UI/Overline` is UPPERCASE in Figma.** Tailwind's `--text-*` namespace cannot
express `text-transform`, so `globals.css` adds a `.text-ui-overline` utility
that supplies the casing. Applying the class gives you both.

### Grid styles are documented, not tokenised

The 4 Figma grid styles describe the column grid rather than any single value:

| Grid             | Columns | Gutter | Margin |
| ---------------- | ------- | ------ | ------ |
| Desktop · 12 col | 12      | 24px   | 80px   |
| Tablet · 8 col   | 8       | 20px   | 32px   |
| Mobile · 4 col   | 4       | 16px   | 16px   |
| Baseline · 8px   | —       | —      | —      |

Their parts already exist as `--columns-*`, `--gutter-*` and `--margin-*`.
`tokens.css` also resolves them responsively into `--grid-columns`,
`--grid-gutter` and `--page-margin`, so a layout primitive in Phase 2 can read
one variable instead of branching.

### Gradients and overlays

Figma `gradientTransform` matrices were converted to CSS angles:

| Figma paint style                   | CSS                                             |
| ----------------------------------- | ----------------------------------------------- |
| Gradient/Violet · App icon          | `linear-gradient(135deg, #a18efd, #6242fb)`     |
| Gradient/Violet deep                | `linear-gradient(135deg, #6242fb, #31217e)`     |
| Overlay/Navy scrim · Text on photo  | `linear-gradient(180deg, #07005200, #070052c7)` |
| Overlay/Violet wash · Photo duotone | `#6242fbb8` (solid #6242FB at 72%)              |

These are not a Tailwind namespace. Use
`bg-(image:--gradient-violet-deep)` or an inline `background-image`.

## Verification

Verified in Chrome against computed styles, not by reading the CSS:

- **235 token assertions** — every primitive hex, every semantic token
  resolving to the exact primitive Figma aliases it to, and every scalar.
  0 missing, 0 mismatched.
- **42 / 42 text styles** — size, line-height, tracking and weight each match
  the Figma spec. Tracking checked as a computed pixel value against
  `percent × size`.
- **Font** — `document.fonts.check()` confirms 300 / 400 / 700 all resolve to
  Sofia Sans Semi Condensed.
- Rendered at 1440 / 768 / 375.

The specimen page at `/dev/tokens` exists for exactly this comparison. It 404s
in production.

## Known gaps

- `Blur/Header glass` is exposed as `--blur-header-glass: 24px` but Tailwind's
  `backdrop-blur-*` namespace is not wired to it; use
  `backdrop-blur-(--blur-header-glass)`.
- Figma's `stroke/*` values (1 / 1.5 / 2px) are `:root` only — Tailwind has no
  border-width theme namespace, so use `border-(length:--stroke-default)`.
- The italic cut of Sofia Sans Semi Condensed is not shipped. No Figma text
  style uses italic.
