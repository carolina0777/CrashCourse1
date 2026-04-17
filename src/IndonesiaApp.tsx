import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState, useMemo } from 'react'

// Fix for default marker icon in Leaflet + React
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const createIcon = (color: string) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const GreenIcon = createIcon('green');   // Severity 1.0
const GoldIcon = createIcon('gold');     // Severity 1.5
const RedIcon = createIcon('red');       // Severity 2.0+
const BlueIcon = createIcon('blue');     // Health Site

interface FloodFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    id: string;
    country: string;
    began: string;
    dead: number;
    cause: string;
    severity: number;
  };
}

interface HealthFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    name: string;
    amenity?: string;
    healthcare?: string;
  };
}

interface FeatureCollection<T> {
  type: string;
  features: T[];
}

function App() {
  const [floodData, setFloodData] = useState<FeatureCollection<FloodFeature> | null>(null);
  const [healthData, setHealthData] = useState<FeatureCollection<HealthFeature> | null>(null);
  const [showOnlyNearFloods, setShowOnlyNearFloods] = useState(false);
  
  const position: [number, number] = [-2.5489, 118.0149] // Centered on Indonesia

  useEffect(() => {
    // Load Floods
    fetch('./indonesia_floods.geojson')
      .then(response => response.json())
      .then(data => setFloodData(data))
      .catch(error => console.error('Error loading flood data:', error));

    // Load Health Sites (Borneo)
    fetch('./borneo_health_sites.geojson')
      .then(response => response.json())
      .then(data => setHealthData(data))
      .catch(error => console.error('Error loading health data:', error));
  }, []);

  // Distance helper (Haversine) - Result in km
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filteredHealthSites = useMemo(() => {
    if (!healthData || !floodData) return [];
    if (!showOnlyNearFloods) return healthData.features;

    return healthData.features.filter(healthSite => {
      const [hLng, hLat] = healthSite.geometry.coordinates;
      return floodData.features.some(flood => {
        const [fLng, fLat] = flood.geometry.coordinates;
        const dist = getDistance(hLat, hLng, fLat, fLng);
        return dist <= 1.0; // 1 km threshold
      });
    });
  }, [healthData, floodData, showOnlyNearFloods]);

  const getIcon = (severity: number) => {
    if (severity >= 2.0) return RedIcon;
    if (severity >= 1.5) return GoldIcon;
    return GreenIcon;
  };

  return (
    <div id="map-wrapper" style={{ height: "100vh", width: "100%" }}>
      {/* Title and Controls */}
      <div style={{ 
        position: "absolute", 
        zIndex: 1000, 
        top: 10, 
        left: 50, 
        background: "rgba(255,255,255,0.9)", 
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        maxWidth: "280px"
      }}>
        <h2 style={{ margin: 0, fontSize: "18px" }}>Health & Flood Dashboard</h2>
        <p style={{ margin: "5px 0 10px", fontSize: "14px" }}>
          Floods: {floodData?.features.length || 0} | Health Sites: {filteredHealthSites.length}
        </p>
        
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", fontWeight: "bold", background: "#f0f0f0", padding: "8px", borderRadius: "4px" }}>
            <input 
              type="checkbox" 
              checked={showOnlyNearFloods} 
              onChange={() => setShowOnlyNearFloods(!showOnlyNearFloods)}
              style={{ marginRight: "8px" }}
            />
            Show only sites near floods (&lt; 1km)
          </label>
        </div>

        <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <strong style={{ fontSize: "13px" }}>Legend:</strong>
          <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <span style={{ width: "12px", height: "12px", backgroundColor: "#2fb344", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span>
            <span style={{ fontSize: "12px" }}>Flood (Severity 1.0)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
            <span style={{ width: "12px", height: "12px", backgroundColor: "#e8a800", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span>
            <span style={{ fontSize: "12px" }}>Flood (Severity 1.5)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
            <span style={{ width: "12px", height: "12px", backgroundColor: "#cb2b3e", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span>
            <span style={{ fontSize: "12px" }}>Flood (Severity 2.0)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
            <span style={{ width: "12px", height: "12px", backgroundColor: "#2a81cb", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span>
            <span style={{ fontSize: "12px" }}>Health Facility (OSM)</span>
          </div>
        </div>
      </div>
      
      <MapContainer 
        center={position} 
        zoom={5} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Flood Markers */}
        {floodData?.features.map((feature, idx) => {
          const [lng, lat] = feature.geometry.coordinates;
          if (lng < 90 || lng > 150 || lat < -15 || lat > 15) return null;
          return (
            <Marker key={`flood-${idx}`} position={[lat, lng]} icon={getIcon(feature.properties.severity)}>
              <Popup>
                <div style={{ fontSize: "13px" }}>
                  <strong>Flood Event</strong><br/>
                  Date: {feature.properties.began}<br/>
                  Deaths: {feature.properties.dead}<br/>
                  Severity: {feature.properties.severity}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Health Site Markers (Filtered) */}
        {filteredHealthSites.map((feature, idx) => {
          const [lng, lat] = feature.geometry.coordinates;
          return (
            <Marker key={`health-${idx}`} position={[lat, lng]} icon={BlueIcon}>
              <Popup>
                <div style={{ fontSize: "13px" }}>
                  <strong>{feature.properties.name}</strong><br/>
                  Type: {feature.properties.amenity || feature.properties.healthcare || "Health Site"}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  )
}

export default App
