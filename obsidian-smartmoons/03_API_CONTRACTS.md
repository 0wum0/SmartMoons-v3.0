# API Contracts (Planung)

## Ist-Zustand
- Kein zentraler `/api.php` Endpoint.
- JSON-Antworten werden aktuell punktuell in einzelnen Page-Controllern ausgegeben.

## Geplante Basisstruktur
```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {"timestamp": 0, "request_id": ""}
}
```

## Priorisierte Endpoints
- GET `api.php?action=game_state`
- GET `api.php?action=planet_state`
- GET `api.php?action=resources`
- GET `api.php?action=buildings`
- POST `api.php?action=build_building`
- GET `api.php?action=research`
- POST `api.php?action=start_research`
- GET `api.php?action=shipyard`
- POST `api.php?action=build_ships`
- GET `api.php?action=defense`
- POST `api.php?action=build_defense`
- GET `api.php?action=galaxy`
- GET `api.php?action=fleets`
- POST `api.php?action=send_fleet`
- GET `api.php?action=messages`
- GET `api.php?action=ranking`

## Security-Regeln
- Session/Auth serverseitig prüfen.
- Rechte-/Feature-Checks zentralisieren.
- Eingaben strikt validieren (Typ, Range, Ownership).
- Niemals spielrelevante Berechnungen clientseitig autoritativ akzeptieren.
