# Aesthetic Productivity Browser — Product Roadmap

Last updated: 2025-09-13

## Vision
A calm, beautiful browser that helps you stay in flow. It blends sleek, focused UI with lightweight organization and privacy — enough to feel personal and powerful, never heavy.

Guiding principles:
- Beautiful by default: polished motion, gentle gradients, tasteful empty states.
- Flow first: reduce friction, keep attention centered, encourage short wins.
- Opinionated, not overwhelming: simple, expressive customization.
- Local-first privacy: reassure without lecturing; clear, friendly language.

---

## Release plan (phased)

### 0.1.0 — MVP (Weeks 1–4)
Core loop: search → focus → browse with calm aesthetics.
- Beautiful Search Flow (overlay)
- Focus / Flow Mode (distraction-dimming)
- Ambient Aesthetics (themes, backgrounds, subtle motion)
- Customization Lite (theme + background picker)
- Privacy Baseline (easy on/off, friendly status)

Progress (as of 2025-09-13):
- [x] Quick Search palette (Ctrl/Cmd+K) delivered as a dedicated Spotlight window using `SearchManager` (suggestions, engines). Closes on outside click/ESC; DevTools hotkey for debugging. Follow-ups: deepen theme token integration, add gentle open/close animation, measure latency.
- [x] Focus / Flow Mode toggle (toolbar + Ctrl/Cmd+Shift+F). Accessible; respects reduced motion. Follow-ups: persist per board; add dimming intensity control.
- [ ] Ambient Aesthetics polish (foundations exist: themes/background assets). To add: picker UX, perf pass, subtle motion.
- [ ] Customization Lite (theme + background picker UI) — not started.
- [ ] Privacy Baseline (toggle, per-site allowlist, friendly status) — not started.

Success criteria (MVP):
- New user can search (Ctrl/Cmd+K), open results, switch focus mode, change theme/background without docs.
- No jank on a modest laptop: search overlay opens <150ms, 60fps animations, memory stable over 30 min.
- Privacy toggle works on common trackers; clear, non-alarmist status.

### 0.2.0 — Organized Flow (Weeks 5–8)
Structure browsing without clutter.
- Workspace Boards v1 (group tabs into named boards)
- Session Cards (auto-saved sets with covers)
- Split View v1 (two panes)
- Mini Gamification v1 (gentle streaks/progress)

### 0.3.0 — Insightful Flow (Weeks 9–12)
Add optional insight and depth.
- Knowledge Graph Lite (experimental flag)
- Privacy Insights v2 (calm summaries)
- Split View advanced (3+ tiles, presets)

---

## Feature briefs (10)
Each brief includes UX snapshot, tech notes, dependencies, definition of done (DoD), and KPIs.

### 1) Beautiful Search Flow
- UX: Centered Spotlight/Raycast-style overlay. Keyboard: Ctrl/Cmd+K. Suggestions: default engine + recent history. Crisp, card-like results.
- Tech: Use existing `Overlay` + `SearchManager` modules, `html/overlay.html`, `css/overlay.css`, `js/overlay.js`. Animate via CSS (prefers-reduced-motion aware). Debounced search.
- Dependencies: Theme tokens (see `docs/DESIGN_SYSTEM.md`), Search engine setting, History access.
- DoD:
  - Invokable via keyboard (configurable) and toolbar.
  - Shows top engine results + recent history in <150ms after input (local cache for history).
  - Accessible: tab/arrow navigation, screen-reader labels, high-contrast compatible.
  - 60fps open/close animation; passes perf budget.
- KPIs: Overlay open latency, result click-through, abandonment rate, key-only navigation completion.

Status (v0 implemented):
- Implemented as a dedicated Spotlight window bound to Ctrl/Cmd+K, reusing `SearchManager` for suggestions/engines. Close on outside click/ESC. DevTools toggle for debugging.
- Pending: history-backed suggestions, perf budget validation/telemetry, refined animation and full theme-token styling.

### 2) Workspace Boards
- UX: Notion/Pinterest-like boards: named groups, large previews, tidy grid. Drag tabs to boards. Quick switcher.
- Tech: Extend `TabManager` + local JSON storage via `modules/saveFileToJsonFolder.js` and `loadFileFromJsonFolder.js`. Board schema: { id, name, createdAt, tabRefs[], cover }.
- Dependencies: Session model, thumbnail generation, theme tokens.
- DoD:
  - Create/rename/delete boards; add/remove tabs.
  - Persist on disk; restore on launch.
  - Grid renders 60fps; keyboard navigation for cards.
- KPIs: Board create/use rate, average tabs per board, restore success rate.

### 3) Session Cards
- UX: When closing a set, save as a “card” with title + thumbnails. Grid gallery with search and restore.
- Tech: Leverage `HistoryManager` + `TabManager`. Store sessions as JSON bundles + preview images.
- Dependencies: Thumbnail capture, file I/O utilities, Sessions/Boards model.
- DoD:
  - Auto create session on window close or explicit save.
  - Card shows title, date, up to N thumbnails; restore opens tabs.
  - Conflict-safe naming; dedupe.
- KPIs: Sessions saved/restored, restore time, user-rated usefulness (thumbs up/down).

### 4) Knowledge Graph Lite (Optional/Flagged)
- UX: Toggle reveals a simple graph of sites visited in a session. Nodes (domains/pages), edges (navigation). Calm animation, hover previews.
- Tech: In-memory graph collector; render with lightweight graph lib (e.g., Cytoscape.js/D3). Export with session.
- Dependencies: History events, performance guardrails, feature flag.
- DoD:
  - Toggle in settings; disabled by default.
  - Renders <2k nodes smoothly; degrades to clustered view beyond threshold.
  - Export with session card; local only.
- KPIs: Opt-in rate, render performance, export usage.

### 5) Ambient Aesthetics
- UX: Soft gradients, wallpapers, gentle parallax/particles (optional). Respect reduced motion; zero noise by default.
- Tech: Use `themes/` + `backgrounds/`, CSS variables from design system, animation module `css/modules/animations.css`.
- Dependencies: Theme loader (`modules/applyTheme.js`), settings.
- DoD:
  - Background selection with preview; persists.
  - Animations gated by motion preference/perf flag; 60fps.
- KPIs: Theme/background apply rate, frame timing, opt-out of motion.

### 6) Mini Gamification
- UX: Tiny progress indicators (focus streaks, session ring). No popups; gentle microcopy.
- Tech: Track focus sessions in local store; ring component in toolbar/overlay.
- Dependencies: Focus mode events, settings opt-in.
- DoD:
  - Streak counter + ring; resets rules clear; opt-in default off.
  - No blocking UI; accessible (aria-live polite off by default).
- KPIs: Opt-in %, weekly retention among opt-in, average focus session length.

### 7) Split View Browsing
- UX: Two panes (v1), draggable divider, per-pane nav. Shortcuts to tile left/right.
- Tech: Two `<webview>` elements in `browser.html` with layout in `css/browser.css`; shared navigation state. Persist layout per board/session.
- Dependencies: Tab model refactor, performance testing, keyboard shortcuts.
- DoD:
  - Open second pane; drag divider; per-pane focus and address bar.
  - Remember layout per board; 60fps resize.
- KPIs: Split usage %, time-in-split, navigation errors.

### 8) Focus / Flow Mode
- UX: Dims non-active content; hides chrome; optional timer; breathing room visual.
- Tech: Overlay or CSS class on root to dim/hide non-essential UI. Per-tab or per-board.
- Dependencies: Theme tokens, timer logic, shortcut.
- DoD:
  - Toggleable via toolbar and shortcut; persists per board.
  - Dimming configurable; respects reduced motion.
- KPIs: Focus mode activation rate, average focus session, distraction toggles per hour.

Status (v0 implemented):
- Implemented toggle via toolbar and Ctrl/Cmd+Shift+F. Respects reduced motion; accessible. Persistence per board and fine-grained dimming controls are planned.

### 9) Customization Without Overload
- UX: Slack-like theme picker + background gallery. Clear presets; one advanced panel hidden behind “Advanced”.
- Tech: Leverage `themes/` (JSON), `modules/applyTheme.js`, settings UI (`html/settings.html`, `js/settings.js`).
- Dependencies: Design tokens, validation of theme JSON.
- DoD:
  - Apply theme instantly; preview; revert.
  - Export/import a theme safely.
- KPIs: Theme change frequency, revert rate, export/import usage.

### 10) Privacy Without the Lecture
- UX: Friendly shield with calm wording ("Protection On"). Weekly summary, not warnings.
- Tech: Electron `session.webRequest` filters; optional adblock engine integration later. Local counters only.
- Dependencies: Settings toggles, per-site exceptions, persistence.
- DoD:
  - On/Off + per-site allowlist; clear status in UI.
  - Blocks common trackers; no breakage on top 100 sites smoke test.
- KPIs: Enable rate, per-site exception rate, breakage reports.

---

## Dependencies & sequencing
- Foundations (0.1):
  - Design tokens + theme loader refresh (link `docs/DESIGN_SYSTEM.md`).
  - Overlay baseline for search & focus.
  - Settings pages for theme/privacy.
- 0.2 builds on: persisted models (boards, sessions), thumbnail capture, split layout.
- 0.3 adds: graph collector (off by default), insights.

Risk areas and mitigations:
- Performance (overlays/animations): profile, prefer CSS transforms, respect reduced motion.
- Webview split complexity: start with 2 panes; ship progressive enhancements.
- Ad/tracker blocking breakage: simple allowlist UI; conservative defaults.
- Data model churn: version stored JSON; migrations via light adapters.

Feature flags:
- Knowledge Graph Lite (default off, `experimental.graph=true`).
- Split View advanced (default off until stable).
- Motion extras (default off on low-power devices).

---

## Timeline (suggested)
- Weeks 1–2: Search overlay, Focus Mode, Theme/background picker (MVP slice).
- Weeks 3–4: Privacy baseline, performance passes, polish + QA → 0.1.0.
- Weeks 5–6: Boards + Session Cards basics; thumbnails; persistence.
- Weeks 7–8: Split View v1; Mini Gamification v1; QA → 0.2.0.
- Weeks 9–10: Knowledge Graph Lite (flagged); Privacy insights.
- Weeks 11–12: Split advanced; polish + docs → 0.3.0.

---

## Success metrics (roll-up)
- Adoption: DAU, new-user activation (used search overlay + changed theme in day 1).
- Flow: Avg focus session length; reduction in tab switching while in Focus Mode.
- Organization: Boards created per user; session restore rate.
- Stability & perf: Crash-free sessions; overlay open latency; 60fps on key animations.
- Privacy: Enable rate; low exception rate; user trust (simple pulse survey).

---

## References
- Design tokens & system: `docs/DESIGN_SYSTEM.md`
- Themes: `themes/`, background assets: `backgrounds/`
- UI pages: `html/`, styles: `css/`, scripts: `js/`
- Managers: `modules/*Manager/`, utilities: `modules/*.js`

Notes: This roadmap is intentionally scoped to ship value every 2–4 weeks. If scope risks a delay, ship the simplest coherent slice first (e.g., Split View 2-pane only) and defer advanced options behind flags.
