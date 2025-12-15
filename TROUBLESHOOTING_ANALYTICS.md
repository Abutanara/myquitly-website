# Google Analytics Troubleshooting

## Problem: "Google-Tag wurde nicht gefunden"

### 🔍 Ursache

Der Google Tag wird **nur nach Cookie-Einwilligung** geladen (DSGVO-konform). Der Google Tag Assistant prüft aber sofort beim Seitenaufruf, ob der Tag vorhanden ist.

### ✅ Lösung 1: Im Browser testen (Empfohlen)

1. **Website öffnen:**
   - Gehe zu: `https://myquitly.stargate-innovationhub.com/de/`

2. **Cookie-Banner akzeptieren:**
   - Klicke auf **"Erlauben"** im Cookie-Banner

3. **Browser-Konsole öffnen (F12):**
   - Gehe zu: **Console** Tab
   - Du solltest sehen: `✅ Google Analytics initialized with ID: G-29128NPRYZ`

4. **In Google Analytics prüfen:**
   - Gehe zu: https://analytics.google.com/
   - **Berichte** → **Echtzeit**
   - Du solltest dich als aktiven Nutzer sehen

### ✅ Lösung 2: Google Tag Assistant richtig verwenden

Der Google Tag Assistant kann den Tag nicht finden, weil er **vor** der Cookie-Einwilligung prüft.

**So testest du richtig:**

1. **Website öffnen**
2. **Cookie-Banner → "Erlauben" klicken**
3. **Dann** den Google Tag Assistant verwenden
4. Oder: Seite neu laden (F5) nachdem du Cookies akzeptiert hast

### ✅ Lösung 3: Manuell im Code prüfen

1. **Browser-Konsole öffnen (F12)**
2. **Eingeben:**
   ```javascript
   // Prüfe ob Analytics geladen ist
   console.log('gtag vorhanden:', typeof window.gtag !== 'undefined');
   console.log('dataLayer:', window.dataLayer);
   console.log('Cookie Consent:', localStorage.getItem('cookieConsent'));
   ```

3. **Erwartete Ausgabe:**
   ```
   gtag vorhanden: true
   dataLayer: Array mit Events
   Cookie Consent: "accepted"
   ```

### ✅ Lösung 4: Temporär für Testing (nur lokal!)

**⚠️ WARNUNG: Nur für lokales Testing! Nicht auf Live-Server committen!**

Falls du den Tag sofort laden willst (ohne Cookie-Banner), kannst du temporär in `analytics.js` ändern:

```javascript
// TEMPORÄR - NUR FÜR TESTING!
// Auto-initialize on page load if consent already given
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // TEMPORÄR: Force initialization for testing
        initGoogleAnalytics();
        trackPageView();
    });
} else {
    // TEMPORÄR: Force initialization for testing
    initGoogleAnalytics();
    trackPageView();
}
```

**WICHTIG:** Diese Änderung wieder rückgängig machen, bevor du auf den Live-Server deployst!

---

## Weitere häufige Probleme

### Problem: Analytics lädt nicht nach "Erlauben"

**Prüfe:**
1. Browser-Konsole auf Fehler (F12 → Console)
2. LocalStorage: `localStorage.getItem('cookieConsent')` sollte `"accepted"` sein
3. Network Tab: Prüfe ob `gtag/js` geladen wird

**Lösung:**
- LocalStorage löschen und Cookie-Banner erneut akzeptieren
- Browser-Cache leeren

### Problem: Keine Daten in Google Analytics

**Mögliche Ursachen:**
1. **24-48 Stunden Wartezeit:** Manche Berichte brauchen Zeit
2. **Echtzeit-Bericht prüfen:** Dort erscheinen Daten sofort
3. **Falsche Property:** Prüfe ob du in der richtigen Property bist

**Lösung:**
- Gehe zu: **Berichte** → **Echtzeit** (dort siehst du sofort Daten)
- Prüfe ob die Measurement ID korrekt ist

### Problem: "Failed to load Google Analytics script"

**Ursache:**
- Netzwerkproblem
- Ad-Blocker blockiert Analytics
- Falsche Measurement ID

**Lösung:**
1. Ad-Blocker deaktivieren
2. Measurement ID prüfen (Format: `G-XXXXXXXXXX`)
3. Network Tab prüfen ob Script geladen wird

---

## ✅ Checkliste für erfolgreiches Tracking

- [ ] Measurement ID korrekt eingetragen (`G-29128NPRYZ`)
- [ ] Website deployed (nicht nur committed, sondern live)
- [ ] Cookie-Banner wurde akzeptiert
- [ ] Browser-Konsole zeigt: `✅ Google Analytics initialized`
- [ ] In Google Analytics → Echtzeit → Siehst du dich als Nutzer
- [ ] Keine Ad-Blocker aktiv
- [ ] Keine JavaScript-Fehler in der Konsole

---

## 🧪 Quick Test

**Führe diesen Test in der Browser-Konsole aus:**

```javascript
// 1. Prüfe Cookie Consent
console.log('Cookie Consent:', localStorage.getItem('cookieConsent'));

// 2. Prüfe ob Analytics geladen
console.log('gtag vorhanden:', typeof window.gtag !== 'undefined');
console.log('dataLayer:', window.dataLayer);

// 3. Manuell Page View senden (falls nicht automatisch)
if (window.gtag) {
    gtag('event', 'test_page_view', {
        test: true
    });
    console.log('✅ Test Event gesendet');
}
```

**Erwartete Ausgabe:**
```
Cookie Consent: "accepted"
gtag vorhanden: true
dataLayer: [Array mit Events]
✅ Test Event gesendet
```

---

## 📞 Noch Probleme?

1. **Prüfe Browser-Konsole** auf Fehler
2. **Prüfe Network Tab** ob Scripts geladen werden
3. **Prüfe Google Analytics** → Echtzeit-Bericht
4. **Warte 24 Stunden** für vollständige Daten

