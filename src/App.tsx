import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Fix for default marker icon in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom red icon for higher severity or casualties
const RedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

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

  return (
    <div id="map-wrapper" style={{ height: "100vh", width: "100%" }}>
      <div style={{ 
        position: "absolute", 
        zIndex: 1000, 
        top: 10, 
        left: 50, 
        background: "rgba(255,255,255,0.9)", 
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ margin: 0 }}>Indonesia Flood Archive</h2>
        <p style={{ margin: "5px 0 0" }}>Showing {floodData?.features.length || 0} historic events</p>
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
          // Simple validation to prevent rendering markers far outside Indonesia (like the outlier found earlier)
          if (lng < 90 || lng > 150 || lat < -15 || lat > 15) return null;

          return (
            <Marker 
              key={idx} 
              position={[lat, lng]}
              icon={feature.properties.dead > 50 ? RedIcon : DefaultIcon}
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
