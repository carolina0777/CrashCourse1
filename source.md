# Project Data Sources

This document lists the data sources and APIs used in the Geospatial Decision-Support Tool for Education Access in Borno State.

## Geospatial Data & APIs

### 1. ACLED (Armed Conflict Location & Event Data Project)
*   **Website:** [acleddata.com](https://acleddata.com/)
*   **Role:** Provides vetted, high-quality historical data on conflict events and political violence in Nigeria.
*   **Usage:** Used for the "Conflict Monitoring (Vetted)" layer.

### 2. GDELT Project (Global Database of Events, Language, and Tone)
*   **Website:** [gdeltproject.org](https://gdeltproject.org/)
*   **Role:** Monitors global news in real-time across 100+ languages.
*   **Usage:** Powers the "Live Conflict Alerts" layer via the GDELT GEO 2.0 API, providing updates every 30 minutes.

### 3. OpenStreetMap (OSM)
*   **Website:** [openstreetmap.org](https://www.openstreetmap.org/)
*   **Role:** Provides the base map tiles and the underlying infrastructure/road network data.
*   **Usage:** Base map layer and road network visualization.

### 4. NMIS (Nigeria Management Information System)
*   **Role:** Original source for the educational facilities (Primary and Secondary schools) dataset in Nigeria.
*   **Usage:** Powers the "Educational Facilities" layer.

## Libraries & Tools

### 1. Leaflet.js
*   **Website:** [leafletjs.com](https://leafletjs.com/)
*   **Role:** The primary open-source JavaScript library used for building the interactive mobile-friendly map.

### 2. PapaParse
*   **Website:** [papaparse.com](https://www.papaparse.com/)
*   **Role:** Robust CSV parser used to handle the ACLED conflict data integration.

### 3. Leaflet.heat
*   **Role:** A Leaflet plugin used to generate the population density heatmap from point data.
