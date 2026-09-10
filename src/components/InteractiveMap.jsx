import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Flame, 
  Waves, 
  Car, 
  Zap, 
  Wind, 
  Hospital, 
  Home, 
  Layers, 
  Eye, 
  Navigation,
  Shield,
  Ambulance,
  Video,
  Globe
} from 'lucide-react';

// Helper component to smoothly center map when selected
function MapController({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 14, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

// Icon generator for dynamic HTML div icons
function createCustomDivIcon(emoji, bgClass, pulseClass = "") {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative flex items-center justify-center">
        ${pulseClass ? `<div class="${pulseClass} absolute inset-0 rounded-full"></div>` : ''}
        <div class="relative w-8 h-8 rounded-full ${bgClass} flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/40 backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
          ${emoji}
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
}

export default function InteractiveMap({ 
  incidents, 
  hospitals, 
  shelters, 
  zones, 
  selectedIncident, 
  onSelectIncident,
  onDispatchUnit,
  onSelectDroneSector,
  customOverlay
}) {
  const [showIncidents, setShowIncidents] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [mapTileStyle, setMapTileStyle] = useState('dark');

  // Center default (Pan-India)
  const defaultCenter = [22.5937, 78.9629];

  const getIncidentEmoji = (type) => {
    switch (type) {
      case 'fire': return '🔥';
      case 'flood': return '🌊';
      case 'accident': return '🚗';
      case 'storm': return '🌪️';
      case 'earthquake': return '💥';
      case 'volcano': return '🌋';
      case 'landslide': return '⛰️';
      case 'blizzard': return '❄️';
      case 'thunderstorm': return '⚡';
      case 'tsunami': return '🌊';
      case 'drought': return '🌾';
      default: return '⚠️';
    }
  };

  const getIncidentIcon = (incident) => {
    const emoji = getIncidentEmoji(incident.type);
    if (incident.severity === 'CRITICAL') {
      return createCustomDivIcon(emoji, 'bg-red-600', 'marker-pulse-critical');
    } else if (incident.severity === 'HIGH') {
      return createCustomDivIcon(emoji, 'bg-amber-600', 'marker-pulse-high');
    }
    return createCustomDivIcon(emoji, 'bg-cyan-600');
  };

  const hospitalIcon = createCustomDivIcon('🏥', 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]');
  const shelterIcon = createCustomDivIcon('⛺', 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]');

  // Completely Free, Open-Access World Map Tiles (NO API Keys Required, No Watermarks)
  const mapTiles = {
    dark: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; Esri, HERE, Garmin, USGS, NGA, EPA, USDA, NPS'
    },
    political: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong)'
    },
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; OpenStreetMap contributors'
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN'
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-cyan-500/20 shadow-2xl">
      
      {/* Map Control Floating Toolbar */}
      <div className="absolute top-4 right-4 z-[1000] bg-slate-900/95 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 shadow-xl flex flex-col gap-2 font-mono text-xs max-w-[210px]">
        <div className="text-[10px] font-hud text-slate-400 font-bold tracking-widest px-1 flex items-center gap-1 border-b border-slate-800 pb-1">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> TACTICAL LAYERS
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input 
            type="checkbox" 
            checked={showIncidents} 
            onChange={(e) => setShowIncidents(e.target.checked)}
            className="accent-red-500 rounded" 
          />
          <span className="flex items-center gap-1">🚨 Disasters ({incidents.length})</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input 
            type="checkbox" 
            checked={showHospitals} 
            onChange={(e) => setShowHospitals(e.target.checked)}
            className="accent-cyan-500 rounded" 
          />
          <span className="flex items-center gap-1">🏥 Hospitals ({hospitals.length})</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input 
            type="checkbox" 
            checked={showShelters} 
            onChange={(e) => setShowShelters(e.target.checked)}
            className="accent-emerald-500 rounded" 
          />
          <span className="flex items-center gap-1">⛺ Shelters ({shelters.length})</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input 
            type="checkbox" 
            checked={showZones} 
            onChange={(e) => setShowZones(e.target.checked)}
            className="accent-purple-500 rounded" 
          />
          <span className="flex items-center gap-1">🛡️ Threat Polygons</span>
        </label>

        {/* Map Basemap Style Selector */}
        <div className="border-t border-slate-800 pt-2 mt-1 space-y-1">
          <span className="text-[10px] text-slate-400 font-hud font-bold block flex items-center gap-1">
            <Globe className="w-3 h-3 text-cyan-400" /> BASEMAP STYLE:
          </span>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setMapTileStyle('dark')}
              className={`px-2 py-1 rounded text-[10px] font-bold text-center transition-all ${
                mapTileStyle === 'dark' ? 'bg-cyan-600 text-white shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              DARK TACTICAL
            </button>

            <button
              onClick={() => setMapTileStyle('political')}
              className={`px-2 py-1 rounded text-[10px] font-bold text-center transition-all ${
                mapTileStyle === 'political' ? 'bg-cyan-600 text-white shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              WORLD STREETS
            </button>

            <button
              onClick={() => setMapTileStyle('osm')}
              className={`px-2 py-1 rounded text-[10px] font-bold text-center transition-all ${
                mapTileStyle === 'osm' ? 'bg-cyan-600 text-white shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              POLITICAL OSM
            </button>

            <button
              onClick={() => setMapTileStyle('satellite')}
              className={`px-2 py-1 rounded text-[10px] font-bold text-center transition-all ${
                mapTileStyle === 'satellite' ? 'bg-cyan-600 text-white shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              SATELLITE
            </button>
          </div>
        </div>
      </div>

      {/* Main Leaflet Map */}
      <MapContainer 
        center={defaultCenter} 
        zoom={5} 
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', minHeight: '520px' }}
      >
        <MapController 
          center={selectedIncident ? [selectedIncident.lat, selectedIncident.lng] : null} 
          zoom={13}
        />

        <TileLayer
          attribution={mapTiles[mapTileStyle].attribution}
          url={mapTiles[mapTileStyle].url}
        />

        {/* Dynamic Computer Vision / Satellite Image Overlay */}
        {customOverlay && customOverlay.detections && (
          customOverlay.detections.filter(d => d.coords).map((d, i) => (
            <Polygon
              key={`cv-poly-${i}`}
              positions={d.coords}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.4,
                weight: 3,
                dashArray: '4, 4'
              }}
            >
              <Popup>
                <div className="p-1 font-mono text-xs text-red-400 font-bold">
                  🛰️ CV DETECTED HAZARD: {d.type} ({d.count})
                </div>
              </Popup>
            </Polygon>
          ))
        )}

        {/* Affected Zones Polygons */}
        {showZones && zones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color: zone.color,
              fillColor: zone.fillColor,
              fillOpacity: zone.fillOpacity,
              weight: 2,
              dashArray: '6, 6'
            }}
          >
            <Popup>
              <div className="p-1 font-mono text-xs">
                <div className="font-hud font-bold text-sm" style={{ color: zone.color }}>
                  {zone.name}
                </div>
                <div className="text-slate-300 mt-1">Status: {zone.severity} HAZARD</div>
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Emergency Incidents */}
        {showIncidents && incidents.map((incident) => (
          <React.Fragment key={incident.id}>
            <Marker 
              position={[incident.lat, incident.lng]} 
              icon={getIncidentIcon(incident)}
              eventHandlers={{
                click: () => onSelectIncident(incident)
              }}
            >
              <Popup>
                <div className="p-1 min-w-[220px]">
                  <div className="flex items-center justify-between gap-2 border-b border-cyan-500/30 pb-1 mb-1.5">
                    <span className={`badge ${
                      incident.severity === 'CRITICAL' ? 'badge-critical' :
                      incident.severity === 'HIGH' ? 'badge-high' : 'badge-moderate'
                    }`}>
                      {incident.severity}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{incident.timestamp}</span>
                  </div>

                  <h3 className="font-hud font-bold text-sm text-cyan-300 leading-snug">
                    {incident.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">{incident.summary}</p>
                  
                  <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Impacted: <strong className="text-white">{incident.affectedPeople.toLocaleString()}</strong></span>
                    <span>Units: <strong className="text-cyan-400">{incident.unitsAssigned.length}</strong></span>
                  </div>

                  {/* Actions inside map popup */}
                  <div className="mt-3 flex flex-col gap-1.5 border-t border-slate-700/60 pt-2">
                    <button
                      onClick={() => onDispatchUnit(incident)}
                      className="w-full py-1 px-2 rounded bg-red-600/90 hover:bg-red-500 text-white font-hud text-xs font-bold flex items-center justify-center gap-1 shadow"
                    >
                      <Ambulance className="w-3.5 h-3.5" /> DISPATCH RESCUE TEAM
                    </button>
                    <button
                      onClick={() => onSelectDroneSector(incident.location)}
                      className="w-full py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-hud text-xs flex items-center justify-center gap-1 border border-slate-700"
                    >
                      <Video className="w-3.5 h-3.5" /> DRONE FEEDS
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Impact Radius Circle */}
            <Circle 
              center={[incident.lat, incident.lng]}
              radius={incident.radiusMeters || 1000}
              pathOptions={{
                color: incident.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b',
                fillColor: incident.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b',
                fillOpacity: 0.1,
                weight: 1
              }}
            />
          </React.Fragment>
        ))}

        {/* Hospitals */}
        {showHospitals && hospitals.map((hospital) => (
          <Marker 
            key={hospital.id}
            position={[hospital.lat, hospital.lng]}
            icon={hospitalIcon}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center gap-1 font-hud font-bold text-sm text-cyan-400 border-b border-slate-700 pb-1 mb-1">
                  <Hospital className="w-4 h-4 text-cyan-400" />
                  {hospital.name}
                </div>
                <div className="text-xs space-y-1 font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span>ICU Occupancy:</span>
                    <span className="font-bold text-cyan-300">{hospital.icuOccupied}/{hospital.icuTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ER Capacity:</span>
                    <span className="font-bold text-amber-300">{hospital.erOccupied}/{hospital.erTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ambulances:</span>
                    <span className="font-bold text-emerald-400">{hospital.ambulancesAvailable} Ready</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Helipad:</span>
                    <span className="text-emerald-400 font-bold">{hospital.helipad}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Shelters */}
        {showShelters && shelters.map((shelter) => (
          <Marker 
            key={shelter.id}
            position={[shelter.lat, shelter.lng]}
            icon={shelterIcon}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center gap-1 font-hud font-bold text-sm text-emerald-400 border-b border-slate-700 pb-1 mb-1">
                  <Home className="w-4 h-4 text-emerald-400" />
                  {shelter.name}
                </div>
                <div className="text-xs space-y-1 font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span>Occupancy:</span>
                    <span className="font-bold text-emerald-300">{shelter.occupied}/{shelter.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Supplies:</span>
                    <span className="font-bold text-cyan-300">{shelter.suppliesPct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Power Grid:</span>
                    <span className="font-bold text-amber-300">{shelter.powerStatus}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>

      {/* Radar Overlay Watermark */}
      <div className="absolute bottom-3 left-3 z-[1000] pointer-events-none flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 font-mono text-[10px] text-slate-400 backdrop-blur">
        <div className="w-2.5 h-2.5 rounded-full border border-cyan-400 flex items-center justify-center">
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        </div>
        PAN-INDIA & GLOBAL NATURAL DISASTER MATRIX ACTIVE
      </div>

    </div>
  );
}
