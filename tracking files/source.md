# Project Data Sources

This document lists the data sources and APIs used in the Geospatial Decision-Support Tool for Education Access in Borno State, as well as alternative sources considered during development.

## 🟢 Active Geospatial Data & APIs

### 1. UCDP GED (Uppsala Conflict Data Program)
*   **Website:** [ucdp.uu.se](https://ucdp.uu.se/downloads/index.html#ged_global)
*   **Role:** Provides vetted, high-quality historical data on conflict events and political violence.
*   **Usage:** Powers the "Conflict Monitoring (Vetted)" layer in the Nigeria map (2020+ data).

### 2. GDELT Project (Global Database of Events, Language, and Tone)
*   **Website:** [gdeltproject.org](https://gdeltproject.org/)
*   **Role:** Monitors global news in real-time across 100+ languages.
*   **Usage:** Powers the "Live Conflict Alerts" layer via the GDELT GEO 2.0 API, providing updates every 30 minutes.

### 3. GRID3 (Geo-Referenced Infrastructure and Demographic Data for Development)
*   **Website:** [grid3.org](https://grid3.org/)
*   **Role:** High-resolution data on settlements, infrastructure, and boundaries.
*   **Usage:** Primary source for the **Educational Facilities** (Nigeria Schools) and **Population Density** layers.

### 4. OpenStreetMap (OSM) / HOTOSM
*   **Website:** [openstreetmap.org](https://www.openstreetmap.org/) | [hotosm.org](https://www.hotosm.org/)
*   **Role:** Community-driven global mapping data.
*   **Usage:** Base map tiles and the underlying infrastructure/road network data (lines).

---

## 🟡 Suggested but Unused Sources

The following sources were researched or suggested during the development process but were not integrated into the final active layers for this specific implementation.

### 1. ACLED (Armed Conflict Location & Event Data Project)
*   **Reasoning:** Highly granular conflict data; UCDP GED was chosen for the current historical visualization, but ACLED remains a premier alternative for academic and policy analysis.

### 2. WorldPop
*   **Reasoning:** Suggested for high-resolution population distribution. GRID3 and OSM-based heatmaps were prioritized for their direct integration with settlement point data.

### 3. HDX (Humanitarian Data Exchange)
*   **Reasoning:** A repository for various humanitarian datasets. Used as a reference point for finding the HOTOSM and GRID3 exports.

### 4. Healthsites.io
*   **Reasoning:** Suggested for global health facility mapping. While used indirectly via Overpass API for the Indonesia map, it was not the primary source for the Nigeria school-focused implementation.

### 5. NMIS (Nigeria Management Information System)
*   **Reasoning:** An early source for educational facilities in Nigeria. GRID3 was ultimately used for the Borno state specific mapping due to its updated settlement-aligned data.

## Libraries & Tools

### 1. Leaflet.js
*   **Website:** [leafletjs.com](https://leafletjs.com/)
*   **Role:** Primary open-source JavaScript library for interactive mapping.

### 2. PapaParse
*   **Website:** [papaparse.com](https://www.papaparse.com/)
*   **Role:** CSV parser used to handle the UCDP conflict data integration.

### 3. Leaflet.heat
*   **Role:** Plugin used to generate the population density heatmap from point data.
