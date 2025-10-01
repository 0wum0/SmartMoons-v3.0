<div align="center">

# 🌌 **SmartMoons – Development Rules** 🚀  
*"In der Weite des Weltraums überleben nur die Smarten."*  

![SmartMoons Logo](https://dummyimage.com/600x200/0a0b10/00ffd5&text=SmartMoons)  

</div>

---

## 🔹 Ziel
Modernisierung und Pflege von **SmartMoons** (Fork von 2Moons), mit voller **PHP 8.3/8.4 Kompatibilität**, Umstellung von **Smarty auf Twig**, einheitlichem modernen **Dark Sci-Fi Theme**, stabiler Datenbankanbindung und klar dokumentierter Versionshistorie.

---

## ⚙️ Core Guidelines

### 🖥️ PHP
- Alle PHP-Dateien auf **PHP 8.3/8.4** migrieren.  
- Nur **PDO** verwenden (kein `mysqli`, kein `mysql_*`).  
- `declare(strict_types=1);` aktivieren.  
- Keine doppelten Methoden/Klassen.  

### 🎨 Templates
- `.tpl` → `.twig` migrieren.  
- Nur gültige Twig-Syntax:  
  - Variablen: `{{ var }}`  
  - Bedingungen: `{% if %}...{% endif %}`  
  - Schleifen: `{% for %}...{% endfor %}`  
- HTML-Ausgaben prüfen:  
  - Standard: `{{ var }}`  
  - Bei gewolltem HTML: `{{ var|raw }}`  
- Templates liegen in `/styles/templates/`.  

### 📦 Assets
- Styles in `styles/css/main.css` konsolidieren.  
- Scripts in `styles/js/main.js`.  
- **Anime.js** + **GSAP** global.  
- Ladeanimation (Kurbelwelle) global.  

### 🗄️ Datenbank & Config
- Einheitliches Schema:  

  ```php
  $databaseConfig = [
    'host' => 'localhost',
    'user' => 'USERNAME',
    'password' => 'PASSWORT',
    'dbname' => 'DATENBANKNAME',
    'port' => 3306
  ];
