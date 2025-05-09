# Currency React Native App

Eine React Native App zur Anzeige und Verwaltung von Währungsdaten. Dieses Projekt verwendet Expo für die Entwicklung und unterstützt sowohl mobile Geräte als auch Web.

---

## Installation

### Voraussetzungen
- **Node.js**: [Node.js v23.11.0](https://nodejs.org/download/release/v23.11.0/)
- **npm**: Version 9.7.1 oder höher
- **Expo CLI**: Installieren Sie Expo lokal im Projekt.

### Schritte
1. **Expo installieren**:
   ```bash
   npm install expo@^53.0.0
   ```

2. **Projekt initialisieren**:
   ```bash
   expo init currency-reactnative -t expo-template-blank-typescript
   ```

3. **Abhängigkeiten installieren**:
   ```bash
   yarn install
   ```

---

## Lokale Entwicklung

### Mit Expo ohne Android SDK oder XCode (MacOS)
- Starten Sie den Entwicklungsserver:
  ```bash
  npx expo start
  ```
- Öffnen Sie die Webansicht:
  ```bash
  npx expo start --web
  ```

### Mit Emulator (iOS und/oder Android)
- Android SDK und Emulator erforderlich (z. B. Android Version 11, Emulator Pixel 2):
  ```bash
  expo start --android
  ```

---

## Routing

Verwenden Sie diese Navigationslösung anstelle von React Router:

[React Navigation Dokumentation](https://reactnavigation.org/docs/navigating)

---

## REST API

- [Free Currency API Dashboard](https://app.freecurrencyapi.com/dashboard)
- Anmeldung mit Gmail erforderlich

---

## Demo Snack auf Expo

- [Currency React Native Demo](https://snack.expo.dev/@petethegreat/currency-reactnative)
- Siehe auch: [Super Trumpf Demo](https://snack.expo.dev/@petethegreat/super-trumpf)