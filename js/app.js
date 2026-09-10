/* ==========================================================================
   DIGITAL CRISIS COMMAND CENTER - ULTIMATE LOGIC ENGINE
   ========================================================================== */

const API_BASE = 'http://localhost:5000/api';

// Global App State
let soundEnabled = true;
let activeNavTab = 'dashboard';
let riskZonesVisible = true;
let activeIncidentFilter = 'all';
let currentSelectedIncidentId = 'inc-9042';

// Leaflet Map Handles
let dashboardMap = null;
let fullMap = null;
let modalMap = null;
let routeMap = null;

// Layer Groups
let incLayerGroup = null;
let hospLayerGroup = null;
let shlLayerGroup = null;
let riskZoneLayerGroup = null;
let routeBlockedPolyline = null;
let routeRecommendedPolyline = null;

// Default City Coordinates (Visakhapatnam, AP)
const CITY_CENTER = [17.6868, 83.2185];

// Risk Polygons (Visakhapatnam Zones)
const RISK_ZONES_GEO = [
  {
    name: "Industrial Fire Hazard Zone",
    color: "#ef4444",
    coords: [
      [17.710, 83.220],
      [17.725, 83.245],
      [17.700, 83.260],
      [17.690, 83.230]
    ]
  },
  {
    name: "East Zone Flood Inundation Sector",
    color: "#06b6d4",
    colorFill: "#06b6d4",
    coords: [
      [17.675, 83.260],
      [17.685, 83.295],
      [17.655, 83.300],
      [17.650, 83.270]
    ]
  },
  {
    name: "NH16 Highway Traffic Exclusion Zone",
    color: "#f59e0b",
    coords: [
      [17.660, 83.190],
      [17.670, 83.210],
      [17.650, 83.225],
      [17.640, 83.205]
    ]
  }
];

// In-Memory Crisis Collections
let incidents = [
  {
    id: "INC-9042",
    title: "Fire at Industrial Area",
    type: "fire",
    severity: "CRITICAL",
    riskScore: 95,
    placeName: "Visakhapatnam, East Zone",
    lat: 17.7120,
    lng: 83.2350,
    date: "Sep 9, 2025",
    timestamp: "14:25",
    summary: "Fire has broken out in the chemical warehouse. Smoke visible from 2 km. Possible risk of explosion.",
    affected: 250,
    nearestHosp: "2.4 km",
    eta: "12 mins",
    reportedBy: "Citizen",
    status: "ACTIVE"
  },
  {
    id: "INC-8931",
    title: "Flooding in East Zone",
    type: "flood",
    severity: "HIGH",
    riskScore: 88,
    placeName: "Visakhapatnam, Low-Lying Delta",
    lat: 17.6650,
    lng: 83.2850,
    date: "Sep 9, 2025",
    timestamp: "14:20",
    summary: "Water level rising +2.8m above crest. Evacuate low lying areas immediately.",
    affected: 4500,
    nearestHosp: "1.8 km",
    eta: "8 mins",
    reportedBy: "Sensor B-04",
    status: "ACTIVE"
  },
  {
    id: "INC-8812",
    title: "Road Accident – NH16",
    type: "accident",
    severity: "MEDIUM",
    riskScore: 68,
    placeName: "NH16 Highway Interchange",
    lat: 17.6550,
    lng: 83.2050,
    date: "Sep 9, 2025",
    timestamp: "12:30",
    summary: "2 vehicles involved in collision. Traffic slowdown. Ambulance dispatched.",
    affected: 12,
    nearestHosp: "5.2 km",
    eta: "11 mins",
    reportedBy: "Traffic Police",
    status: "ACTIVE"
  },
  {
    id: "INC-8740",
    title: "Gas Leak Reported",
    type: "gas",
    severity: "MEDIUM",
    riskScore: 62,
    placeName: "Sector 4 Industrial Park",
    lat: 17.6820,
    lng: 83.2150,
    date: "Sep 9, 2025",
    timestamp: "11:45",
    summary: "Minor ammonia leak detected at cold storage facility. Hazmat team inspecting.",
    affected: 80,
    nearestHosp: "3.1 km",
    eta: "15 mins",
    reportedBy: "IoT Sensor",
    status: "CONTAINED"
  }
];

let hospitals = [
  { id: "HOSP-01", name: "City General Hospital", placeName: "Central Visakhapatnam", lat: 17.7050, lng: 83.2150, icuOccupied: 45, icuTotal: 70, bedsAvailable: 35, status: "OPERATIONAL" },
  { id: "HOSP-02", name: "Apollo Emergency Center", placeName: "East Coast Zone", lat: 17.6800, lng: 83.2550, icuOccupied: 40, icuTotal: 60, bedsAvailable: 20, status: "BUSY" },
  { id: "HOSP-03", name: "Apex Trauma Care", placeName: "NH16 Junction", lat: 17.6450, lng: 83.1950, icuOccupied: 28, icuTotal: 30, bedsAvailable: 2, status: "CRITICAL_CAPACITY" }
];

let shelters = [
  { id: "SHL-01", name: "Government School Shelter", placeName: "West Zone Hub", lat: 17.6950, lng: 83.1850, occupied: 180, capacity: 500, status: "READY" },
  { id: "SHL-02", name: "Civic Indoor Sports Arena", placeName: "Harbor Promenade", lat: 17.6400, lng: 83.2750, occupied: 320, capacity: 600, status: "OPERATIONAL" }
];

let fleet = [
  { type: "Ambulances", ready: 12, total: 20 },
  { type: "Hospital Beds", ready: 45, total: 70 },
  { type: "Rescue Teams", ready: 5, total: 8 },
  { type: "Shelters", ready: 8, total: 10 },
  { type: "Food Kits", ready: 1200, total: 2000 }
];

let timeline = [
  { id: "EVT-1", time: "14:20", title: "Flooding reported in East Zone", description: "Water level rising, rescue teams dispatched.", type: "critical" },
  { id: "EVT-2", time: "13:45", title: "Fire incident at Lakshmi Nagar", description: "Fire under control. No casualties reported.", type: "warning" },
  { id: "EVT-3", time: "12:30", title: "Road accident on NH16", description: "2 vehicles involved. Ambulance on the way.", type: "info" },
  { id: "EVT-4", time: "11:15", title: "Heavy rain alert issued", description: "IMD issued orange alert for next 6 hours.", type: "warning" },
  { id: "EVT-5", time: "10:05", title: "Shelter opened in West Zone", description: "For 200+ affected residents.", type: "success" }
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initDashboardMap();
  renderAlertsList();
  renderResourceBars();
  renderTimelineDashboard();
  renderIncidentsTable();
  renderResourcesTable();
  renderReportsTimeline();
  fetchDataFromPythonBackend();

  // 5s periodic background sync
  setInterval(fetchDataFromPythonBackend, 5000);
});

// Sync with Python API
async function fetchDataFromPythonBackend() {
  try {
    const [incRes, hospRes, shlRes, fleetRes, timelineRes] = await Promise.all([
      fetch(`${API_BASE}/incidents`),
      fetch(`${API_BASE}/hospitals`),
      fetch(`${API_BASE}/shelters`),
      fetch(`${API_BASE}/fleet`),
      fetch(`${API_BASE}/timeline`)
    ]);

    if (incRes.ok) incidents = await incRes.json();
    if (hospRes.ok) hospitals = await hospRes.json();
    if (shlRes.ok) shelters = await shlRes.json();
    if (fleetRes.ok) fleet = await fleetRes.json();
    if (timelineRes.ok) timeline = await timelineRes.json();

  } catch (err) {
    console.warn("Python Backend Sync (Fallback active):", err);
  } finally {
    renderAlertsList();
    renderResourceBars();
    renderTimelineDashboard();
    renderIncidentsTable();
    renderLeafletMarkers();
  }
}

// Navigation Tab Switcher
function switchNavTab(tabName) {
  activeNavTab = tabName;

  const views = ['dashboard', 'live-map', 'incidents', 'alerts', 'resources', 'route-optimization', 'iot-sensors', 'reports', 'settings'];
  views.forEach(v => {
    const sec = document.getElementById(`view-${v}`);
    const navBtn = document.getElementById(`nav-${v}`);
    if (sec) {
      if (v === tabName) {
        sec.classList.remove('hidden');
        sec.classList.add('flex');
      } else {
        sec.classList.add('hidden');
        sec.classList.remove('flex');
      }
    }
    if (navBtn) {
      if (v === tabName) {
        navBtn.className = "w-full text-left px-3.5 py-2.5 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-between shadow-lg shadow-blue-600/30 transition";
      } else {
        navBtn.className = "w-full text-left px-3.5 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 flex items-center justify-between font-semibold transition";
      }
    }
  });

  // Re-fit Leaflet maps when displayed
  setTimeout(() => {
    if (tabName === 'dashboard' && dashboardMap) dashboardMap.invalidateSize();
    if (tabName === 'live-map') {
      initFullMap();
      if (fullMap) fullMap.invalidateSize();
    }
    if (tabName === 'route-optimization') {
      initRouteMap();
      if (routeMap) routeMap.invalidateSize();
    }
  }, 100);
}

// PRIMARY DASHBOARD MAP
function initDashboardMap() {
  const container = document.getElementById('leaflet-map-div');
  if (!container || dashboardMap) return;

  dashboardMap = L.map('leaflet-map-div', { zoomControl: false }).setView(CITY_CENTER, 12);

  // Esri Dark Canvas
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, Garmin, USGS',
    maxZoom: 19
  }).addTo(dashboardMap);

  incLayerGroup = L.layerGroup().addTo(dashboardMap);
  hospLayerGroup = L.layerGroup().addTo(dashboardMap);
  shlLayerGroup = L.layerGroup().addTo(dashboardMap);
  riskZoneLayerGroup = L.layerGroup().addTo(dashboardMap);

  renderRiskZones();
  renderLeafletMarkers();
}

function renderRiskZones() {
  if (!dashboardMap || !riskZoneLayerGroup) return;
  riskZoneLayerGroup.clearLayers();

  if (!riskZonesVisible) return;

  RISK_ZONES_GEO.forEach(zone => {
    L.polygon(zone.coords, {
      color: zone.color,
      fillColor: zone.colorFill || zone.color,
      fillOpacity: 0.25,
      weight: 2
    }).addTo(riskZoneLayerGroup).bindTooltip(zone.name, { sticky: true });
  });
}

function renderLeafletMarkers() {
  if (!dashboardMap) return;

  incLayerGroup.clearLayers();
  hospLayerGroup.clearLayers();
  shlLayerGroup.clearLayers();

  // Render Incidents
  incidents.forEach(inc => {
    if (activeIncidentFilter !== 'all' && inc.type !== activeIncidentFilter) return;

    const emoji = inc.type === 'fire' ? '🔥' : inc.type === 'flood' ? '🌊' : inc.type === 'accident' ? '🚗' : '🟡';
    const bgClass = inc.severity === 'CRITICAL' ? 'bg-red-600 pulse-red' : inc.severity === 'HIGH' ? 'bg-orange-600' : 'bg-amber-600';

    const icon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div onclick="openIncidentDetailsModal('${inc.id}')" class="w-9 h-9 rounded-full ${bgClass} flex items-center justify-center text-white text-base font-bold shadow-xl border border-white/50 cursor-pointer hover:scale-110 transition">
          ${emoji}
        </div>
      `,
      iconSize: [36, 36], iconAnchor: [18, 18]
    });

    L.marker([inc.lat, inc.lng], { icon }).addTo(incLayerGroup).bindPopup(`
      <div class="p-1 font-mono text-xs">
        <div class="text-red-400 font-bold text-[10px]">${inc.severity} SEVERITY</div>
        <h4 class="font-hud font-bold text-sm text-cyan-300 mt-0.5">${inc.title}</h4>
        <div class="text-white text-[11px] mt-1">📍 ${inc.placeName}</div>
        <div class="text-slate-400 text-[10px] mt-0.5">Impact: ~${inc.affected} people</div>
        <button onclick="openIncidentDetailsModal('${inc.id}')" class="mt-2 w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px]">
          View Full AI Analysis →
        </button>
      </div>
    `);
  });

  // Hospitals (H Icon)
  hospitals.forEach(h => {
    const icon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg border border-white">
          H
        </div>
      `,
      iconSize: [32, 32], iconAnchor: [16, 16]
    });
    L.marker([h.lat, h.lng], { icon }).addTo(hospLayerGroup).bindPopup(`
      <div class="p-1 font-mono text-xs">
        <div class="font-hud font-bold text-sm text-blue-300">🏥 ${h.name}</div>
        <div class="text-slate-300 text-[10px] mt-1">📍 ${h.placeName}</div>
        <div class="text-emerald-400 font-bold mt-1">${h.bedsAvailable} Beds Available</div>
      </div>
    `);
  });

  // Shelters (House Icon)
  shelters.forEach(s => {
    const icon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm shadow-lg border border-white">
          🏠
        </div>
      `,
      iconSize: [32, 32], iconAnchor: [16, 16]
    });
    L.marker([s.lat, s.lng], { icon }).addTo(shlLayerGroup).bindPopup(`
      <div class="p-1 font-mono text-xs">
        <div class="font-hud font-bold text-sm text-emerald-300">🏠 ${s.name}</div>
        <div class="text-slate-300 text-[10px] mt-1">Occupancy: ${s.occupied} / ${s.capacity}</div>
      </div>
    `);
  });
}

// FULL MAP VIEW
function initFullMap() {
  const container = document.getElementById('full-map-div');
  if (!container || fullMap) return;

  fullMap = L.map('full-map-div').setView(CITY_CENTER, 13);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, Garmin, USGS',
    maxZoom: 19
  }).addTo(fullMap);

  const fullIncGroup = L.layerGroup().addTo(fullMap);
  incidents.forEach(inc => {
    const emoji = inc.type === 'fire' ? '🔥' : inc.type === 'flood' ? '🌊' : '🚗';
    const icon = L.divIcon({
      html: `<div onclick="openIncidentDetailsModal('${inc.id}')" class="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold cursor-pointer shadow-xl">${emoji}</div>`,
      iconSize: [36, 36], iconAnchor: [18, 18]
    });
    L.marker([inc.lat, inc.lng], { icon }).addTo(fullIncGroup);
  });
}

// ROUTE MAP VIEW (MATCHING SCREENSHOT 2 BOTTOM-LEFT)
function initRouteMap() {
  const container = document.getElementById('route-map-div');
  if (!container || routeMap) return;

  routeMap = L.map('route-map-div').setView([17.6750, 83.2100], 13);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, Garmin, USGS',
    maxZoom: 19
  }).addTo(routeMap);

  computeAiRoute();
}

function computeAiRoute() {
  if (!routeMap) return;

  if (routeBlockedPolyline) routeMap.removeLayer(routeBlockedPolyline);
  if (routeRecommendedPolyline) routeMap.removeLayer(routeRecommendedPolyline);

  // Blocked Route (Red Line)
  const blockedPoints = [
    [17.6550, 83.2050],
    [17.6650, 83.2200],
    [17.6850, 83.2350],
    [17.7050, 83.2150]
  ];

  // Recommended Clear Route (Cyan Line)
  const recommendedPoints = [
    [17.6550, 83.2050],
    [17.6500, 83.1850],
    [17.6800, 83.1900],
    [17.7050, 83.2150]
  ];

  routeBlockedPolyline = L.polyline(blockedPoints, { color: '#ef4444', weight: 4, dashArray: '6, 6' }).addTo(routeMap);
  routeRecommendedPolyline = L.polyline(recommendedPoints, { color: '#06b6d4', weight: 5 }).addTo(routeMap);

  // Markers
  L.marker([17.6550, 83.2050], {
    icon: L.divIcon({ html: '<div class="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">🚗</div>' })
  }).addTo(routeMap).bindPopup("Accident Location (NH16)");

  L.marker([17.7050, 83.2150], {
    icon: L.divIcon({ html: '<div class="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center">H</div>' })
  }).addTo(routeMap).bindPopup("City General Hospital");

  routeMap.fitBounds(routeRecommendedPolyline.getBounds().pad(0.2));
  showToast("AI Recommended Fastest Route Calculated (Avoiding Flooding)", "success");
}

// RENDERERS
function renderAlertsList() {
  const container = document.getElementById('alert-feed-list');
  const fullContainer = document.getElementById('full-alerts-list');
  if (!container) return;

  const html = incidents.map(inc => `
    <div onclick="openIncidentDetailsModal('${inc.id}')" class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between transition">
      <div class="flex items-center gap-2.5">
        <span class="w-7 h-7 rounded-lg ${inc.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-500/40' : inc.severity === 'HIGH' ? 'bg-orange-950 text-orange-400 border border-orange-500/40' : 'bg-amber-950 text-amber-400 border border-amber-500/40'} flex items-center justify-center text-xs font-bold">
          ${inc.type === 'fire' ? '🔥' : inc.type === 'flood' ? '🌊' : '🚗'}
        </span>
        <div>
          <div class="font-hud font-bold text-white text-xs">${inc.title}</div>
          <div class="text-[10px] text-slate-400">${inc.severity} • ${inc.nearestHosp} away • ${inc.timestamp}</div>
        </div>
      </div>
      <span class="text-slate-500 text-xs">›</span>
    </div>
  `).join('');

  container.innerHTML = html;
  if (fullContainer) fullContainer.innerHTML = html;
}

function renderResourceBars() {
  const container = document.getElementById('dashboard-resource-bars');
  if (!container) return;

  container.innerHTML = fleet.map(f => {
    const pct = Math.round((f.ready / f.total) * 100);
    return `
      <div>
        <div class="flex justify-between text-[11px] mb-1">
          <span class="text-slate-300 font-bold">${f.type}</span>
          <span class="text-slate-400 font-mono">${f.ready} Available / ${f.total} Total</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill ${pct > 60 ? 'bg-emerald-500' : pct > 30 ? 'bg-cyan-500' : 'bg-red-500'}" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderTimelineDashboard() {
  const container = document.getElementById('timeline-list-dashboard');
  if (!container) return;

  container.innerHTML = timeline.map(t => `
    <div class="flex items-start gap-2.5 p-1.5 text-xs">
      <span class="w-2 h-2 rounded-full ${t.type === 'critical' ? 'bg-red-500' : t.type === 'warning' ? 'bg-amber-500' : 'bg-cyan-500'} mt-1.5"></span>
      <div>
        <div class="font-bold text-slate-200">${t.time} — ${t.title}</div>
        <div class="text-[10px] text-slate-400">${t.description}</div>
      </div>
    </div>
  `).join('');
}

function renderIncidentsTable() {
  const container = document.getElementById('incidents-table-container');
  if (!container) return;

  container.innerHTML = `
    <table class="w-full text-left font-mono text-xs border-collapse">
      <thead>
        <tr class="border-b border-slate-800 text-slate-400 font-hud">
          <th class="py-2.5 px-3">INCIDENT</th>
          <th class="py-2.5 px-3">SEVERITY</th>
          <th class="py-2.5 px-3">LOCATION</th>
          <th class="py-2.5 px-3">AFFECTED</th>
          <th class="py-2.5 px-3">NEAREST HOSP</th>
          <th class="py-2.5 px-3">ACTION</th>
        </tr>
      </thead>
      <tbody>
        ${incidents.map(inc => `
          <tr class="border-b border-slate-900 hover:bg-slate-900/60">
            <td class="py-2.5 px-3 font-bold text-white">${inc.id}: ${inc.title}</td>
            <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${inc.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-500/40' : 'bg-amber-950 text-amber-400'}">${inc.severity} (${inc.riskScore}/100)</span></td>
            <td class="py-2.5 px-3 text-slate-300">${inc.placeName}</td>
            <td class="py-2.5 px-3 text-white">~${inc.affected}</td>
            <td class="py-2.5 px-3 text-cyan-400">${inc.nearestHosp}</td>
            <td class="py-2.5 px-3">
              <button onclick="openIncidentDetailsModal('${inc.id}')" class="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px]">Inspect Details</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderResourcesTable() {
  const container = document.getElementById('resources-full-table');
  if (!container) return;

  container.innerHTML = `
    <table class="w-full text-left font-mono text-xs border-collapse">
      <thead>
        <tr class="border-b border-slate-800 text-slate-400 font-hud">
          <th class="py-2.5 px-3">RESOURCE</th>
          <th class="py-2.5 px-3">AVAILABLE</th>
          <th class="py-2.5 px-3">REQUIRED</th>
          <th class="py-2.5 px-3">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-slate-900">
          <td class="py-2.5 px-3 text-white font-bold">🚑 Ambulances</td>
          <td class="py-2.5 px-3 text-white">12</td>
          <td class="py-2.5 px-3 text-slate-400">20</td>
          <td class="py-2.5 px-3 text-red-400 font-bold">⚠️ Shortage Detected</td>
        </tr>
        <tr class="border-b border-slate-900">
          <td class="py-2.5 px-3 text-white font-bold">🏥 Hospital Beds</td>
          <td class="py-2.5 px-3 text-white">45</td>
          <td class="py-2.5 px-3 text-slate-400">70</td>
          <td class="py-2.5 px-3 text-red-400 font-bold">⚠️ Shortage Detected</td>
        </tr>
        <tr class="border-b border-slate-900">
          <td class="py-2.5 px-3 text-white font-bold">👨‍🚒 Rescue Teams</td>
          <td class="py-2.5 px-3 text-white">5</td>
          <td class="py-2.5 px-3 text-slate-400">8</td>
          <td class="py-2.5 px-3 text-amber-400 font-bold">⚠️ High Demand</td>
        </tr>
        <tr class="border-b border-slate-900">
          <td class="py-2.5 px-3 text-white font-bold">⛺ Shelters</td>
          <td class="py-2.5 px-3 text-white">8</td>
          <td class="py-2.5 px-3 text-slate-400">10</td>
          <td class="py-2.5 px-3 text-emerald-400 font-bold">✅ Adequate</td>
        </tr>
      </tbody>
    </table>
  `;
}

function renderReportsTimeline() {
  const container = document.getElementById('reports-timeline-full');
  if (!container) return;

  container.innerHTML = timeline.map(t => `
    <div class="relative">
      <span class="absolute -left-[21px] top-1 w-3 h-3 rounded-full ${t.type === 'critical' ? 'bg-red-500' : 'bg-cyan-500'}"></span>
      <div class="font-bold text-white">${t.time} — ${t.title}</div>
      <div class="text-slate-400 text-[11px]">${t.description}</div>
    </div>
  `).join('');
}

// AI SEVERITY PREDICTOR SIMULATOR
function runAiSeverityPrediction() {
  const type = document.getElementById('ml-type').value;
  const p1 = parseFloat(document.getElementById('ml-param1').value) || 2.8;
  const p2 = parseInt(document.getElementById('ml-param2').value) || 4500;

  let risk = Math.min(99, Math.round((p1 * 15) + (p2 / 100)));
  let category = risk > 85 ? "CRITICAL" : risk > 65 ? "HIGH" : "MEDIUM";

  const resDiv = document.getElementById('ai-pred-result');
  resDiv.classList.remove('hidden');
  resDiv.innerHTML = `
    🤖 AI ML Model Prediction: <strong>${type.toUpperCase()} – ${category}</strong> | Calculated Risk Score: <strong>${risk}/100</strong><br/>
    <span class="text-slate-300 font-normal">Recommended Response: Immediate Evacuation of Sector & Dispatch 2 Ambulances to Nearest Trauma Center.</span>
  `;

  showToast(`AI Severity Score Predicted: ${risk}/100 (${category})`, "critical");
}

// MODAL INSPECTOR (MATCHING SCREENSHOT 2 TOP-RIGHT)
function openIncidentDetailsModal(incId) {
  const inc = incidents.find(i => i.id === incId) || incidents[0];
  currentSelectedIncidentId = inc.id;

  document.getElementById('detail-title').textContent = inc.title;
  document.getElementById('detail-location').textContent = inc.placeName;
  document.getElementById('detail-time').textContent = inc.timestamp;
  document.getElementById('detail-desc').textContent = inc.summary;
  document.getElementById('detail-affected').textContent = `~ ${inc.affected}`;
  document.getElementById('detail-hosp').textContent = inc.nearestHosp;
  document.getElementById('detail-eta').textContent = inc.eta;

  const badge = document.getElementById('detail-sev-badge');
  if (badge) badge.textContent = `${inc.severity} SEVERITY (${inc.riskScore}/100)`;

  document.getElementById('modal-incident-details').classList.remove('hidden');
  document.getElementById('modal-incident-details').classList.add('flex');

  // Mini Sub-Map
  setTimeout(() => {
    const container = document.getElementById('modal-map-div');
    if (container) {
      if (modalMap) modalMap.remove();
      modalMap = L.map('modal-map-div').setView([inc.lat, inc.lng], 14);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }).addTo(modalMap);

      L.marker([inc.lat, inc.lng], {
        icon: L.divIcon({ html: '<div class="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shadow-lg">🔥</div>' })
      }).addTo(modalMap).bindPopup(inc.title);

      L.circle([inc.lat, inc.lng], { color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3, radius: 500 }).addTo(modalMap);
    }
  }, 100);
}

function closeIncidentDetailsModal() {
  document.getElementById('modal-incident-details').classList.add('hidden');
  document.getElementById('modal-incident-details').classList.remove('flex');
}

function dispatchTeamFromModal() {
  showToast(`Authorized Rescue Team Dispatch for ${currentSelectedIncidentId}`, "success");
  closeIncidentDetailsModal();
}

function resolveIncidentFromModal() {
  incidents = incidents.filter(i => i.id !== currentSelectedIncidentId);
  renderAlertsList();
  renderIncidentsTable();
  renderLeafletMarkers();
  showToast(`Incident ${currentSelectedIncidentId} Resolved & Archived`, "info");
  closeIncidentDetailsModal();
}

// GENERAL UTILITIES
function searchMapLocation(query) {
  if (!query || query.length < 2) return;
  const match = incidents.find(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.placeName.toLowerCase().includes(query.toLowerCase()));
  if (match && dashboardMap) {
    dashboardMap.flyTo([match.lat, match.lng], 15);
    showToast(`Centered on ${match.title}`, "info");
  }
}

function resetMapView() {
  if (dashboardMap) dashboardMap.flyTo(CITY_CENTER, 12);
}

function toggleRiskZones() {
  riskZonesVisible = !riskZonesVisible;
  renderRiskZones();
  showToast(riskZonesVisible ? "Risk Zone Polygons Displayed" : "Risk Zones Hidden", "info");
}

function filterIncidentType(type) {
  activeIncidentFilter = type;
  renderLeafletMarkers();
  showToast(`Filtering Map: ${type.toUpperCase()}`, "info");
}

function showToast(msg, type = "info") {
  const toast = document.createElement('div');
  toast.className = `fixed top-16 right-4 z-[4000] px-4 py-2.5 rounded-lg border font-mono text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md animate-bounce ${
    type === 'critical' ? 'bg-red-950 border-red-500 text-red-200' : type === 'success' ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-cyan-950 border-cyan-500 text-cyan-200'
  }`;
  toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-current animate-ping"></span><span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function exportCsv() {
  let csv = "DIGITAL CRISIS COMMAND CENTER REPORT\n";
  csv += `Generated At,${new Date().toUTCString()}\n\n`;
  csv += "ACTIVE INCIDENTS\n";
  csv += "ID,Title,Severity,Risk_Score,Location,Latitude,Longitude,Affected_People\n";
  incidents.forEach(i => {
    csv += `"${i.id}","${i.title}","${i.severity}",${i.riskScore},"${i.placeName}",${i.lat},${i.lng},${i.affected}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Crisis_Command_Report_${Date.now()}.csv`;
  a.click();
  showToast("Downloaded Crisis CSV Report", "success");
}

// MODALS
function openIncidentModal() {
  document.getElementById('modal-incident').classList.remove('hidden');
  document.getElementById('modal-incident').classList.add('flex');
}
function closeIncidentModal() {
  document.getElementById('modal-incident').classList.add('hidden');
  document.getElementById('modal-incident').classList.remove('flex');
}

function submitNewIncident(e) {
  e.preventDefault();
  const title = document.getElementById('new-inc-title').value;
  const type = document.getElementById('new-inc-type').value;
  const severity = document.getElementById('new-inc-severity').value;
  const placeName = document.getElementById('new-inc-place').value;

  const newInc = {
    id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
    title,
    type,
    severity,
    riskScore: severity === 'CRITICAL' ? 92 : 75,
    placeName,
    lat: CITY_CENTER[0] + (Math.random() - 0.5) * 0.08,
    lng: CITY_CENTER[1] + (Math.random() - 0.5) * 0.08,
    date: "Sep 9, 2025",
    timestamp: new Date().toTimeString().substring(0, 5),
    summary: `Emergency incident dispatched to ${placeName}.`,
    affected: Math.floor(200 + Math.random() * 800),
    nearestHosp: "2.1 km",
    eta: "10 mins",
    reportedBy: "Command Center",
    status: "ACTIVE"
  };

  incidents.unshift(newInc);
  renderAlertsList();
  renderIncidentsTable();
  renderLeafletMarkers();
  showToast(`Incident Logged: ${title}`, "critical");
  closeIncidentModal();
}

function openEasModal() {
  document.getElementById('modal-eas').classList.remove('hidden');
  document.getElementById('modal-eas').classList.add('flex');
}
function closeEasModal() {
  document.getElementById('modal-eas').classList.add('hidden');
  document.getElementById('modal-eas').classList.remove('flex');
}

function transmitEas(e) {
  e.preventDefault();
  const msg = document.querySelector('#modal-eas textarea').value;
  timeline.unshift({
    id: `EVT-${Date.now().toString().slice(-4)}`,
    time: new Date().toTimeString().substring(0, 5),
    title: "EAS BROADCAST TRANSMITTED",
    description: msg,
    type: "critical"
  });
  renderTimelineDashboard();
  renderReportsTimeline();
  showToast("EAS Warning Broadcast Transmitted to Public & Authorities", "critical");
  closeEasModal();
}

function toggleAudio() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('audio-toggle-btn');
  if (btn) btn.innerHTML = soundEnabled ? '🔊 SIREN & SPEECH ON' : '🔇 MUTED';
  showToast(soundEnabled ? "Audio Siren & Speech Synth Enabled" : "Audio Siren Muted", "info");
}

// ==========================================================================
// ADVANCED FEATURE 1: AI SPEECH & NLP CITIZEN DISTRESS REPORT PARSER
// ==========================================================================
let isRecordingMic = false;
let currentExtractedReport = null;

function openNlpVoiceModal() {
  document.getElementById('modal-nlp-voice').classList.remove('hidden');
  document.getElementById('modal-nlp-voice').classList.add('flex');
}

function closeNlpVoiceModal() {
  document.getElementById('modal-nlp-voice').classList.add('hidden');
  document.getElementById('modal-nlp-voice').classList.remove('flex');
  document.getElementById('nlp-extraction-result').classList.add('hidden');
}

function toggleVoiceMicSimulator() {
  isRecordingMic = !isRecordingMic;
  const btnText = document.getElementById('mic-btn-text');
  const input = document.getElementById('nlp-speech-input');

  if (isRecordingMic) {
    if (btnText) btnText.textContent = "Listening to Citizen Voice Call...";
    showToast("🎙️ Listening to Citizen Speech Call...", "info");

    setTimeout(() => {
      input.value = "Emergency! Flash flooding near Kaziranga Assam water level rising rapidly 45 residents stranded near school!";
      if (btnText) btnText.textContent = "Voice Recording Complete";
      isRecordingMic = false;
      parseNlpSpeechText();
    }, 2500);
  }
}

function fillSampleVoiceCall() {
  const samples = [
    "Distress call: Wildfire spreading fast in Garhwal Uttarakhand forest near tourist lodge high winds 80 people evacuating!",
    "Accident on NH-44 Express Highway near Nagpur Central India tanker overturned 15 vehicles stuck traffic blocked!",
    "Emergency! Gas leak smelling strong near cold storage plant Visakhapatnam AP 120 factory workers cough..."
  ];
  const pick = samples[Math.floor(Math.random() * samples.length)];
  document.getElementById('nlp-speech-input').value = pick;
  parseNlpSpeechText();
}

function parseNlpSpeechText() {
  const text = document.getElementById('nlp-speech-input').value;
  if (!text) return showToast("Please type or record a voice distress transcript first.", "warning");

  showToast("🤖 Running AI Natural Language Processing...", "info");

  // Simulated AI NLP Entity Extraction Logic
  let type = "accident";
  if (text.toLowerCase().includes("fire") || text.toLowerCase().includes("smoke") || text.toLowerCase().includes("flame")) type = "fire";
  if (text.toLowerCase().includes("flood") || text.toLowerCase().includes("water") || text.toLowerCase().includes("rain")) type = "flood";
  if (text.toLowerCase().includes("gas") || text.toLowerCase().includes("leak") || text.toLowerCase().includes("chemical")) type = "gas";

  let place = "Pan-India Operational Sector";
  if (text.toLowerCase().includes("assam") || text.toLowerCase().includes("kaziranga")) place = "Kaziranga Sector, Assam";
  else if (text.toLowerCase().includes("uttarakhand") || text.toLowerCase().includes("garhwal")) place = "Garhwal Himalayan Forest, Uttarakhand";
  else if (text.toLowerCase().includes("nagpur") || text.toLowerCase().includes("nh-44")) place = "NH-44 Express Highway, Nagpur";
  else if (text.toLowerCase().includes("visakhapatnam") || text.toLowerCase().includes("ap")) place = "Visakhapatnam Harbor, Andhra Pradesh";

  let severity = text.toLowerCase().includes("emergency") || text.toLowerCase().includes("severe") || text.toLowerCase().includes("rapidly") ? 94 : 76;
  let affected = Math.floor(50 + Math.random() * 300);

  currentExtractedReport = {
    title: `AI Reported: ${type.toUpperCase()} in ${place.split(',')[0]}`,
    type,
    severity: severity > 85 ? "CRITICAL" : "HIGH",
    riskScore: severity,
    placeName: place,
    summary: text,
    affected
  };

  document.getElementById('nlp-res-type').textContent = type.toUpperCase();
  document.getElementById('nlp-res-place').textContent = place;
  document.getElementById('nlp-res-sev').textContent = `${severity}/100 (${currentExtractedReport.severity})`;
  document.getElementById('nlp-res-aff').textContent = `~ ${affected} citizens`;

  document.getElementById('nlp-extraction-result').classList.remove('hidden');
}

function injectNlpReportToMap() {
  if (!currentExtractedReport) return;

  const newInc = {
    id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
    title: currentExtractedReport.title,
    type: currentExtractedReport.type,
    severity: currentExtractedReport.severity,
    riskScore: currentExtractedReport.riskScore,
    placeName: currentExtractedReport.placeName,
    lat: 20.5937 + (Math.random() - 0.5) * 10.0,
    lng: 78.9629 + (Math.random() - 0.5) * 10.0,
    date: "Sep 9, 2025",
    timestamp: new Date().toTimeString().substring(0, 5),
    summary: currentExtractedReport.summary,
    affected: currentExtractedReport.affected,
    nearestHosp: "3.2 km",
    eta: "9 mins",
    reportedBy: "AI Citizen Voice Call",
    status: "ACTIVE"
  };

  incidents.unshift(newInc);
  renderAlertsList();
  renderIncidentsTable();
  renderLeafletMarkers();

  // Speak out voice alert!
  speakAlert(`Attention! AI Voice Citizen Dispatcher reported ${newInc.severity} ${newInc.type} at ${newInc.placeName}`);

  showToast(`🚀 Dispatched AI Citizen Report to Live Tactical Map: ${newInc.title}`, "critical");
  closeNlpVoiceModal();
}

// ==========================================================================
// ADVANCED FEATURE 2: MULTI-LANGUAGE EMERGENCY WARNING DISPATCHER
// ==========================================================================
const TRANSLATION_MAP = {
  en: "MANDATORY EVACUATION ORDER: East Zone & Kaziranga Sector. Water level +3.4m. Proceed immediately to Government School Shelter.",
  te: "తక్షణ ఖాళీ ఆదేశం: తూర్పు ప్రాంతం మరియు కాజీరంగా రంగానికి వరద హెచ్చరిక. నివాసితులు వెంటనే ప్రభుత్వ పాఠశాల పునరావాస కేంద్రానికి వెళ్ళగలరు.",
  hi: "अनिवार्य निकासी आदेश: पूर्व क्षेत्र एवं काजीरंगा सेक्टर। जल स्तर +3.4 मीटर। कृपया तुरंत सरकारी स्कूल आश्रय स्थल पर पहुँचें।",
  ta: "கட்டாய வெளியேற்ற உத்தரவு: கிழக்கு மண்டலம் மற்றும் காசிரங்கா துறை. தண்ணீர் மட்டம் +3.4மீ. உடனடியாக அரசு பள்ளி நிவாரண முகாமிற்கு செல்லவும்."
};

function updateEasTranslation(langKey) {
  const msgBox = document.getElementById('eas-msg-box');
  if (msgBox && TRANSLATION_MAP[langKey]) {
    msgBox.value = TRANSLATION_MAP[langKey];
  }
}

// Voice Alert Synthesizer
function speakAlert(phrase) {
  if (!soundEnabled || !('speechSynthesis' in window)) return;
  try {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn("Speech Synthesis Exception:", e);
  }
}

// ==========================================================================
// ADVANCED FEATURE 3: IOT SENSOR TELEMETRY STREAM SIMULATOR
// ==========================================================================
function renderIotTelemetryFeed() {
  const container = document.getElementById('iot-telemetry-feed');
  if (!container) return;

  const sensorNames = [
    { id: "ESP32-HYDRO-04", name: "Brahmaputra Flood Level", val: (3.2 + Math.random() * 0.4).toFixed(2) + " m", status: "CRITICAL" },
    { id: "LORA-THERM-12", name: "Garhwal Himalayan Heat", val: (46 + Math.random() * 4).toFixed(1) + " °C", status: "ALERT" },
    { id: "MQ4-GAS-09", name: "Hazmat Ammonia Level", val: Math.floor(130 + Math.random() * 25) + " PPM", status: "WARNING" },
    { id: "SEISMO-STA-01", name: "Himalayan Tremor Station", val: (2.0 + Math.random() * 0.3).toFixed(1) + " Mb", status: "NORMAL" }
  ];

  const nowStr = new Date().toTimeString().substring(0, 8);
  const html = sensorNames.map(s => `
    <div class="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-[11px]">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full ${s.status === 'CRITICAL' || s.status === 'ALERT' ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}"></span>
        <strong class="text-white">${s.id}</strong> — <span class="text-slate-400">${s.name}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="font-bold ${s.status === 'CRITICAL' ? 'text-red-400' : s.status === 'WARNING' ? 'text-amber-400' : 'text-cyan-400'}">${s.val}</span>
        <span class="text-[9px] text-slate-500">${nowStr}</span>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

// Start 3-second IoT Sensor Stream Loop
setInterval(renderIotTelemetryFeed, 3000);

