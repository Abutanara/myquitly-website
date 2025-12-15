# Google Analytics Debugging Guide

## 🔍 Schritt-für-Schritt Debugging

### 1. Browser-Konsole öffnen
- Drücke **F12** oder **Cmd+Option+I** (Mac)
- Gehe zum Tab **"Console"**

### 2. LocalStorage löschen
```javascript
// In der Konsole eingeben:
localStorage.clear();
location.reload();
```

### 3. Cookie-Banner akzeptieren
- Klicke auf **"Erlauben"** im Cookie-Banner

### 4. Konsole prüfen

**Du solltest folgende Logs sehen:**

```
📦 Analytics.js loaded
📦 Functions available: {initAnalytics: true, updateAnalyticsConsent: true, ...}
📦 Document already loaded - checking for existing consent
🔍 initAnalytics called
🔍 Cookie Consent: null
🔍 Analytics Cookies: null
🔍 Has Analytics Consent: false
❌ User has not consented to analytics cookies
```

**Dann nach "Erlauben" klicken:**
```
🍪 Cookie Accept button clicked
🍪 Cookie consent saved: {consent: "accepted", analytics: "true", ...}
🍪 Checking for updateAnalyticsConsent function...
✅ updateAnalyticsConsent found, calling...
🔄 updateAnalyticsConsent called
🔍 initAnalytics called
🔍 Cookie Consent: "accepted"
🔍 Has Analytics Consent: true
✅ User has consented, initializing Google Analytics...
🚀 initGoogleAnalytics called
🚀 Analytics ID: G-29128NPRYZ
📥 Loading Google Analytics script...
✅ Google Analytics script loaded
✅ Google Analytics initialized with ID: G-29128NPRYZ
📊 dataLayer: [Array]
📄 trackPageView called
✅ Page view tracked: /de/
```

### 5. Network Tab prüfen
- Gehe zum Tab **"Network"**
- Filter: **"gtag"** oder **"google-analytics"**
- Du solltest eine Anfrage zu `googletagmanager.com/gtag/js?id=G-29128NPRYZ` sehen
- Status sollte **200** sein

### 6. Google Analytics prüfen
- Gehe zu: https://analytics.google.com/
- **Berichte** → **Echtzeit**
- Du solltest dich als aktiven Nutzer sehen

---

## ❌ Häufige Probleme & Lösungen

### Problem: "updateAnalyticsConsent function not found"

**Ursache:** analytics.js wurde nicht geladen oder zu spät geladen

**Lösung:**
1. Prüfe ob `analytics.js` im Network Tab geladen wird
2. Prüfe ob es JavaScript-Fehler gibt
3. Stelle sicher, dass `analytics.js` VOR `script-translate.js` geladen wird

### Problem: "Cookie Consent: null" nach Klick

**Ursache:** LocalStorage wird nicht gespeichert

**Lösung:**
1. Prüfe ob LocalStorage aktiviert ist (nicht im Inkognito-Modus)
2. Prüfe Browser-Konsole auf Fehler
3. Manuell testen:
   ```javascript
   localStorage.setItem('cookieConsent', 'accepted');
   localStorage.setItem('analyticsCookies', 'true');
   location.reload();
   ```

### Problem: Script wird nicht geladen

**Ursache:** Ad-Blocker oder Netzwerkproblem

**Lösung:**
1. Ad-Blocker deaktivieren
2. Network Tab prüfen ob Script blockiert wird
3. Prüfe ob `googletagmanager.com` erreichbar ist

### Problem: "Failed to load Google Analytics script"

**Ursache:** Falsche Measurement ID oder Netzwerkproblem

**Lösung:**
1. Prüfe ob die ID korrekt ist: `G-29128NPRYZ`
2. Prüfe Network Tab auf Fehler
3. Teste die URL manuell: `https://www.googletagmanager.com/gtag/js?id=G-29128NPRYZ`

---

## 🧪 Manueller Test

**Führe diese Befehle in der Browser-Konsole aus:**

```javascript
// 1. Prüfe ob analytics.js geladen wurde
console.log('Analytics loaded:', typeof window.initAnalytics !== 'undefined');

// 2. Prüfe Cookie Consent
console.log('Cookie Consent:', localStorage.getItem('cookieConsent'));

// 3. Manuell Consent setzen
localStorage.setItem('cookieConsent', 'accepted');
localStorage.setItem('analyticsCookies', 'true');

// 4. Analytics manuell initialisieren
if (window.initAnalytics) {
    window.initAnalytics();
} else {
    console.error('initAnalytics nicht gefunden!');
}

// 5. Prüfe ob gtag geladen wurde
setTimeout(() => {
    console.log('gtag available:', typeof window.gtag !== 'undefined');
    console.log('dataLayer:', window.dataLayer);
    
    if (window.gtag) {
        // Test Event senden
        gtag('event', 'test_event', {
            test: true
        });
        console.log('✅ Test Event gesendet');
    }
}, 2000);
```

---

## ✅ Erfolgreiche Initialisierung erkennen

**In der Konsole solltest du sehen:**
- ✅ `Analytics.js loaded`
- ✅ `Google Analytics initialized with ID: G-29128NPRYZ`
- ✅ `Page view tracked: /de/`
- ✅ `dataLayer: [Array mit Events]`

**Im Network Tab:**
- ✅ Request zu `googletagmanager.com/gtag/js?id=G-29128NPRYZ` mit Status 200
- ✅ Request zu `google-analytics.com/g/collect` (wird automatisch gesendet)

**In Google Analytics:**
- ✅ Echtzeit-Bericht zeigt dich als aktiven Nutzer
- ✅ Events erscheinen in Echtzeit

---

## 📞 Wenn nichts funktioniert

1. **Alle Logs kopieren** aus der Browser-Konsole
2. **Network Tab Screenshot** machen
3. **Prüfe:**
   - Ist die Website live deployed?
   - Ist die Measurement ID korrekt?
   - Gibt es JavaScript-Fehler?
   - Wird analytics.js geladen?

