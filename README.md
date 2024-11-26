# 🤖 Holy's AI Prompts

<div align="center">
  <img src="client/src/assets/logo.png" alt="" width="200"/>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
</div>

## 📖 Über das Projekt

Holy's AI Prompts ist eine moderne Webanwendung zur Verwaltung und Organisation von KI-Prompts für verschiedene KI-Modelle. Die Anwendung ermöglicht es Benutzern, ihre Prompts für unterschiedliche KI-Systeme wie ChatGPT, Claude und DALL-E zu speichern, zu kategorisieren und wiederzuverwenden.

### ✨ Funktionen

- 🗂️ Organisieren von Prompts nach KI-Modell
- ➕ Einfaches Hinzufügen neuer Prompts
- 📝 Bearbeiten bestehender Prompts
- 🗑️ Löschen nicht mehr benötigter Prompts
- 📋 Schnelles Kopieren von Prompts
- 🎨 Modernes, dunkles Design
- 📱 Responsive Benutzeroberfläche

## 🚀 Getting Started

### Voraussetzungen

- Node.js (v20 oder höher)
- npm oder yarn

### Installation

1. Repository klonen
```bash
git clone https://github.com/yourusername/holy-ai-prompts.git
cd holy-ai-prompts
```

2. Frontend Dependencies installieren
```bash
cd client
npm install
```

3. Backend Dependencies installieren
```bash
cd ../server
npm install
```

4. Umgebungsvariablen einrichten
```bash
# In /client/.env
VITE_API_URL=http://localhost:3001/api

# In /server/.env
PORT=3001
NODE_ENV=development
```

5. Entwicklungsserver starten
```bash
# Frontend (Terminal 1)
cd client
npm run dev

# Backend (Terminal 2)
cd server
npm run dev
```

## 🏗️ Projektstruktur

```
holy-ai-prompts/
├── client/               # Frontend (React + Vite)
│   └── src/
│       ├── App.jsx       # Hauptkomponente der React-App
│       ├── index.css     # Globale CSS-Datei
│       ├── main.jsx      # Einstiegspunkt der App
│       └── config/       # Konfigurationsdateien
│           └── api.js    # API Funktionen
├── .env.development      # Entwicklungsumgebungsvariablen
├── index.html            # HTML-Vorlage
├── package.json          # Abhängigkeiten des Frontends
├── postcss.config.js     # PostCSS-Konfiguration
├── tailwind.config.js    # Tailwind CSS-Konfiguration
└── vite.config.js        # Vite-Konfiguration
├── server/               # Backend (Node.js + Express)
│   ├── database/         # SQLite Datenbank
│   │   └── init.js       # Initialisierung der Datenbank
│   ├── middleware/       # Express Middleware
│   │   └── security.js   # Sicherheitsfunktionen
│   ├── routes/           # API Routen
│   │   └── prompts.js    # Routen für Prompts
│   ├── package.json      # Abhängigkeiten des Backends
│   └── server.js         # Einstiegspunkt für den Backend-Server

```

## 🛠️ Technologie-Stack

### Frontend
- React (mit Vite)
- Tailwind CSS
- Lucide Icons
- Axios

### Backend
- Node.js
- Express.js
- SQLite3
- CORS

## 📝 Lizenz

Dieses Projekt ist unter der MIT Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

## 👥 Mitwirkende

- [HolyG](https://github.com/HeiligerG) - Initialentwicklung

## 🤝 Beitragen

Beiträge sind willkommen! Bitte lesen Sie [CONTRIBUTING.md](CONTRIBUTING.md) für Details zum Prozess für Pull Requests.

## 📧 Kontakt

Ihr Name - [@The_Real_HolyG](https://twitter.com/the_real_holyg)

Projekt Link: [https://github.com/HeiligerG/holy-ai-prompts](https://github.com/HeiligerG/holy-ai-prompts)

---

<div align="center">
  Mit 💜 erstellt von [HolyG]
</div>
