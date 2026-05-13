# Phaser Frontend Plan

## Analyse-Ergebnis
- Im aktuellen Repository existiert noch keine Phaser-Bibliothek und kein Scene-System.

## Ziel-Scenes
1. BootScene
2. PreloadScene
3. LoginBackgroundScene
4. PlanetScene
5. BuildingScene
6. ResearchScene
7. ShipyardScene
8. DefenseScene
9. GalaxyScene
10. FleetScene
11. MessageScene
12. RankingScene

## Einführungsstrategie
- Schritt 1: Basis-Ordnerstruktur anlegen (`public/js/game`, `public/assets/game`).
- Schritt 2: `BootScene` + `PreloadScene` + Login-Hintergrund in bestehende Login-Seite einbetten.
- Schritt 3: PlanetScene als erster spielbarer Hub mit Orbit-Layern, Parallax, HUD-Overlay.
- Schritt 4: Weitere Game-Systeme als einzelne Scene-Module anbinden.

## Tech-Standards
- Asset-Manifest (JSON) + versionsbasierter Cache-Buster.
- Kamera-Zoom/Pan als Standardsteuerung.
- Depth-Sorting und Partikel als Basiskomponenten.
