# Google Analytics 4 (GA4) Setup - Schritt für Schritt

## 📋 Übersicht

Diese Anleitung zeigt dir, wie du Google Analytics 4 für deine MyQuitly Website einrichtest.

---

## 🚀 Schritt 1: Google Analytics Account erstellen

1. **Gehe zu Google Analytics:**
   - Öffne: https://analytics.google.com/
   - Melde dich mit deinem Google-Account an (oder erstelle einen neuen)

2. **Account erstellen:**
   - Klicke auf "Messung starten" oder "Start measuring"
   - Gib einen **Account-Namen** ein (z.B. "Stargate Innovationhub" oder "MyQuitly")
   - Wähle die gewünschten Kontoeinstellungen
   - Klicke auf "Weiter"

---

## 🏢 Schritt 2: Property erstellen

1. **Property-Name eingeben:**
   - Name: **"MyQuitly Website"** (oder wie du möchtest)
   - Zeitzone: **Deutschland (GMT+1)** oder deine Zeitzone
   - Währung: **EUR** (Euro)

2. **Weiter klicken**

3. **Unternehmensinformationen:**
   - Branche: **Gesundheit & Fitness** oder **Technologie**
   - Unternehmensgröße: Wähle passend (z.B. "Klein")
   - Klicke auf "Erstellen"

4. **Datenschutzbestimmungen akzeptieren:**
   - Lies die Bedingungen
   - Akzeptiere die Datenschutzbestimmungen
   - Klicke auf "Ich akzeptiere"

---

## 🌐 Schritt 3: Data Stream für Web einrichten

1. **Web-Stream hinzufügen:**
   - Du wirst automatisch zum "Data Streams" Bildschirm weitergeleitet
   - Klicke auf **"Web"** (oder "Add stream" → "Web")

2. **Website-Informationen eingeben:**
   - **Website-URL:** `https://myquitly.stargate-innovationhub.com`
   - **Stream-Name:** "MyQuitly Website" (oder wie du möchtest)
   - Klicke auf **"Stream erstellen"**

3. **Measurement ID notieren:**
   - Du siehst jetzt deine **Measurement ID** (Format: `G-XXXXXXXXXX`)
   - **⚠️ WICHTIG: Kopiere diese ID!** Du brauchst sie gleich.

---

## 💻 Schritt 4: Measurement ID in die Website eintragen

1. **Öffne die Datei:**
   - `analytics.js` im Hauptverzeichnis deiner Website

2. **Finde diese Zeile (ca. Zeile 6):**
   ```javascript
   googleAnalyticsId: 'G-XXXXXXXXXX', // ⚠️ HIER DEINE GOOGLE ANALYTICS ID EINTRAGEN
   ```

3. **Ersetze `G-XXXXXXXXXX` mit deiner echten ID:**
   ```javascript
   googleAnalyticsId: 'G-ABC123XYZ', // Beispiel - deine ID hier eintragen
   ```

4. **Datei speichern**

---

## ✅ Schritt 5: Testen

1. **Lokalen Server starten:**
   ```bash
   cd "/Users/florianaboutara/Downloads/My Quitly Website"
   python3 -m http.server 8000
   ```

2. **Website öffnen:**
   - Gehe zu: `http://localhost:8000/de/index.html`

3. **Cookie-Banner testen:**
   - Lösche LocalStorage (DevTools → Application → Local Storage → löschen)
   - Seite neu laden
   - Cookie-Banner sollte erscheinen
   - Klicke auf **"Erlauben"**

4. **In Google Analytics prüfen:**
   - Gehe zu: https://analytics.google.com/
   - Wähle deine Property
   - Gehe zu **"Berichte"** → **"Echtzeit"**
   - Du solltest dich selbst als aktiven Nutzer sehen! 🎉

---

## 🔍 Schritt 6: Wichtige Einstellungen in Google Analytics

### IP-Anonymisierung aktivieren (bereits im Code)

✅ **Bereits implementiert!** Die IP-Anonymisierung ist automatisch aktiviert in `analytics.js`.

### Datenschutzeinstellungen

1. **Gehe zu:** Admin → Data Settings → Data Collection
2. **Aktiviere:**
   - ✅ Google Signals (optional, für erweiterte Demografie)
   - ✅ Erweiterte Messung für Web

### Datenschutz-Hinweis

Die IP-Anonymisierung ist bereits im Code aktiviert. Du musst in deiner **Datenschutzerklärung** erwähnen:
- Dass du Google Analytics verwendest
- Dass IP-Adressen anonymisiert werden
- Link zu Google's Datenschutzerklärung: https://policies.google.com/privacy

---

## 📊 Was wird getrackt?

✅ **Automatisch:**
- Seitenaufrufe (Page Views)
- App Store Button Klicks (iOS/Android)
- Sprache (de/en)
- Gerätetyp, Browser, etc.

✅ **DSGVO-konform:**
- Nur nach Einwilligung
- IP-Anonymisierung aktiv
- Nutzer kann jederzeit widersprechen

---

## 🐛 Troubleshooting

### Problem: Keine Daten in Google Analytics

**Lösung:**
1. Prüfe, ob die Measurement ID korrekt eingetragen ist
2. Prüfe Browser-Konsole (F12) auf Fehler
3. Warte 24-48 Stunden (manchmal dauert es)
4. Prüfe "Echtzeit"-Berichte (dort erscheinen Daten sofort)

### Problem: Analytics lädt nicht

**Lösung:**
1. Prüfe, ob Cookie-Banner "Erlauben" geklickt wurde
2. Prüfe LocalStorage: `localStorage.getItem('cookieConsent')` sollte "accepted" sein
3. Prüfe Browser-Konsole auf JavaScript-Fehler

### Problem: "G-XXXXXXXXXX" wird noch angezeigt

**Lösung:**
- Du musst die Platzhalter-ID in `analytics.js` durch deine echte ID ersetzen!

---

## 📝 Checkliste

- [ ] Google Analytics Account erstellt
- [ ] Property erstellt
- [ ] Web Data Stream erstellt
- [ ] Measurement ID notiert
- [ ] Measurement ID in `analytics.js` eingetragen
- [ ] Cookie-Banner getestet
- [ ] Daten in Google Analytics verifiziert (Echtzeit-Bericht)

---

## 🎯 Nächste Schritte (optional)

Nach der Grund-Einrichtung kannst du:

1. **Ziele (Goals) einrichten:**
   - App Store Downloads tracken
   - Newsletter-Anmeldungen tracken

2. **Berichte anpassen:**
   - Eigene Dashboards erstellen
   - Wichtige Metriken überwachen

3. **E-Mail-Berichte:**
   - Wöchentliche/Monatliche Zusammenfassungen erhalten

---

## 📚 Weitere Ressourcen

- [Google Analytics Hilfe](https://support.google.com/analytics)
- [GA4 Dokumentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [DSGVO & Google Analytics](https://support.google.com/analytics/answer/9019185)

---

**Fertig! 🎉** Deine Website trackt jetzt Besucher DSGVO-konform mit Google Analytics 4.

