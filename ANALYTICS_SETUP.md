# Analytics & Marketing Tools Setup

## 📊 Übersicht

Diese Website unterstützt die Integration von Marketing- und Analyse-Tools, die DSGVO-konform nur nach Einwilligung des Nutzers geladen werden.

## 🔧 Konfiguration

### 1. Google Analytics 4 (GA4) einrichten

1. **Google Analytics Account erstellen:**
   - Gehe zu [Google Analytics](https://analytics.google.com/)
   - Erstelle ein neues Property für deine Website
   - Notiere dir deine **Measurement ID** (Format: `G-XXXXXXXXXX`)

2. **ID in analytics.js eintragen:**
   ```javascript
   const ANALYTICS_CONFIG = {
       googleAnalyticsId: 'G-XXXXXXXXXX', // Hier deine ID eintragen
   };
   ```

3. **Features:**
   - Automatisches Page View Tracking
   - IP-Anonymisierung (DSGVO-konform)
   - Event Tracking für App Store Klicks

### 2. Facebook Pixel einrichten (optional)

1. **Facebook Pixel erstellen:**
   - Gehe zu [Facebook Business Manager](https://business.facebook.com/)
   - Erstelle einen neuen Pixel
   - Notiere dir deine **Pixel ID** (Format: `123456789012345`)

2. **ID in analytics.js eintragen:**
   ```javascript
   const ANALYTICS_CONFIG = {
       facebookPixelId: '123456789012345', // Hier deine ID eintragen
   };
   ```

3. **Oder deaktivieren:**
   ```javascript
   facebookPixelId: null, // Facebook Pixel deaktiviert
   ```

### 3. Google Tag Manager einrichten (optional)

1. **GTM Container erstellen:**
   - Gehe zu [Google Tag Manager](https://tagmanager.google.com/)
   - Erstelle einen neuen Container
   - Notiere dir deine **Container ID** (Format: `GTM-XXXXXXX`)

2. **ID in analytics.js eintragen:**
   ```javascript
   const ANALYTICS_CONFIG = {
       googleTagManagerId: 'GTM-XXXXXXX', // Hier deine ID eintragen
   };
   ```

## 🎯 Event Tracking

### Automatisches Tracking

- **Page Views:** Werden automatisch getrackt
- **App Store Klicks:** Werden automatisch getrackt (iOS/Android)

### Manuelles Event Tracking

Du kannst eigene Events tracken:

```javascript
// Beispiel: Button Click tracken
trackEvent('button_click', {
    button_name: 'download_ios',
    page: 'home'
});

// Beispiel: Formular Submission
trackEvent('form_submit', {
    form_name: 'contact_form'
});
```

## 🔒 DSGVO-Compliance

✅ **Automatische Compliance-Features:**
- Tools werden **nur nach Einwilligung** geladen
- IP-Anonymisierung für Google Analytics
- Separate Zustimmung für Analytics und Marketing
- Nutzer kann jederzeit widersprechen

✅ **Cookie-Banner Integration:**
- "Erlauben" → Lädt alle Tools
- "Ablehnen" → Lädt keine Tools
- "Weitere Details" → Individuelle Auswahl möglich

## 📝 Checkliste

- [ ] Google Analytics 4 Account erstellt
- [ ] GA4 Measurement ID in `analytics.js` eingetragen
- [ ] (Optional) Facebook Pixel ID eingetragen
- [ ] (Optional) Google Tag Manager ID eingetragen
- [ ] Cookie-Banner getestet
- [ ] Tracking in Google Analytics verifiziert

## 🧪 Testing

1. **Lokales Testing:**
   ```bash
   # Server starten
   python3 -m http.server 8000
   ```

2. **Cookie-Banner testen:**
   - LocalStorage löschen (DevTools → Application → Local Storage)
   - Seite neu laden
   - Cookie-Banner sollte erscheinen
   - "Erlauben" klicken
   - In DevTools → Network prüfen, ob Analytics-Skripte geladen werden

3. **Tracking verifizieren:**
   - Google Analytics → Realtime → Events prüfen
   - Facebook Events Manager (falls Pixel aktiviert)

## ⚠️ Wichtige Hinweise

1. **IDs ersetzen:** Vergiss nicht, die Platzhalter-IDs durch deine echten IDs zu ersetzen!

2. **Datenschutz:** Die Tools sind DSGVO-konform implementiert, aber du musst in deiner Datenschutzerklärung erwähnen, welche Tools du verwendest.

3. **Cookie-Richtlinie:** Stelle sicher, dass deine Cookie-Richtlinie die verwendeten Tools erwähnt.

4. **Performance:** Analytics-Skripte werden erst nach Einwilligung geladen, um die Ladezeit nicht zu beeinträchtigen.

## 🆘 Support

Bei Fragen zur Einrichtung:
- Google Analytics: [GA4 Dokumentation](https://support.google.com/analytics/answer/9304153)
- Facebook Pixel: [Facebook Pixel Guide](https://www.facebook.com/business/help/952192354843755)
- Google Tag Manager: [GTM Dokumentation](https://support.google.com/tagmanager)

