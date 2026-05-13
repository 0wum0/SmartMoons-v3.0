# Database Notes

## Ist-Zustand
- MySQL via `includes/classes/Database.class.php`.
- DB-Version-Prüfung in `includes/common.php` gegen `DB_VERSION_REQUIRED`.
- Legacy-Kompatibilität (`Database_BC`) für alten Admin-Pfad vorhanden.

## Migrationsprinzip
- Keine großen Schema-Brüche in einer Etappe.
- Für API-Layer: zuerst Read-Endpunkte auf bestehende Tabellen.
- Danach Write-Endpunkte mit transaktionaler Absicherung.

## ToDo
- Tabellenfelder für Gebäude/Forschung/Werft/Defense in API DTOs mappen.
- Einheitliches Fehler- und Konfliktmodell definieren (z.B. Bauqueue voll, Ressourcen fehlen).
