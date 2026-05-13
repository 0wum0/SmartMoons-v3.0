# API Contracts

## Ist-Zustand
- Zentraler `/api.php` Endpoint ist implementiert (v1-Action-Routing).
- JSON-Antworten laufen fuer neue Spiel-Endpoints ueber standardisierte `ApiResponse`-Envelope.
- Session- und Planet-Kontext werden zentral ueber `ApiAuth` geprueft.

## Basisstruktur
```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {"timestamp": 0, "request_id": ""}
}
```

## Read Endpoints
- GET `api.php?action=game_state`
- GET `api.php?action=planet_state`
- GET `api.php?action=resources`
- GET `api.php?action=buildings`
- GET `api.php?action=research`
- GET `api.php?action=shipyard`
- GET `api.php?action=defense`
- GET `api.php?action=galaxy`
- GET `api.php?action=fleets`
- GET `api.php?action=messages`
- GET `api.php?action=ranking`

## Write Endpoints
- POST `api.php?action=build_building`
- POST `api.php?action=start_research`
- POST `api.php?action=build_ships`
- POST `api.php?action=build_defense`
- POST `api.php?action=send_fleet`

## Security-Regeln
- Session/Auth serverseitig pruefen.
- Rechte-/Feature-Checks zentralisieren.
- Eingaben strikt validieren (Typ, Range, Ownership).
- Niemals spielrelevante Berechnungen clientseitig autoritativ akzeptieren.
