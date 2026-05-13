# Android/API Vorbereitung

## Ziel
Web-App so strukturieren, dass Flutter/WebView oder nativer API-Client später ohne Logik-Duplikation anschließbar ist.

## Anforderungen
- Stabile, versionierbare API-Verträge.
- Fehlercodes maschinenlesbar (`error.code`, `error.message`).
- Zeit-/Queue-Informationen in UTC + server timestamp.
- Konsistente IDs und Enum-Werte für Client-Caching.

## Nächste Schritte
1. API v1 Namespace-Konvention festlegen (`action` oder `/api/v1/*`).
2. Auth-Strategie für spätere native Clients definieren.
3. Polling/WebSocket-Strategie für Flotten- und Bauzeiten planen.
