# SmartMoons Sci-Fi Design - Feature Übersicht

## 🎨 Visuelle Features

### 1. Header - Ressourcenanzeige
```
┌─────────────────────────────────────────────────────────┐
│  [💎] ████████░░░░  1,234,567 / 2,000,000     [ℹ️]     │
│  Metal                                                  │
│                                                         │
│  [💠] ██████░░░░░░    567,890 / 1,500,000     [ℹ️]     │
│  Crystal                                                │
│                                                         │
│  [💧] ███░░░░░░░░░    123,456 / 1,000,000     [ℹ️]     │
│  Deuterium                                              │
│                                                         │
│  [⚡] ██████████░    850 / 1,000              [ℹ️]     │
│  Energy                                                 │
│                                                         │
│  [🌌] 42,500 Dark Matter                               │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- ✨ Glühende Icons mit Drop-Shadow
- 📊 Animierte Progress Bars mit Shimmer
- 🔢 Count-Up Animation bei Änderungen
- 🎨 Farbcodierung (Grün/Gelb/Rot je nach Füllstand)
- 💡 Info-Buttons mit Produktionsraten

---

### 2. Top Navigation
```
┌─────────────────────────────────────────────────────────┐
│ [v3.0] [🏠] [🌍] [📊] [🎯] [🏆] [🔍] [✉️(5)]          │
│                                                         │
│         [◀] [Planet Alpha [1:2:3]] [▶]                │
│                                                         │
│         [🧪] [👥] [🚫] [💬] [❓] [⚙️] [🔴]            │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- 🏷️ Version Badge mit Neon-Glow
- 📨 Pulsierender Message Counter
- 🪐 Planet-Selector mit Pfeilen
- 🎯 Icon-basierte Navigation
- 📱 Responsive (Wrap auf Mobile)

---

### 3. Sidebar Navigation
```
┌──────────────────┐
│                  │
│      [👤]        │
│   ───────────    │
│   Commander      │
│   MaxPower       │
│                  │
├──────────────────┤
│ [🏙️] Buildings   │
│ [🧪] Research    │
│ [🚀] Shipyard    │
│ [🛡️] Defense     │
│ [👔] Officers    │
│ [🤝] Trader      │
│ [🚁] Fleet       │
│ [📊] Resources   │
│ [🌍] Galaxy      │
│ [👥] Alliance    │
│ [🆘] Support     │
│ [⚖️] Rules       │
│ [🎯] Simulator   │
│ [📝] Notes       │
├──────────────────┤
│ [👮] Admin       │
├──────────────────┤
│ 🕐 23:45:12      │
│ © SmartMoons     │
└──────────────────┘
```

**Features:**
- 👤 User Avatar mit Gradient
- 🎨 Icon + Text für jeden Link
- 📱 Grid-Layout (2-Spalten)
- ⏰ Animierte Serverzeit
- 📲 Burger-Menu auf Mobile

---

### 4. Planet Overview
```
┌─────────────────────────────────────────────────────────┐
│ 🌟 Online Users: 42  |  Admins: Admin1, Admin2  | 🎫  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────┬────────────────────────────────────┐
│                     │  📋 Production Status              │
│   [Planet Image]    │                                    │
│                     │  🏗️ Buildings                      │
│   Planet "Earth"    │  Metal Mine Level 15               │
│   [🌙 Moon Link]    │  ████████░░ 12:34:56              │
│                     │                                    │
│   Ø 12,742 km      │  🧪 Research                       │
│   (150 / 250)      │  Energy Technology Level 8         │
│                     │  ██████░░░░ 08:21:43              │
│   -20°C to 40°C    │                                    │
│                     │  🚀 Shipyard                       │
│   [1:2:3]          │  10x Light Fighter                 │
│                     │  ███░░░░░░░ 02:15:30              │
│   Points: 1,234    │                                    │
│                     │                                    │
└─────────────────────┴────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📰 News                                                 │
│ Welcome to the new Sci-Fi UI! ...                      │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- 🪐 Planet als Hintergrund
- ✨ Glühende Planeten-Namen
- 📊 3 Progress Bars (Buildings, Research, Ships)
- ⏱️ Live Countdown
- 🎨 Farbcodierung (Cyan, Purple, Green)

---

### 5. Footer
```
┌─────────────────────────────────────────────────────────┐
│ [🚀] SmartMoons v3.0     |  📡 Universe 1  |  [📋] [❓] │
│      © 2025 GameName     |  🔗 Open Source |            │
│                                                         │
│        Powered by SmartMoons - MIT Licensed            │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- 📦 Version-Info
- 🌐 Server-Name
- 🔗 GitHub-Link
- 📱 Responsive (Stack auf Mobile)
- ✨ Animierte Top-Line

---

## 🎭 Animationen

### 1. **Scanline** (Wandernde Linie)
```css
@keyframes scanline {
    0%   { left: -100%; }
    100% { left: 100%; }
}
```
- Verwendet auf: Header, Cards, Footer
- Dauer: 3-4 Sekunden
- Effekt: Futuristischer Scan-Effekt

### 2. **Shimmer** (Glanz)
```css
@keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
```
- Verwendet auf: Progress Bars
- Dauer: 2 Sekunden
- Effekt: Glänzender Licht-Streifen

### 3. **Pulse Glow** (Pulsieren)
```css
@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 5px cyan; }
    50%      { box-shadow: 0 0 20px cyan; }
}
```
- Verwendet auf: Message Badge, Buttons
- Dauer: 2 Sekunden
- Effekt: Pulsierendes Leuchten

### 4. **Float** (Schweben)
```css
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
}
```
- Verwendet auf: Planet-Bilder (Hover)
- Dauer: 3 Sekunden
- Effekt: Sanftes Auf/Ab

---

## 🎨 Farbsystem

### Neon-Palette:
```
Cyan:   #00f3ff ████ Primär-Akzent, Links, Progress
Blue:   #0066ff ████ Sekundär, Buttons
Purple: #a855f7 ████ Admin, Special
Green:  #10b981 ████ Success, Shipyard
Yellow: #fbbf24 ████ Warning
Red:    #ef4444 ████ Danger, Logout
```

### Hintergründe:
```
Primary:   #0a0e1a ████ Body Background
Secondary: #131824 ████ Panels
Tertiary:  #1a1f2e ████ Cards
Elevated:  #1f2533 ████ Inputs
```

### Text:
```
Primary:   #e5e7eb ████ Haupttext
Secondary: #9ca3af ████ Labels
Muted:     #6b7280 ████ Footer, Hints
```

---

## 📱 Responsive Breakpoints

```
Desktop     ┃  Tablet      ┃  Mobile      ┃  Small
> 1024px    ┃  768-1024px  ┃  480-768px   ┃  < 480px
            ┃              ┃              ┃
Sidebar     ┃  Sidebar     ┃  Burger      ┃  Burger
280px       ┃  260px       ┃  Menu        ┃  Menu
            ┃              ┃              ┃
Resources   ┃  Resources   ┃  Resources   ┃  Resources
Horizontal  ┃  2x2 Grid    ┃  Vertical    ┃  Vertical
            ┃              ┃              ┃
Content     ┃  Content     ┃  Content     ┃  Content
3 Columns   ┃  2 Columns   ┃  1 Column    ┃  1 Column
```

---

## 🎯 Interaktive Elemente

### Buttons:
```css
.sci-btn {
    /* Normal */
    background: elevated;
    border: 1px solid primary;
    
    /* Hover */
    border: cyan;
    box-shadow: glow-cyan;
    transform: translateY(-2px);
    
    /* Ripple Effect */
    ::before { radial-gradient(cyan) }
}
```

### Cards:
```css
.sci-card {
    /* Normal */
    border: 1px solid primary;
    
    /* Hover */
    border: cyan;
    box-shadow: glow-cyan;
    transform: translateY(-2px);
    
    /* Scanline */
    ::before { animated gradient }
}
```

### Progress Bars:
```css
.sci-progress__bar {
    /* Base */
    background: gradient(blue, cyan);
    box-shadow: glow-cyan;
    
    /* Animation */
    ::after { shimmer effect }
    
    /* Width */
    transition: width 350ms;
}
```

---

## 🔧 Utility Classes

### Layout:
- `.sci-grid--1/2/3/4` - Grid System
- `.sci-flex` - Flexbox
- `.sci-flex-between` - Space Between
- `.sci-flex-center` - Center All

### Spacing:
- `.sci-gap-sm/md/lg` - Gap
- `.sci-mt/mb-sm/md/lg` - Margin
- `.sci-p-sm/md/lg` - Padding

### Text:
- `.sci-text-center/left/right` - Align
- `.sci-text-primary/secondary/muted` - Colors
- `.sci-text-cyan/green/red/yellow` - Accents

### Effects:
- `.sci-glow-cyan/blue/purple/green` - Glow
- `.sci-animate-pulse` - Pulse
- `.sci-animate-float` - Float
- `.sci-animate-spin` - Spin

---

## 🎮 Spielgrafiken Integration

### Ressourcen:
```
{{ dpath }}images/metal.gif       → 💎 Metal Icon
{{ dpath }}images/crystal.gif     → 💠 Crystal Icon
{{ dpath }}images/deuterium.gif   → 💧 Deuterium Icon
{{ dpath }}images/energy.gif      → ⚡ Energy Icon
{{ dpath }}images/darkmatter.gif  → 🌌 Dark Matter Icon
```

### Planeten:
```
{{ dpath }}planeten/normaltempplanet01.jpg
{{ dpath }}planeten/eisplanet05.jpg
{{ dpath }}planeten/wuestenplanet03.jpg
{{ dpath }}planeten/mond.jpg
...
```

### Gebäude:
```
{{ dpath }}gebaeude/1.gif   → Metal Mine
{{ dpath }}gebaeude/2.gif   → Crystal Mine
{{ dpath }}gebaeude/3.gif   → Deuterium Synthesizer
...
```

**Alle Grafiken bleiben unverändert und werden visuell integriert!**

---

## ✨ Besondere Highlights

1. **Keine Altlasten**
   - ❌ Kein `&nbsp;`
   - ❌ Kein `<br>`
   - ❌ Keine `<table>` für Layout
   - ✅ Moderne Semantik

2. **Performance**
   - CSS Custom Properties (schneller als Preprocessor)
   - Hardware-beschleunigtes Transform/Opacity
   - Debounced Scroll-Events
   - Lazy Image Loading Ready

3. **Accessibility**
   - ARIA Labels
   - Keyboard Navigation (ESC, M)
   - Focus-Visible States
   - Reduced Motion Support
   - Screen Reader Friendly

4. **Browser Support**
   - Chrome 90+
   - Firefox 88+
   - Safari 14+
   - Edge (Chromium)
   - Mobile Safari/Chrome

---

## 🎨 Design Pattern

### Card-basiertes Layout:
```
.sci-card
├── .sci-card__header
│   ├── .sci-card__title
│   └── [Action Buttons]
└── .sci-card__body
    └── [Content]
```

### Grid System:
```
.sci-grid.sci-grid--3
├── .sci-card [Item 1]
├── .sci-card [Item 2]
└── .sci-card [Item 3]
```

### Button Pattern:
```
.sci-btn.sci-btn--primary
├── <i> [Icon]
└── <span> [Text]
```

---

**Das Design ist konsistent, modern und entspricht den Referenzbildern! 🚀**

---

*SmartMoons Sci-Fi Neon Dark Design v3.0*
