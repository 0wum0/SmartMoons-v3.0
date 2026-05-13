# Architektur (Ist-Zustand)

## Entry Points
- `index.php`: Login-Router (`MODE=LOGIN`), dynamische Page-Klasse unter `includes/pages/login/`.
- `game.php`: Ingame-Router (`MODE=INGAME`), dynamische Page-Klasse unter `includes/pages/game/`.
- `admin.php`: Admin-Bereich (separate Routing-/Page-Struktur).

## Bootstrap
- `includes/common.php` initialisiert Composer-Autoload, Fehlerbehandlung, DB/Config/Session/User/Planet-Kontext.
- Session- und User-Validierung erfolgt zentral in `common.php` für Ingame/Admin/Cron.

## Rendering
- Twig-Engine wird in `includes/classes/class.template.php` konfiguriert (Loader, Filter, Funktionen, Cache).
- Game/Login Abstract Pages rendern `.twig` direkt (mit `.tpl`-Kompatibilitätsersetzung).

## Frontend
- Aktuell überwiegend klassisches JS/jQuery (`scripts/game/*`, `scripts/base/*`).
- CSS-Monolith vorhanden (`styles/theme/smartmoons.css`) plus resource-basierte Styles.
- Template-Basis unter `styles/templates/{game,login,adm}`.

## Zielarchitektur (Soll)
- Neuer API-Layer (`/api.php?action=...`) als primärer Datenzugriff.
- Neuer Phaser-Client unter künftigem `public/js/game/`.
- Asset-Pipeline unter `public/assets/game/` (Sprites, UI, Partikel, Hintergründe, Audio).
