/**
 * Figma token extraction — READ-ONLY.
 *
 * Run this through the `figma-console` MCP bridge:
 *
 *   mcp__figma-console__figma_execute({ code: <contents of this file> })
 *
 * It performs no writes. Every call is a getter, and nothing in the Figma
 * document is created, renamed, re-bound or deleted. See CLAUDE.md §1.
 *
 * NOTE: this file is documented as the reproducible source of
 * `src/styles/tokens.css`. If Figma changes, re-run this, diff the output
 * against the previous snapshot, and regenerate the stylesheet.
 *
 * IMPORTANT: the TWT file runs with `documentAccess: dynamic-page`, so only
 * the async style APIs work — `getLocalPaintStylesAsync` etc. The synchronous
 * equivalents throw.
 *
 * Last run: 2026-11-11 — 299 variables / 6 collections, 0 unresolved aliases.
 */

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const variables = await figma.variables.getLocalVariablesAsync();
const byId = new Map(variables.map((v) => [v.id, v]));

/** Figma RGBA (0–1 floats) → #rrggbb, or #rrggbbaa when alpha < 1. */
const hex = (c, alphaOverride) => {
  const h = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  const a = alphaOverride !== undefined ? alphaOverride : (c.a ?? 1);
  return "#" + h(c.r) + h(c.g) + h(c.b) + (a < 1 ? h(a) : "");
};

const unresolved = [];

/** Follow VARIABLE_ALIAS chains to a concrete value, recording failures. */
const resolve = (value, depth = 0) => {
  if (value && typeof value === "object" && value.type === "VARIABLE_ALIAS") {
    if (depth > 10) {
      unresolved.push({ id: value.id, reason: "alias depth > 10" });
      return { alias: value.id, resolved: null };
    }
    const target = byId.get(value.id);
    if (!target) {
      unresolved.push({ id: value.id, reason: "target not found" });
      return { alias: value.id, resolved: null, missing: true };
    }
    const inner = resolve(Object.values(target.valuesByMode)[0], depth + 1);
    return { alias: target.name, resolved: inner.resolved };
  }
  if (value && typeof value === "object" && "r" in value) {
    return { resolved: hex(value) };
  }
  return { resolved: value };
};

/* ---------------------------------------------------- variable collections */
const out = {};
for (const collection of collections) {
  const entries = [];
  for (const id of collection.variableIds) {
    const v = byId.get(id);
    if (!v) continue;
    const entry = { name: v.name, type: v.resolvedType };
    if (v.description) entry.description = v.description;
    entry.valuesByMode = {};
    for (const mode of collection.modes) {
      const r = resolve(v.valuesByMode[mode.modeId]);
      entry.valuesByMode[mode.name] = r.alias
        ? { alias: r.alias, resolved: r.resolved }
        : r.resolved;
    }
    entries.push(entry);
  }
  out[collection.name] = {
    modes: collection.modes.map((m) => m.name),
    count: entries.length,
    variables: entries,
  };
}

/* ------------------------------------------------------------- text styles */
const textStyles = (await figma.getLocalTextStylesAsync()).map((s) => ({
  name: s.name,
  description: s.description,
  fontFamily: s.fontName.family,
  fontStyle: s.fontName.style,
  fontSize: s.fontSize,
  lineHeight: s.lineHeight.unit === "PIXELS" ? s.lineHeight.value : s.lineHeight.unit,
  letterSpacing:
    s.letterSpacing.unit === "PERCENT"
      ? s.letterSpacing.value + "%"
      : s.letterSpacing.value,
  textCase: s.textCase,
}));

/* ----------------------------------------------------------- effect styles */
const effectStyles = (await figma.getLocalEffectStylesAsync()).map((s) => ({
  name: s.name,
  effects: s.effects.map((e) => ({
    type: e.type,
    offsetX: e.offset?.x,
    offsetY: e.offset?.y,
    radius: e.radius,
    spread: e.spread,
    color: e.color ? hex(e.color, e.color.a) : undefined,
    visible: e.visible,
  })),
}));

/* ------------------------------------------------------------- grid styles */
const gridStyles = (await figma.getLocalGridStylesAsync()).map((s) => ({
  name: s.name,
  grids: s.layoutGrids.map((g) => ({
    pattern: g.pattern,
    count: g.count,
    gutterSize: g.gutterSize,
    offset: g.offset,
    alignment: g.alignment,
    sectionSize: g.sectionSize,
  })),
}));

/* ------------------------------------------------------------ paint styles */
const paintStyles = (await figma.getLocalPaintStylesAsync()).map((s) => ({
  name: s.name,
  description: s.description,
  paints: s.paints.map((p) =>
    p.type === "GRADIENT_LINEAR" || p.type === "GRADIENT_RADIAL"
      ? {
          type: p.type,
          stops: p.gradientStops.map((g) => ({
            position: +g.position.toFixed(4),
            color: hex(g.color, g.color.a),
          })),
          gradientTransform: p.gradientTransform,
        }
      : {
          type: p.type,
          color: p.color ? hex(p.color, p.opacity) : undefined,
          opacity: p.opacity,
        },
  ),
}));

return {
  extractedAt: new Date().toISOString(),
  fileKey: figma.fileKey,
  totals: {
    collections: collections.length,
    variables: variables.length,
    textStyles: textStyles.length,
    effectStyles: effectStyles.length,
    gridStyles: gridStyles.length,
    paintStyles: paintStyles.length,
  },
  unresolvedAliases: unresolved,
  collections: out,
  textStyles,
  effectStyles,
  gridStyles,
  paintStyles,
};
