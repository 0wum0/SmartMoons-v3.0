# Migration Log

## 2026-05-13 — Phase 1 gestartet
- Korrektes Repository analysiert (Routing, Bootstrap, Templates, Assets, JS-Struktur).
- Festgestellt: Twig produktiv aktiv, kein Phaser, kein zentrales api.php.
- Obsidian-Projektgedächtnis initial angelegt (00-08 Pflichtdateien).
- Architektur-, API- und Frontend-Migrationspfad dokumentiert.
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs

## 2026-05-13 — Phase 2 (erste Umsetzung)
- Neue Produktionsstruktur angelegt: `public/assets/game/*` und `public/js/game/*`.
- Eigene PNG-Basisassets erzeugt (Starfield, Planet, Orbit-Ring, Drone, Glow-Particle).
- Asset-Manifest (`public/assets/game/manifest.json`) eingeführt.
- Phaser-Preload-System implementiert (BootScene, PreloadScene, LoginBackgroundScene).
- Login-Seite um Phaser-Stage erweitert und mit neuem Sci-Fi-Header-Overlay versehen.

## 2026-05-13 — Phase 2 (PlanetScene MVP + API Read Layer)
- `api.php` als zentralen API-Router initial angelegt.
- Read-Endpoints umgesetzt: `game_state`, `planet_state`, `resources`, `buildings`.
- `PlanetScene` MVP in Phaser umgesetzt (Orbit-Layer, Slots, Hover/Klick, Kamera-Zoom, Drag-Pan, Drone-Orbit).
- `page.overview.modern.twig` um Phaser-Planet-Canvas erweitert.
- Neue PlanetScene-Styles in `styles/theme/smartmoons.css` ergänzt.

## 2026-05-13 — Phase 2 (API-Härtung)
- `includes/api/ApiResponse.php` eingeführt (einheitliche JSON-Antworten + request_id).
- `includes/api/ApiAuth.php` eingeführt (Session/Planet-Kontext-Middleware).
- `api.php` auf Helper/Middleware refaktoriert und Fehlercodes vereinheitlicht.
- `buildings`-Response auf strukturierte DTO-Liste (`id`, `column`, `level`) umgestellt.


## 2026-05-13 — Phase 2 (API Read Coverage erweitert)
- Weitere Read-Endpoints ergänzt: `research`, `shipyard`, `defense`, `galaxy`, `fleets`, `messages`, `ranking`.
- Endpoint-Responses auf strukturierte Listen/DTOs ausgerichtet (Client-freundlich für Phaser/Android).

## 2026-05-13 — Phase 2 (API UX + Guardrails)
- `public/js/game/api.js` zu generischem API-Client mit Fehlerbehandlung erweitert.
- `PlanetScene` um Live-Ressourcen-HUD (Polling gegen `resources`) ergänzt.
- `api.php` um HTTP-Method-Guards (`GET` only) und paginierte List-Reads (`limit`/`offset`) erweitert.

## 2026-05-13 — Phase 3 Vorbereitung (Write-API Preview)
- Write-Actions angelegt: `build_building`, `start_research`, `build_ships`, `build_defense`, `send_fleet`.
- `build_building` und `start_research` liefern jetzt serverseitige Validierung + Kosten/Zeit-Vorschau (HTTP 202, mode=preview).
- Post-Actions sind method-gesichert (`POST`) und validieren Pflichtparameter.

## 2026-05-13 — Phase 4 Start (GalaxyScene MVP)
- Neue `GalaxyScene` (Phaser) mit Zoom, Sternknoten und API-gebundener Positionsdarstellung erstellt.
- `page.galaxy.default.twig` um Phaser-Galaxy-Canvas erweitert.
- `PreloadScene` erweitert, damit sie auch `GalaxyScene` als Ziel-Scene starten kann.

## 2026-05-13 — Phase 4 (Galaxy Interaktionen)
- GalaxyScene um Sternverbindungen/Fluglinien und Fleet-Marker erweitert.
- In-Scene Kontextpanel (Spionage/Angriff/Transport) mit Auswahlziel eingebaut.
- GalaxyScene lädt periodisch Fleet-Daten (`fleets`) für animierte Marker.
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
