# Proposal for EBI (Education Bridge Initiative) RFP: EduScope

**Decision-support system for education planning in fragile contexts**

## Context
EBI operates in 12 conflict-affected countries across Sub-Saharan Africa, the Middle East, and South-East Asia. Its field experts have long supported schools and education staff, building deep contextual knowledge of local infrastructures, organisations, and communities. This expertise, combined with strong local networks, is critical in crisis contexts and must be leveraged to ensure continuity of quality education for students, regardless of conditions or accessibility challenges.

EBI’s current planning and prioritisation relies heavily on field team expertise, but information from the field often reaches headquarters unevenly, limiting the ability to maintain a real-time, comprehensive overview of education infrastructure across regions. As a result, responses are often reactive, led by the nearest available teams during crises.

Building on this, the next step is to go beyond supply-demand mapping and incorporate access as a key dimension. In conflict-affected settings, it is not enough to know where schools are located if they are not safely reachable. Integrating road networks and conflict data allows for a more complete understanding of accessibility, including how routes and access conditions change over time.

## Evidence from the Field: The Borno State Pilot
The **EduScope Borno** artifact has transformed raw geospatial data into a narrative of accessibility and risk. Initial analysis of the North-Eastern Borno State pilot has yielded critical findings:

*   **Extreme Risk Exposure:** Analysis confirms that **75% of schools** (80 out of 106 facilities) are located within a high-risk **5km radius** of a vetted conflict event.
*   **Significant Infrastructure Gaps:** The study area encompasses **2,103 settlements**, yet school distribution is critically uneven. The northern tip faces a **3x coverage gap**, with only 1 school serving every 50 settlements (compared to 1 per 18 in the south).
*   **Intensity of Violence:** The pilot area has recorded over **516 conflict events** and **6,500+ fatalities** since 2020, illustrating the volatile environment students must navigate.
*   **Isolation Vulnerability:** By selecting individual facilities in the tool, EBI can see that many schools rely on just **1 or 2 access roads** that intersect directly with high-frequency conflict corridors.

## Approach
The system combines real-time field inputs, geospatial analysis, and AI-generated insights into a single decision-support workflow. Moving from static mapping to dynamic access analysis enables EBI to understand not only where schools are located, but whether and how they remain reachable for children as conflict dynamics evolve.

### Proposed Activities
1. **Data integration and spatial analysis:** Integrating school locations, population distribution, conflict events, and road networks.
2. **Development of an interactive geospatial tool:** A web-based map for non-technical users to explore data and simple scenario analysis.
3. **Field alert mechanism:** A lightweight system for field teams to report risks, clashes, and closures in real-time.
4. **AI-supported knowledge layer:** Structuring qualitative information from past reports to identify recurring patterns.
5. **Bootcamp for field workers:** Training to ensure adoption and integration into daily workflows.

## The Solution in Detail: Dynamic Accessibility Monitoring
The EduScope tool moves beyond "dots on a map" to provide an active analysis environment. When a school is selected, the tool dynamically highlights the **local road network** and calculates **localized risk metrics** (nearby conflicts vs. available routes).

The tool integrates:
*   **Historical Depth:** Years of vetted security data to identify long-term patterns.
*   **Real-Time Awareness:** **Live Safety Alerts** updated every 30 minutes via GDELT integration to monitor emerging threats.
*   **Contextual Background:** Population density heatmaps to prioritize interventions where child populations are highest.

**Artifact Link:** [EduScope Borno State - Interactive Tool](https://carolina0777.github.io/CrashCourse1/nigeria_schools.html)

## Risks and Limitations
While EduScope significantly enhances situational awareness, several constraints must be managed:
*   **Data Latency:** Lag in vetted security datasets (ACLED/UCDP) is mitigated by the 30-minute GDELT live news layer.
*   **Connectivity Barriers:** The field alert mechanism caches reports locally in "blackout" zones until network access is restored.
*   **Reporting Bias:** Remote rural areas may show fewer events due to lack of media coverage; field team input is vital to verify "quiet" zones.
*   **Dynamic Population Movement:** IDP movements can shift demand faster than annual population census updates.

## Deliverables
*   **Deliverable 1:** Single-entry interface platform combining geospatial data and AI-generated prioritisation signals.
*   **Deliverable 2:** Comprehensive training programme for field officers, coordinators, and HQ focal points.

[Link to GitHub Repository](https://github.com/carolina0777/CrashCourse1)
