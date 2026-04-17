import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'

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

interface FloodGeoJSON {
  type: string;
  features: FloodFeature[];
}

function App() {
  const [floodData, setFloodData] = useState<FloodGeoJSON | null>(null);
  const position: [number, number] = [-2.5489, 118.0149] // Centered on Indonesia

  useEffect(() => {
    fetch('./indonesia_floods.geojson')
      .then(response => response.json())
      .then(data => {
        setFloodData(data);
        console.log(`Loaded ${data.features.length} flood events.`);
      })
      .catch(error => console.error('Error loading geojson:', error));
  }, []);

  const getIcon = (severity: number) => {
    if (severity >= 2.0) return RedIcon;
    if (severity >= 1.5) return GoldIcon;
    return GreenIcon;
  };

  return (
    <div id="map-wrapper" style={{ height: "100vh", width: "100%" }}>
      {/* Title and Info Panel */}
      <div style={{ 
        position: "absolute", 
        zIndex: 1000, 
        top: 10, 
        left: 50, 
        background: "rgba(255,255,255,0.9)", 
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        maxWidth: "250px"
      }}>
        <h2 style={{ margin: 0, fontSize: "18px" }}>Indonesia Flood Archive</h2>
        <p style={{ margin: "5px 0 10px", fontSize: "14px" }}>Showing {floodData?.features.length || 0} historic events</p>
        
        <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <strong style={{ fontSize: "13px" }}>Severity Legend:</strong>
          <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <span style={{ width: "12px", height: "12px", backgroundColor: "#2fb344", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span>
            <span style={{ fontSize: "12px" }}>1.0 (Minor)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
            <span style={{ width: "12px", height: "12px", backgroundColor: "#e8a800", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span>
            <span style={{ fontSize: "12px" }}>1.5 (Moderate)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
            <span style={{ width: "12px", height: "12px", backgroundColor: "#cb2b3e", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span>
            <span style={{ fontSize: "12px" }}>2.0 (Major)</span>
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
        
        {floodData?.features.map((feature, idx) => {
          const [lng, lat] = feature.geometry.coordinates;
          if (lng < 90 || lng > 150 || lat < -15 || lat > 15) return null;

          return (
            <Marker 
              key={idx} 
              position={[lat, lng]}
              icon={getIcon(feature.properties.severity)}
            >
              <Popup>
                <div style={{ fontSize: "14px" }}>
                  <strong>Date:</strong> {feature.properties.began}<br/>
                  <strong>Cause:</strong> {feature.properties.cause}<br/>
                  <strong>Deaths:</strong> {feature.properties.dead}<br/>
                  <strong>Severity:</strong> {feature.properties.severity}
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
