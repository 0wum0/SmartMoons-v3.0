# 🚀 SmartMoons v4.0 - Developer Quick Start Guide

## TL;DR - Schnelleinstieg

SmartMoons hat jetzt ein **futuristisches Sci-Fi-Design**. Hier ist alles, was du wissen musst:

---

## 📦 Neue Dateien

### CSS (automatisch geladen)
```
/styles/resource/css/ingame/
├── main.css              ← Hauptstyles (Header, Nav, Layout)
├── scifi-framework.css   ← Komponenten (Cards, Buttons, etc.)
├── pages.css             ← Seiten-spezifische Styles
└── all.css               ← Legacy (wird noch genutzt)
```

### JavaScript (automatisch geladen)
```
/scripts/game/
└── sci-fi-ui.js          ← Animationen, Timer, Notifications
```

---

## 🎨 Komponenten - Copy & Paste

### Card (Standard-Container)
```html
<div class="sci-card">
  <div class="sci-card__header">
    <h3 class="sci-card__title">
      <i class="fas fa-rocket"></i> Titel
    </h3>
  </div>
  <div class="sci-card__body">
    Content hier
  </div>
</div>
```

### Card Elevated (mit stärkerem Schatten)
```html
<div class="sci-card sci-card--elevated">
  ...
</div>
```

### Buttons
```html
<!-- Primary (Cyan) -->
<button class="sci-btn sci-btn--primary">
  <i class="fas fa-check"></i> Bauen
</button>

<!-- Success (Grün) -->
<button class="sci-btn sci-btn--success">
  <i class="fas fa-check"></i> Bestätigen
</button>

<!-- Danger (Rot) -->
<button class="sci-btn sci-btn--danger">
  <i class="fas fa-times"></i> Abbrechen
</button>

<!-- Ghost (Transparent mit Border) -->
<button class="sci-btn sci-btn--ghost">
  <i class="fas fa-info"></i> Details
</button>
```

### Badges
```html
<span class="sci-badge sci-badge--cyan">Level 5</span>
<span class="sci-badge sci-badge--green">Verfügbar</span>
<span class="sci-badge sci-badge--red">Nicht möglich</span>
<span class="sci-badge sci-badge--yellow">Warnung</span>
```

### Progress Bar
```html
<div class="sci-progress">
  <div class="sci-progress__bar" style="width: 75%;"></div>
  <div class="sci-progress__text">75%</div>
</div>
```

Mit Timer (auto-update):
```html
<div class="sci-progress">
  <div class="sci-progress__bar timer" data-time="3600"></div>
  <div class="sci-progress__text timer" data-time="3600">01:00:00</div>
</div>
```

### Grid System
```html
<!-- 2 Spalten -->
<div class="sci-grid sci-grid--2">
  <div>...</div>
  <div>...</div>
</div>

<!-- 3 Spalten -->
<div class="sci-grid sci-grid--3">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>

<!-- 4 Spalten -->
<div class="sci-grid sci-grid--4">
  <div>...</div>
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

**Responsive:** Auto-collapse auf Mobile (4→2→1 Spalten)

---

## 🎨 Farben - CSS-Variablen

### Verwenden in Templates
```css
/* In style="" Attributen */
<div style="color: var(--color-accent-cyan);">Text</div>
<div style="background: var(--color-bg-secondary);">Content</div>
```

### Verfügbare Farben
```css
/* Hintergrund */
--color-bg-primary: #0a0e1a      /* Schwarz */
--color-bg-secondary: #131824    /* Anthrazit */
--color-bg-elevated: #1f2533     /* Elevated */

/* Akzente */
--color-accent-cyan: #00f3ff     /* Primär */
--color-accent-blue: #0066ff     /* Blau */
--color-accent-purple: #a855f7   /* Lila */
--color-accent-green: #10b981    /* Grün */
--color-accent-yellow: #fbbf24   /* Gelb */
--color-accent-red: #ef4444      /* Rot */

/* Text */
--color-text-primary: #e5e7eb    /* Hell */
--color-text-secondary: #9ca3af  /* Mittel */
--color-text-muted: #6b7280      /* Gedämpft */
```

### Text-Farben (Utility-Klassen)
```html
<span class="sci-text-primary">Primärer Text</span>
<span class="sci-text-secondary">Sekundärer Text</span>
<span class="sci-text-muted">Gedämpfter Text</span>
<span class="sci-text-cyan">Cyan Text</span>
<span class="sci-text-green">Grüner Text</span>
<span class="sci-text-red">Roter Text</span>
<span class="sci-text-yellow">Gelber Text</span>
```

---

## 🔧 Utility-Klassen

### Layout
```html
<div class="sci-flex">Flex-Container</div>
<div class="sci-flex-center">Zentriert</div>
<div class="sci-flex-between">Space-between</div>
<div class="sci-flex-col">Flex Column</div>
```

### Spacing
```html
<div class="sci-mt-md">Margin Top</div>
<div class="sci-mb-lg">Margin Bottom</div>
<div class="sci-p-md">Padding</div>
<div class="sci-gap-sm">Gap (für Flex/Grid)</div>
```

### Text Alignment
```html
<div class="sci-text-center">Zentriert</div>
<div class="sci-text-left">Links</div>
<div class="sci-text-right">Rechts</div>
```

---

## 💻 JavaScript API

### Notifications anzeigen
```javascript
// Success
showNotification('Erfolgreich gebaut!', 'success', 3000);

// Error
showNotification('Nicht genug Ressourcen', 'error', 3000);

// Warning
showNotification('Achtung: Gebäude in Bau', 'warning', 3000);

// Info
showNotification('Forschung abgeschlossen', 'info', 3000);
```

### Loading Spinner
```javascript
// Anzeigen
SciFiUI.showLoading('Lade Daten...');

// Verstecken
SciFiUI.hideLoading();
```

### Resource Bars updaten
```javascript
// Manueller Update (falls nötig)
SciFiUI.updateResourceBars();
```

### Progress Bars updaten
```javascript
// Manueller Update (falls nötig)
SciFiUI.updateProgressBars();
```

---

## 🎯 Seiten-Template

```twig
{% extends "layout.full.twig" %}

{% block title %}{{ LNG.page_title }}{% endblock %}
{% block content %}

<div class="content_page">
  <!-- Page Header -->
  <div class="sci-card__header">
    <h2 class="sci-card__title">
      <i class="fas fa-star"></i> {{ LNG.page_title }}
    </h2>
  </div>

  <!-- Main Content -->
  <div class="sci-card sci-card--elevated">
    <div class="sci-card__header">
      <h3 class="sci-card__title">Section Titel</h3>
    </div>
    <div class="sci-card__body">
      <div class="sci-grid sci-grid--2">
        <!-- Grid Items -->
        <div>Content 1</div>
        <div>Content 2</div>
      </div>
    </div>
  </div>
</div>

{% endblock %}
```

---

## 📱 Responsive Design

### Breakpoints (automatisch)
```css
/* Desktop: > 1024px */
.sci-grid--4 { 4 Spalten }

/* Tablet: 768px - 1024px */
.sci-grid--4 { 2 Spalten }

/* Mobile: < 768px */
.sci-grid--4 { 1 Spalte }
```

### Mobile-spezifisch
```html
<!-- Burger-Menü wird automatisch angezeigt bei < 768px -->
<!-- Navigation wird automatisch zum Slide-in-Menü -->
```

---

## 🎨 Farb-Coding nach Funktion

### Buildings (Gebäude)
```css
Primärfarbe: Cyan (#00f3ff)
Border: var(--color-accent-cyan)
Glow: var(--glow-cyan)
```

### Research (Forschung)
```css
Primärfarbe: Purple (#a855f7)
Border: var(--color-accent-purple)
Glow: var(--glow-purple)
```

### Shipyard (Schiffswerft)
```css
Primärfarbe: Green (#10b981)
Border: var(--color-accent-green)
Glow: var(--glow-green)
```

### Defense (Verteidigung)
```css
Primärfarbe: Orange (#f97316)
Border: var(--color-accent-orange)
```

### Danger/Cancel (Gefahr/Abbrechen)
```css
Primärfarbe: Red (#ef4444)
Border: var(--color-accent-red)
```

---

## 🔍 Häufige Anwendungsfälle

### 1. Resource-Display
```html
<div class="sci-flex sci-gap-sm" style="align-items: center;">
  <img src="{{ dpath }}images/metal.gif" width="24" height="24" 
       style="border-radius: var(--radius-sm);">
  <span class="sci-text-green resource-value">
    {{ amount|number_format }}
  </span>
</div>
```

### 2. Build-Button
```html
<form action="game.php?page=buildings" method="post">
  <input type="hidden" name="cmd" value="insert">
  <input type="hidden" name="building" value="{{ ID }}">
  <button type="submit" class="sci-btn sci-btn--primary" style="width: 100%;">
    <i class="fas fa-hammer"></i> {{ LNG.bd_build }}
  </button>
</form>
```

### 3. Timer-Display
```html
<span class="sci-text-green timer" data-time="{{ endtime }}">
  {{ display_time }}
</span>
```

### 4. Status-Badge
```html
{% if available > 0 %}
  <span class="sci-badge sci-badge--green">
    {{ LNG.bd_available }}: {{ available|number_format }}
  </span>
{% else %}
  <span class="sci-badge sci-badge--red">
    {{ LNG.bd_not_available }}
  </span>
{% endif %}
```

---

## 🚨 Häufige Fehler vermeiden

### ❌ FALSCH
```html
<!-- Alte 2Moons-Klassen -->
<table class="table519">...</table>

<!-- Inline-Styles ohne Variablen -->
<div style="background: #131824;">...</div>

<!-- Veraltete HTML-Entities -->
<div>Geb&auml;ude</div>
```

### ✅ RICHTIG
```html
<!-- Neue Sci-Fi-Komponenten -->
<div class="sci-card">...</div>

<!-- CSS-Variablen nutzen -->
<div style="background: var(--color-bg-secondary);">...</div>

<!-- Language-System nutzen -->
<div>{{ LNG.buildings }}</div>
```

---

## 📚 Weitere Dokumentation

- **Vollständiger Redesign-Report:** `/workspace/REDESIGN_COMPLETE_v4.0.md`
- **Final Summary:** `/workspace/SMARTMOONS_REDESIGN_FINAL.md`
- **CSS-Dateien:** `/workspace/styles/resource/css/ingame/`
- **JavaScript:** `/workspace/scripts/game/sci-fi-ui.js`
- **Templates:** `/workspace/styles/templates/game/`

---

## 🎓 Beispiel-Seiten zum Lernen

Schaue dir diese Seiten an für Best Practices:

1. **Overview** - `/styles/templates/game/page.overview.default.twig`
2. **Buildings** - `/styles/templates/game/page.buildings.default.twig`
3. **Research** - `/styles/templates/game/page.research.default.twig`
4. **Shipyard** - `/styles/templates/game/page.shipyard.default.twig`
5. **Messages** - `/styles/templates/game/page.messages.default.twig`
6. **Alliance** - `/styles/templates/game/page.alliance.info.twig`

---

## ✅ Cheat Sheet - Kopiervorlage

```html
<!-- Card mit Header -->
<div class="sci-card sci-card--elevated">
  <div class="sci-card__header">
    <h3 class="sci-card__title">
      <i class="fas fa-star"></i> Titel
    </h3>
  </div>
  <div class="sci-card__body">
    <!-- 2-Spalten-Grid -->
    <div class="sci-grid sci-grid--2">
      <div>
        <!-- Resource-Display -->
        <div class="sci-flex sci-gap-sm" style="align-items: center;">
          <img src="icon.gif" width="24">
          <span class="sci-text-green resource-value">1.000</span>
        </div>
      </div>
      <div>
        <!-- Progress Bar -->
        <div class="sci-progress">
          <div class="sci-progress__bar" style="width: 50%;"></div>
          <div class="sci-progress__text">50%</div>
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="sci-flex sci-gap-sm sci-mt-md">
      <button class="sci-btn sci-btn--primary">
        <i class="fas fa-check"></i> Bestätigen
      </button>
      <button class="sci-btn sci-btn--danger">
        <i class="fas fa-times"></i> Abbrechen
      </button>
    </div>
  </div>
</div>
```

---

**Happy Coding! 🚀**

Bei Fragen: Schaue in die vollständige Dokumentation oder orientiere dich an bestehenden Seiten.
