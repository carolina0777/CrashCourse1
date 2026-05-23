# Proposal for EBI (Education Bridge Initiative) RFP: EduScope

**Decision-support system for education planning in fragile contexts**

## Context
EBI operates in 12 conflict-affected countries across Sub-Saharan Africa, the Middle East, and South-East Asia. Its field experts have long supported schools and education staff, building deep contextual knowledge of local infrastructures, organisations, and communities. This expertise, combined with strong local networks, is critical in crisis contexts and must be leveraged to ensure continuity of quality education for students, regardless of conditions or accessibility challenges.

EBI’s current planning and prioritisation relies heavily on field team expertise, but information from the field often reaches headquarters unevenly, limiting the ability to maintain a real-time, comprehensive overview of education infrastructure across regions. As a result, responses are often reactive, led by the nearest available teams during crises.

Building on this, the next step is to go beyond supply-demand mapping and incorporate access as a key dimension. In conflict-affected settings, it is not enough to know where schools are located if they are not safely reachable. Integrating road networks and conflict data allows for a more complete understanding of accessibility, including how routes and access conditions change over time.

## Evidence from the Field: The Borno State Pilot
Initial analysis using the EduScope artifact in North-Eastern Borno State, Nigeria, has yielded critical insights that underscore the urgency of this tool:
*   **High Risk Exposure:** Of the **106 schools** mapped in the study area, **75% (80 facilities)** are located within just **5km of a historical conflict site**.
*   **Intensity of Violence:** The pilot area recorded over **516 vetted conflict events** resulting in more than **6,500 fatalities** since 2020, illustrating the volatile environment students and staff must navigate.
*   **Infrastructure Gaps:** Overlaying road networks reveals that many schools rely on single access points that frequently intersect with high-conflict corridors, making them vulnerable to isolation.

## Approach
The system combines real-time field inputs, geospatial analysis, and AI-generated insights into a single decision-support workflow. Moving from static mapping to dynamic access analysis enables EBI to understand not only where schools are located, but whether and how they remain reachable for children as conflict dynamics evolve.

### Proposed Activities
1. **Data integration and spatial analysis:** Integrating school locations, population distribution, conflict events, and road networks.
2. **Development of an interactive geospatial tool:** A web-based map for non-technical users to explore data and simple scenario analysis.
3. **Field alert mechanism:** A lightweight system for field teams to report risks, clashes, and closures in real-time.
4. **AI-supported knowledge layer:** Structuring qualitative information from past reports to identify recurring patterns.
5. **Bootcamp for field workers:** Training to ensure adoption and integration into daily workflows.

## The Solution in Detail
The tool includes conflict history as well as live updates (30 mins) on ongoing conflict events via GDELT integration. By combining historical data with real-time news alerts, EBI can identify which routes are potentially blocked and identify alternative paths to education facilities.

**Artifact Link:** [Geospatial Decision-Support Tool - Borno State](https://carolina0777.github.io/CrashCourse1/nigeria_schools.html)

## Risks and Limitations
While EduScope significantly enhances situational awareness, several constraints must be managed:
*   **Data Latency:** There is an inherent lag between an incident occurring and its verification in vetted datasets (ACLED/UCDP). This is mitigated by the inclusion of the GDELT Live Alerts layer.
*   **Connectivity Barriers:** The field alert mechanism requires mobile network access. In areas of complete blackout, reports are cached locally but cannot be visualized at HQ until a connection is restored.
*   **Reporting Bias:** Data density is often higher near urban centers. Remote rural areas may appear "safer" simply due to a lack of media coverage or field presence.
*   **Dynamic Population Movement:** Population datasets like GRID3 are periodically updated but may not reflect sudden displacements (IDP movements) occurring in real-time during a major offensive.

## Deliverables
*   **Deliverable 1:** Single-entry interface platform combining geospatial data and AI-generated prioritisation signals.
*   **Deliverable 2:** Comprehensive training programme for field officers, coordinators, and HQ focal points.

[Link to GitHub Repository](https://github.com/carolina0777/CrashCourse1)
