# Gameplay Insights

The Player Journey Visualization Tool made it possible to observe player movement, event density, and match progression over time. Below are three notable insights discovered from the visualized telemetry.

---

# Insight 1 — Looting Activity is Highly Concentrated

## What caught my eye

The heatmap consistently showed a few regions with significantly higher player traffic than the rest of the map. Loot event markers were heavily clustered within these hotspots, while large portions of the map received very little player activity.

## Evidence

- Heatmap displayed dense movement clusters in specific areas.
- Loot event markers frequently overlapped within those regions.
- Player paths converged early in the match before spreading outward.

## Actionable Insight

Yes.

### Metrics Affected

- Loot Distribution
- Player Density
- Early Match Engagement
- Player Survival Rate

### Actionable Items

- Redistribute high-value loot across additional locations.
- Introduce secondary loot zones to encourage alternative landing strategies.
- Reduce excessive player clustering in the opening phase of matches.

## Why a Level Designer Should Care

Uneven loot distribution creates predictable landing patterns, reducing strategic variety. Better loot placement encourages exploration and improves replayability by making more areas of the map viable.

---

# Insight 2 — Players Follow Similar Movement Routes

## What caught my eye

The replay visualization showed many players travelling along similar paths throughout the match. Even after the initial landing phase, movement remained concentrated along a limited number of routes.

## Evidence

- Player path overlays frequently overlapped.
- Heatmap hotspots aligned with the same travel corridors.
- Large areas of the map showed little or no player movement.

## Actionable Insight

Yes.

### Metrics Affected

- Map Utilization
- Exploration Rate
- Encounter Frequency
- Route Diversity

### Actionable Items

- Add additional traversal routes between major locations.
- Introduce environmental incentives for exploring underused areas.
- Adjust terrain or point-of-interest placement to distribute player movement more evenly.

## Why a Level Designer Should Care

If most players naturally choose the same routes, gameplay becomes repetitive and predictable. Encouraging multiple viable paths improves tactical decision-making and increases match variety.

---

# Insight 3 — Combat Occurs Near High-Traffic Areas

## What caught my eye

Bot Kill and Death events were concentrated around the same locations that showed the highest movement density. Very few eliminations occurred in low-traffic regions.

## Evidence

- Bot Kill markers clustered near heatmap hotspots.
- Death events appeared close to major movement intersections.
- Player replay paths frequently converged before elimination events.

## Actionable Insight

Yes.

### Metrics Affected

- Combat Frequency
- Match Pacing
- Player Retention
- Average Survival Time

### Actionable Items

- Introduce additional objectives or loot opportunities in quieter areas.
- Balance encounter density by encouraging players toward multiple objectives.
- Evaluate whether current hotspot intensity creates unfair early eliminations.

## Why a Level Designer Should Care

Concentrated combat can create repetitive gameplay where only a few locations determine the outcome of most matches. Distributing objectives and encounters more evenly leads to healthier pacing and a more balanced player experience.

---

# Summary

The visualization tool enabled analysis beyond raw telemetry by combining replay controls, heatmaps, event markers, and player path overlays. These visualizations revealed patterns in player behavior that can inform map balancing, loot placement, encounter design, and overall gameplay flow.
