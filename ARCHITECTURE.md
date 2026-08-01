# Architecture

## Overview

The Player Journey Visualization Tool is built as a client-side analytics dashboard using **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. The application loads processed telemetry data, maps world coordinates to minimap coordinates, and renders an interactive replay system with player movement, event visualization, heatmaps, and match analytics.

---

# Technology Choices

| Technology | Reason |
|------------|--------|
| Next.js (App Router) | Component-based architecture, fast development, optimized asset handling. |
| React | Declarative UI and efficient state management for replay controls and visualization. |
| TypeScript | Type safety for telemetry models and component props. |
| Tailwind CSS | Rapid development with consistent styling and responsive layouts. |
| SVG | Efficient rendering of player paths, event markers, and overlays. |
| HTML Canvas | Used for heatmap rendering because thousands of overlapping points perform better on Canvas than SVG. |

---

# Data Flow

Telemetry data is preprocessed and cached before being consumed by the UI.

```
Parquet Files
      │
      ▼
Telemetry Extraction
      │
      ▼
Processed JSON Cache
      │
      ▼
useTelemetry()
      │
      ▼
React Components
      │
      ├── PlayerPath
      ├── EventMarker
      ├── HeatmapOverlay
      ├── Timeline
      └── MatchSummary
```

### Rendering Flow

1. User selects a match from the sidebar.
2. `useTelemetry()` loads the corresponding telemetry dataset.
3. Position events are converted into minimap coordinates.
4. Replay state determines the current frame.
5. Components render only the data relevant to the current playback frame.
6. Match statistics are computed from telemetry and displayed in the summary panel.

---

# Coordinate Mapping

The telemetry stores player positions in **world coordinates (X, Z)**, while the minimap is displayed in **pixel coordinates (1024 × 1024)**.

A coordinate mapping utility converts world positions into minimap positions by applying map-specific bounds and normalizing the coordinates.

```
World Position
(X, Z)
      │
      ▼
Normalize using map bounds
      │
      ▼
Scale to minimap dimensions
      │
      ▼
Pixel Position
(x, y)
```

Each supported map contains predefined world boundaries. These boundaries are used to calculate normalized values between 0 and 1, which are then scaled to the minimap resolution. This ensures that player movement aligns accurately with the background minimap image.

---

# Assumptions

During implementation, several assumptions were required due to ambiguity in the telemetry data.

- Match duration was calculated using the earliest and latest available telemetry timestamps.
- Distance travelled was approximated by summing Euclidean distances between consecutive player position events.
- Heatmap intensity was based on the frequency of position events rather than player speed or dwell time.
- Human and bot identification relied on the provided `isBot` flag.
- Event timestamps were assumed to be sequential and suitable for replay interpolation.
- Coordinate bounds were assumed to remain constant for each map.

---

# Design Tradeoffs

| Decision | Tradeoff |
|----------|----------|
| Canvas for heatmap | Better rendering performance but less interactive than SVG. |
| SVG for player paths | Easier styling and interaction, though less efficient for extremely large datasets. |
| Client-side replay engine | Simple architecture and responsive UI, but all telemetry must be loaded into browser memory. |
| Preprocessed telemetry cache | Faster visualization at runtime, with additional preprocessing required before loading. |
| Frame-based playback | Smooth and predictable replay, although exact real-time interpolation is simplified. |

---

# Architecture Summary

The application separates concerns into reusable components responsible for visualization, replay controls, statistics, and data loading. Coordinate mapping acts as the core transformation layer between raw telemetry and visual output, while React state synchronizes playback, filtering, and analytics across the dashboard. The result is a modular architecture that is easy to extend with additional maps, event types, or analytics without changing the overall system design.
