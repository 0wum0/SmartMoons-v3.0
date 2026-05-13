# Open Tasks

## Phase 2 Vorbereitung
- [x] `public/assets/game/` Struktur anlegen
- [x] `public/js/game/` Struktur anlegen
- [x] Asset-Manifest definieren (`manifest.json`)
- [x] Erste echte PNG/Sprite-Asset-Serie erstellen (Planet, Orbit, Sterne, Nebel, UI)
- [x] Phaser Grundintegration (Boot/Preload/LoginBackground)
- [x] Login Twig um Phaser Canvas Layer erweitern
- [x] PlanetScene MVP mit Kamera + Parallax + Interaktion

## API Vorbereitung
- [x] `api.php` Router anlegen
- [x] Standard-JSON Response-Helper
- [x] Session/Auth Middleware fuer API
- [x] Read-Endpoints game_state/planet_state/resources/buildings
- [x] Weitere Read-Endpoints research/shipyard/defense/galaxy/fleets/messages/ranking

## API Write Vorbereitung
- [~] `build_building` Preview/Validation aktiv, Queue-Execution offen
- [~] `start_research` Preview/Validation aktiv, Queue-Execution offen
- [x] `build_ships` serverseitig ausfuehren
- [x] `build_defense` serverseitig ausfuehren
- [ ] `send_fleet` serverseitig ausfuehren

## Naechster Fokus
- Fleet-Missionen als gesonderten API-Schritt behandeln.
