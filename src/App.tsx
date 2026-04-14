import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'

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

function App() {
  const position: [number, number] = [51.505, -0.09]

  useEffect(() => {
    console.log("App component mounted - React is running.");
  }, []);

  return (
    <div id="map-wrapper" style={{ background: "#eee", height: "100vh", width: "100%" }}>
      <div style={{ position: "absolute", zIndex: 1000, top: 10, left: 10, background: "white", padding: "5px" }}>
        React is Running - Checking Map...
      </div>
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
        whenReady={() => console.log("Leaflet map is ready.")}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            London <br /> The capital of England.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default App

