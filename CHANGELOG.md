# 2MoonsCE – Changelog

All changes by **0wum0** unless otherwise noted.  
Project: [github.com/0wum0/2MoonsCE](https://github.com/0wum0/2MoonsCE)

---

## [Unreleased] – 2026

### Defensive Programming & Stability
- Added `Database::selectSingleSafe()` — returns `null` instead of `false`, no breaking change — by 0wum0
- Fixed `ShowPlayerCardPage`: guard against null result for invalid player ID — by 0wum0
- Fixed `ShowRaportPage`: moved null check before array access to prevent fatal error — by 0wum0
- Fixed `ShowBuddyListPage`: guard against null userData for invalid friend ID — by 0wum0
- Fixed `ShowChangelogPage`: guard against missing file before `file_get_contents()` — by 0wum0
- Added `class_exists()` guard in `game.php` and `index.php` routers after `require_once` — by 0wum0

### Login / Registration
- Added math CAPTCHA `ensureSession()` — calls `Session::init()` before `session_start()` — by 0wum0
- Fixed `Session::init()`: skip `ini_set()` calls if session is already active — by 0wum0
- Fixed HTML escaping in login template: applied `|raw` filter to `loginInfo` and `descText` — by 0wum0
- Added "Remember me" checkbox to login form with language key `loginRemember` — by 0wum0
- Redesigned login and registration forms with improved readability, contrast, and typography — by 0wum0
- Added honeypot anti-spam field to registration form (CSS-hidden, `tabindex="-1"`) — by 0wum0
- Added math CAPTCHA to registration form (server-side, session-based) — by 0wum0
- Added registration rate limiting per IP (max 3/hour) via `RegistrationRateLimit` — by 0wum0
- Scoped `main.css` body/input rules with `:not(.auth-body)` to prevent conflicts with `auth.css` — by 0wum0

### Changelog Page
- Added in-game changelog page (`game.php?page=changelog`) — by 0wum0
- Added changelog link in game footer next to game name — by 0wum0
- Added `menu_changelog` language key to all languages (de/en/es/fr) — by 0wum0

---

## [v4.1] – 2025 – 2026

### Admin Panel
- Migrated admin dashboard CSS to aerospace space theme with Orbitron/Exo 2 fonts and unified design tokens — by 0wum0
- Added legacy-content wrapper and aerospace theme styling to admin forms, tables, and tab navigation — by 0wum0
- Added Admin Debug Panel: active plugins/hooks/modules — by 0wum0
- Added quick-edit popup function to admin header — by 0wum0
- Fixed admin template syntax errors and improved Twig attribute access — by 0wum0
- Fixed `ShowAccountDataPage` and `ShowAlliancePage` — by 0wum0
- Fixed `ShowRightsPage`: removed redundant session validation, added null-coalescing guards — by 0wum0
- Fixed `ShowResetPage`: null-coalescing operator on `sid` parameter — by 0wum0

### Chat System (SmartChat)
- Replaced iframe-based chat with comprehensive SmartChat: BBCode support, admin moderation, ban management, real-time polling — by 0wum0
- Moved chat FAB and panel from bottom-left to bottom-right — by 0wum0
- Added UTF-8 encoding parameter to message input handling — by 0wum0
- Only show toast notifications for messages from other users; limit to one toast at a time — by 0wum0
- Added localStorage persistence for chat message tracking — by 0wum0
- Added close button to toast notifications — by 0wum0
- Bumped DB version to 12; added `IF NOT EXISTS` to `ALTER TABLE` statements for idempotent migrations — by 0wum0
- Fixed PHP 8.3 `version_compare` type error in chat entity decode — by 0wum0

### Galaxy Map (3D)
- Implemented 3D Galaxy Map with Three.js — by 0wum0
- Fixed flyTo snap-back: orbit target syncs after landing, recalculates theta/phi — by 0wum0
- Fixed planet selection ring (RingGeometry, dispose on rebuild) — by 0wum0
- Fixed fleet lines: own=cyan, ally=purple, hostile=dashed-red (blinking), foreign=dashed-gray — by 0wum0
- Fixed JSON parse errors with console logging of first 200 chars — by 0wum0
- Fixed loader: 8s failsafe `setTimeout` always hides loader regardless of fetch outcome — by 0wum0
- Added navJump (clamp g=1..9, s=1..499) and navHome with feedback hints — by 0wum0

### Overview Page
- Complete overview page redesign: three-column layout, news carousel, queue cards — by 0wum0
- Added news carousel with BBCode editor and navigation controls — by 0wum0
- Added cinematic hero section for planet view: parallax effects, star field canvas, interactive hover — by 0wum0
- Moved colonies and debris cards to left column; relocated quick action buttons below planet scene — by 0wum0
- Moved server info to right overlay panel; replaced with quick actions column — by 0wum0

### Fleet & Header
- Fixed fleet-movement and navigation headers (multiple iterations) — by 0wum0
- Re-init header queue timers after AJAX page refresh — by 0wum0
- Fixed timer data attributes to use `resttime` instead of `endtime` — by 0wum0
- Added header notification badge auto-refresh on AJAX content updates — by 0wum0
- Redesigned resource bar with full-width image backgrounds and mobile responsiveness — by 0wum0
- Fixed fleet line positioning with sun fallback and deferred planet resolution — by 0wum0
- Added mobile-friendly ship selection cards with stepper controls — by 0wum0

### Forum
- Added in-game forum with categories, posts, BBCode — by 0wum0
- Added forum notifications and authentication — by 0wum0
- Added playercard modal to forum pages — by 0wum0
- Fixed forum admin: categories, page layout, BBCode toolbar — by 0wum0
- Added BBCode support to alliance pages — by 0wum0
- Fixed modal system: replaced Fancybox with custom modal — by 0wum0

### Plugin System
- Implemented Plugin System v1.0 — by 0wum0
- Upgraded Plugin System v1.1: refactored core, fixed language loading — by 0wum0
- Upgraded Plugin System v1.2: `ElementRegistry` + double-include guards — by 0wum0
  - Fixed `reslist['allow']` string vs int key corruption — by 0wum0
  - Fixed `exportLegacyPricelist()` to be merge-additive — by 0wum0
  - Fixed `hasNewElements()` gate blocking pricelist export for plugin buildings — by 0wum0
  - Fixed `runSqlFile()` to continue past per-statement errors — by 0wum0
- Added Plugin: **GalacticEvents** — by 0wum0
- Added Plugin: **RewardPoolEngine** — by 0wum0
- Added Plugin: **GalaxyMarkerAPI** — by 0wum0
- Added Plugin: **CoreQoLPack** — by 0wum0
- Added Plugin: **Relics & Doctrines** — by 0wum0
- Added Safe-Mode: auto-deactivate plugin/module on crash — by 0wum0

### Module System
- Implemented Full Modular Gameplay Engine v2 — by 0wum0
  - `GameModuleInterface`, `GameContext`, `ModuleManager` — by 0wum0
  - Core modules: `ProductionModule`, `QueueModule` — by 0wum0
  - Plugins register modules via manifest `"modules"` key — by 0wum0

### PHP 8.3 Compatibility & Bug Fixes
- Fixed `MissionCaseAttack`: array strictness for loot/debris field (PHP 8.3) — by 0wum0
- Fixed `MissionCaseAttack`: uninitialized string offset 901 — by 0wum0
- Fixed various `array offset on false` warnings across game pages — by 0wum0
- Fixed null-coalescing operators on `action`, `get`, `sid` parameters throughout admin — by 0wum0
- Fixed `Rights` and `UserList` unserialization empty-checks — by 0wum0
- Fixed timezone selector: flattened array for dropdown compatibility — by 0wum0
- Fixed `shortly_number()`: added string type support and explicit float casting — by 0wum0

### UI / CSS
- Complete SmartMoons v4.0 redesign — by 0wum0
- Split CSS into multiple files, fixed CSS errors — by 0wum0
- Integrated notification styles into `smartmoons.css`; removed `smartmoons-fix.css` — by 0wum0
- Fixed sidebar on mobile: teleport to body — by 0wum0
- Fixed sidebar overlay and positioning — by 0wum0
- Fixed `.no-js { display:none }` white-page bug — by 0wum0
- Reduced header element sizes; hide logo on mobile — by 0wum0
- Added responsive message view — by 0wum0
- Added compact number formatting — by 0wum0

### AJAX & Cronjobs
- Added AJAX no-page-reload for build/research/fleet actions — by 0wum0
- Fixed cronjobs after file edits — by 0wum0
- Fixed statistic cronjob logging — by 0wum0
- Fixed officer timer and buy button — by 0wum0

### Misc
- Added user online count and last registered player to topbar — by 0wum0
- Fixed notification sync to DB — by 0wum0
- Fixed FAQ in `PluginAdminPage` — by 0wum0
- Redesigned login page (multiple iterations) — by 0wum0
- Fixed disclaimer page — by 0wum0
- Fixed alliance: add member, missing tech-tree link — by 0wum0
- Fixed shipyard build error — by 0wum0
- Fixed `BuildFunctions` — by 0wum0
- Fixed `BBCode` in alliance and forum — by 0wum0

---

## [Initial] – 2024

- Initial project setup based on 2Moons / SmartMoons — by 0wum0
- Big initial update: PHP 8.3 compatibility pass, PDO migration, strict types — by 0wum0
# v3.1.1

- Route root requests away from the old static demo page and back to the PHP login front controller.
- Add a visible 3.1.1 version marker and cache-busted ingame assets.
