# Onyx Design System

A practical guide to build new features that look and feel native to Onyx. It documents the design tokens, components, interaction patterns, and layout rules already used across the app, so you can extend the UI consistently.

> Scope: This is derived from the current codebase (CSS modules under `css/modules`, page styles like `css/settings.css`, theme logic in `modules/applyTheme.js` and `modules/loadTheme.js`). It focuses on primitives and patterns that are stable and reusable.

---

## 1. Design Tokens (CSS Variables)

Tokens are set by the active theme through `applyTheme(theme, dark)` which writes CSS variables to `:root`. Use these variables everywhere—never hardcode colors/metrics.

- Color tokens
  - `--color-back`: Page background
  - `--color-element`: Default surface (cards, fields, buttons)
  - `--color-border`: Borders, dividers, subtle fills
  - `--color-second`: Hover/secondary surface
  - `--color-top`: Foreground text and icons
  - `--color-titlebar`: Titlebar surface and active/pressed feedback
  - `--color-accent`: Accent highlight (theme-defined)

- Elevation & emphasis
  - `--shadow-focus`: Focus ring shadow used on focusable elements
  - `--opacity-over`: Dim factor for disabled, blur states, or lower-priority content

- Shape & typography
  - `--px-radius`: Global corner radius. Every component should use it or a small offset (e.g. `calc(var(--px-radius) + 4px)`)
  - `--px-font`: Base font size (defined per-page, e.g., `settings.css`)

- Status colors (local constants in pages)
  - `--color-red`, `--color-green`, `--color-blue`, `--color-orange`: Supplemental semantic colors

Guidelines
- Use surfaces: `--color-element` for components, `--color-second` for hover states.
- Borders: 1px with `--color-border` for subtle separation.
- Text/icons: `--color-top` on any surface for legibility.
- Avoid direct color values unless absolutely necessary.

---

## 2. Layout Patterns

### 2.1 Page grid (Settings)
- Desktop (`min-width: 900px`): grid with two columns — sidebar then content.
  - `grid-template-columns: 24% 1fr` (sidebar width may vary by page, but ≤ 32%).
  - Areas: `"header header"` then `"sidebar content"`.
- Mobile (`max-width: 899px`): sidebar collapses to a top bar (border switches to bottom divider).

### 2.2 Containers
- `.container`: Section panels in content area.
  - Use internal spacing (e.g., padding 28px in settings) and separate with `hr` using `--color-border`.
  - Titles use a larger font; labels (`.nav-label`) are inline, compact.

### 2.3 Theme Manager
- Use a repeatable card per theme (`.theme`) inside `#theme-manager`.
- Each card contains: name, description, preview images (light/dark), and selection controls.
- Maintain consistent image sizes and spacing. Use inline blocks or a small grid inside the card to keep previews aligned.

---

## 3. Components

All components inherit base tokens and should react to hover/active/focus using theme surfaces.

### 3.1 Buttons (`.nav-btn`)
- Anatomy: icon (optional) + label.
- States
  - Default: `background: transparent` or `--color-element` when `.with-border`
  - Hover: `--color-second`, keep border `--color-border`
  - Active/Selected: `--color-titlebar`
  - Focus: `box-shadow: var(--shadow-focus)`
  - Disabled: `opacity: var(--opacity-over)`

### 3.2 Link buttons (`.link`)
- Style: inline, small, bordered pill.
- Hover: `--color-second`; Active: `--color-border`; Focus: `--shadow-focus`.

### 3.3 Inputs (`input[type=text]`)
- Surface: `--color-element`, border `--color-border`.
- Hover: `--color-second`; Active: `--color-titlebar`.
- Focus: `--shadow-focus`.

### 3.4 Checkbox (`.nav-checkbox > input[type=checkbox]`)
- Custom switch style
  - Track: 40×24, `--color-element`, border `--color-border`.
  - Thumb: pseudo-element `::after` (12×12) sliding to the right when checked.
  - Hover: track `--color-second`; Active: track `--color-titlebar`; Focus: `--shadow-focus`.

### 3.5 Radio (`input[type=radio]`)
- 24×24 with rounded thumb in `::after`.
- Same hover/active/focus patterns as checkbox; uses `--color-element`, `--color-border`, `--color-titlebar`.

### 3.6 Titlebar & Window Controls
- Lives under `#titlebar` with `modules/titlebar.css`.
- Uses `.nav-btn` for controls; hover/active like other buttons.
- `body.system-titlebar` hides the custom titlebar when OS titlebar is in use.

### 3.7 Notifications, Tabs (overview)
- Notifications (`css/modules/notifications.css`) follow same tokens (border/element/second/top).
- Tabs (`css/modules/tabs.css`) and overlay buttons mirror nav-btn behaviors.

---

## 4. Interaction & Motion

- Animations (see `css/modules/animations.css`)
  - `slide-right`, `slide-left`, `slide-up`, `slide-down` for entering content.
  - `append-center` for appended elements.
- Use subtle durations (≈250ms) and avoid large transforms.
- Focus states: always include `--shadow-focus` on focusable controls.
- Opacity dim (`--opacity-over`): use for disabled states or backgrounding blurred titlebar content.

Accessibility
- Keep sufficient contrast between `--color-top` and background surfaces.
- Use semantic elements (e.g., `label` linked to `input`) and preserve keyboard focusability.

---

## 5. Theme System

- `modules/loadTheme.js`: resolves active theme JSON (default `ferny.json`).
- `modules/applyTheme.js`: applies tokens to `:root` and switches icon set via `setIconsStyle()` based on light/dark.
- Theme JSONs include:
  - `pxRadius`, separate `light` and `dark` palettes with values for all tokens (back, element, border, second, top, titlebar, accent), plus `shadowFocus` and `opacityOver`, and icon pack names.

Creating new themes
- Provide both `light` and `dark` variants and preview images.
- Ensure readable contrast and consistent component behavior.

---

## 6. Usage Guidelines for New Features

- Always use the tokens; never hardcode colors or radii.
- Reuse component classes when possible (e.g., `.nav-btn`, `.link`, `.nav-checkbox`).
- Align with existing spacing: use small increments (2px, 4px, 8px, 16px) and border 1px with `--color-border`.
- Prefer simple grid or flex patterns already present.
- Motion: use the predefined keyframes for section transitions.

Do
- Use `--color-element` for panels, `--color-second` for hover states.
- Keep switch and radio sizes consistent (40×24 and 24×24 respectively).
- Add `:focus` styles via `--shadow-focus`.

Avoid
- Introducing new colors or shadows unless added to theme JSON and `applyTheme`.
- Overriding component sizes ad hoc.
- Removing hover/active states—consistency relies on them.

---

## 7. Component Examples (snippets)

- Button
```html
<button class="nav-btn with-border">
  <img class="theme-icon" name="save-16" />
  <label>Save</label>
</button>
```

- Checkbox row
```html
<div class="nav-checkbox">
  <label>System titlebar</label>
  <input type="checkbox" />
</div>
```

- Radio row
```html
<div class="nav-checkbox">
  <label>Light</label>
  <input type="radio" name="theme" />
</div>
```

- Input
```html
<input type="text" placeholder="Home page URL" />
```

- Theme card (structure)
```html
<div id="theme-manager">
  <div class="theme">
    <label class="theme-name">Theme Name</label>
    <label class="theme-description">Short description</label>
    <img class="theme-image" src="../previews/light.png" />
    <img class="theme-image" src="../previews/dark.png" />
    <div class="nav-checkbox">
      <label>Light</label>
      <input type="radio" name="theme" />
    </div>
    <div class="nav-checkbox">
      <label>Dark</label>
      <input type="radio" name="theme" />
    </div>
  </div>
</div>
```

---

## 8. Contributing & Extending

- Place shared styles in `css/modules/*` and page-specific tweaks in the page stylesheet.
- When adding a new component:
  1) Define its base look using tokens.
  2) Provide hover/active/focus states following existing patterns.
  3) If new tokens are needed, update theme JSONs and `applyTheme` accordingly.
- Test in both light and dark modes—icon set may change.

---

## 9. Checklist for Consistency

- [ ] Uses CSS variables from `:root` (no hardcoded colors)
- [ ] Supports hover, active, and focus states
- [ ] Respects `--px-radius` for corners
- [ ] Borders use `--color-border` (1px)
- [ ] Text/icons use `--color-top`
- [ ] Works in both light and dark themes
- [ ] Responsive layout follows existing grid/flex patterns

---

This document should help keep newly built features visually aligned with Onyx while remaining flexible across themes. Update it as patterns evolve.
