# Geospatial Decision-Support Tool: Borno State Education & Safety

This project provides an interactive visualization of educational infrastructure in North-Eastern Borno State, Nigeria, integrated with conflict monitoring and real-time safety alerts.

## 📍 Live Map
*   **Nigeria Schools & Conflict Map:** [https://carolina0777.github.io/CrashCourse1/nigeria_schools.html](https://carolina0777.github.io/CrashCourse1/nigeria_schools.html)

## 📊 Data Sources & Layers

The map integrates multiple geospatial datasets to provide a comprehensive view of the intersection between education and security:

### 1. Educational Facilities (Schools)
*   **Source:** [GRID3 (Nigeria Schools)](https://data.grid3.org/datasets/grid3-nigeria-schools)
*   **Description:** Distribution of Primary, Pre-Primary, and Secondary schools.
*   **Visuals:** Green (Primary/Pre-Primary) and Orange (Secondary) circle markers.

### 2. Conflict Monitoring (Vetted Historical Data)
*   **Source:** [UCDP GED (Uppsala Conflict Data Program)](https://ucdp.uu.se/downloads/index.html#ged_global)
*   **Description:** Historical conflict events (2020+) within the study area, including fatality counts and event types.
*   **Visuals:** Red circle markers scaled by fatality count.

### 3. Live Conflict Alerts (Real-time News)
*   **Source:** [GDELT Project (Global Database of Events, Language, and Tone)](https://www.gdeltproject.org/)
*   **Description:** Real-time news alerts mentioning armed conflict and fatalities, updated every 30 minutes via the GDELT Geo 2.0 API.
*   **Visuals:** Yellow circle markers.

### 4. Infrastructure & Roads
*   **Source:** [OpenStreetMap (OSM)](https://www.openstreetmap.org/)
*   **Description:** Road network supporting school accessibility and regional connectivity.
*   **Visuals:** Contextual light grey lines, highlighting on click.

### 5. Population Density
*   **Source:** [GRID3 Settlement Layer](https://grid3.org/) / OpenStreetMap.
*   **Description:** Heatmap visualization of populated places to identify high-need areas and population centers.
*   **Visuals:** Multi-color intensity gradient (Heatmap).

## 🛠 Tools & Repository Structure
- **[scripts/](scripts/):** Contains Node.js utilities for data processing:
    - `filter_geojson.cjs`: Filters national datasets by geographic bounding box.
    - `filter_conflict_csv.cjs`: Specialized tool for UCDP/ACLED CSV processing.
- **[data/](data/):** Organized geospatial datasets:
    - [raw/](data/raw/): Original source files (Conflict events, schools, and settlements). 
        - *Note: The raw road dataset (hotosm_nga_roads_lines_geojson.geojson) is approximately 1.2GB, which exceeds GitHub's 100MB file size limit. This specific raw file is stored locally in the project environment, while the cleaned/filtered versions are available in the repository.*
    - [cleaned or filtered data/](data/cleaned%20or%20filtered%20data/): Cleaned GeoJSON layers for schools, roads, and population used by the map.
- **Mapping:** Built with Leaflet.js and Leaflet.heat.

---
*Note: This repository focuses on the intersection of educational infrastructure and regional security in Northern Nigeria.*
