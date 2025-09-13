<p align="center">
  <img src="/imgs/icon128.png" alt="Onyx icon">
</p>

<h1 align="center">Onyx — Aesthetic Productivity Browser</h1>
<p align="center">A calm, beautiful Chromium-based browser focused on flow, organization, and friendly privacy. Built with Electron and JavaScript.</p>

<p align="center">
  <a href="https://github.com/AstricX9/OnyxBrowser"><strong>GitHub</strong></a> ·
  <a href="/docs/ROADMAP.md"><strong>Roadmap</strong></a> ·
  <a href="#quick-start"><strong>Quick Start</strong></a>
</p>

## Highlights

- Beautiful Search Flow: Spotlight-style overlay with sleek, centered cards.
- Workspace Boards: Group tabs into tidy, visual boards (research, shopping, etc.).
- Session Cards: Save/restore tab sets with titles and thumbnails.
- Knowledge Graph Lite (optional): Visual map of your browsing session.
- Ambient Aesthetics: Gentle gradients, wallpapers, motion that respects reduced motion.
- Mini Gamification: Tiny progress/streak indicators to encourage flow.
- Split View Browsing: Two panes side-by-side (advanced layouts later).
- Focus / Flow Mode: Distraction-dimming, hide chrome, optional timer.
- Simple Customization: Themes/backgrounds without overload.
- Friendly Privacy: Tracker/ad blocking with reassuring, clear status.

See the full plan in the roadmap: `/docs/ROADMAP.md`.

## Screenshots

<p>
  <img src="/docs/imgs/ferny/overlay.png" alt="Overlay" width="45%"/>
  <img src="/docs/imgs/ferny/search.png" alt="Search" width="45%"/>
</p>
<p>
  <img src="/docs/imgs/ferny/history.png" alt="History" width="45%"/>
  <img src="/docs/imgs/ferny/settings.png" alt="Settings" width="45%"/>
</p>

## Quick Start

Requirements:
- Node.js (LTS recommended) and npm
- Windows or Linux (Electron)

Install dependencies and start the app in development:

```powershell
npm install
npm start
```

## Build installers

Build for Windows and Linux (see `package.json` scripts):

```powershell
# All platforms configured for this machine
npm run dist

# Or target a specific platform
npm run dist-win
npm run dist-linux
```

Outputs are created by electron-builder according to the `build` config in `package.json`.

## Contributing

Issues and PRs are welcome. If you’re proposing a feature, please check the `/docs/ROADMAP.md` first and open an issue to discuss scope and UX. For UI work, see `/docs/DESIGN_SYSTEM.md` and existing themes in `/themes/` and backgrounds in `/backgrounds/`.

## License

GPL-3.0 — see [`LICENSE`](./LICENSE).
