# 🎮 Player Journey Visualization Tool

An interactive web application for visualizing player movement, events, and match analytics from game telemetry data.

Built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**, the application provides an intuitive way to replay matches, analyze player behavior, and inspect gameplay events through an interactive minimap.

---

## ✨ Features

### 🗺 Interactive Minimap
- High-resolution game minimap
- Responsive viewport
- Player movement visualization
- Smooth animated player trails

### ▶ Match Replay
- Play / Pause / Restart controls
- Timeline scrubbing
- Adjustable playback speed (0.5x, 1x, 2x, 4x)

### 🔥 Heatmap
- Density-based player movement heatmap
- Toggle heatmap visibility
- Canvas-rendered for performance

### 📍 Event Visualization
Visualizes important gameplay events including:

- Loot
- Bot Kill
- Death
- Storm Death

Each event includes:

- Color-coded markers
- Hover tooltips
- Event timestamp
- Player information

### 👥 Player Visualization

- Human vs Bot differentiation
- Animated movement trails
- Live player position indicator

### 📊 Match Summary

Displays match analytics including:

- Total Players
- Humans
- Bots
- Loot Events
- Bot Kills
- Deaths
- Storm Deaths
- Total Distance Travelled
- Match Duration

### 🎛 Filters

Toggle visibility for:

- Humans
- Bots
- Loot
- Bot Kills
- Storm Deaths

---

## 🛠 Tech Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Canvas API
- SVG
- React Hooks

---

## 📂 Project Structure

```
app/
components/
    filters/
    heatmap/
    layout/
    map/
    playback/
    shared/
    stats/
    timeline/
hooks/
lib/
cache/
public/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd player-journey-tool
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 📈 Telemetry Pipeline

The application reads cached telemetry data and converts world coordinates into minimap coordinates.

Pipeline:

```
Telemetry
      │
      ▼
Position Events
      │
      ▼
World Coordinate Mapping
      │
      ▼
Minimap Rendering
      │
      ├── Player Paths
      ├── Heatmap
      ├── Event Markers
      └── Match Analytics
```

---

## 🎨 UI Highlights

- Modern dark theme
- Responsive dashboard
- Interactive minimap
- Animated player trails
- Hover tooltips
- Smooth playback controls
- Clean analytics dashboard

---

## 📸 Preview

### Interactive Match Viewer

- Animated replay
- Heatmap visualization
- Event markers
- Timeline controls
- Match summary dashboard

---

## 🔮 Future Improvements

- Multiple map support
- Kill feed timeline
- Team filtering
- Search players
- Circle (safe zone) visualization
- Export replay snapshots
- Performance statistics
- Live telemetry streaming

---

## 👨‍💻 Author

Aryan Gupta

Frontend Developer

Built as a telemetry visualization assignment demonstrating data visualization, interactive UI, and frontend engineering using React and Next.js.