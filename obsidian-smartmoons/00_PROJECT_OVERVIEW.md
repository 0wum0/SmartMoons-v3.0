# SmartMoons Projektüberblick

## Zielbild (Visual Production)
SmartMoons wird von einem klassischen Browsergame-Layout zu einem modernen 2.5D-Space-Strategy-Erlebnis transformiert.

## Aktueller Ist-Stand (Phase 1 Analyse)
- Legacy-2Moons-basierte PHP-Anwendung mit Front-Controllern `index.php` (LOGIN) und `game.php` (INGAME).
- Twig als aktives Template-System, inkl. moderner Layout-Dateien (`layout.modern.twig`, `layout.responsive.twig`).
- Keine dedizierte `api.php` vorhanden; AJAX aktuell über Seiten-Controller/`mode`/`ajax`-Flags verteilt.
- Kein `public/`-Webroot vorhanden, Assets liegen aktuell unter `styles/` und `scripts/`.
- Keine Phaser-3-Integration im aktuellen Codebestand.

## Leitprinzipien der Migration
1. API-first Kern einziehen, ohne bestehende Spiellogik zu brechen.
2. Phaser als primäre Rendering-Schicht schrittweise etablieren.
3. Legacy-Twig-Seiten zunächst als funktionale Fallbacks erhalten.
4. Modular in Etappen migrieren (Planet -> Gebäude/Forschung/Werft/Defense -> Galaxy -> UX/Android).
