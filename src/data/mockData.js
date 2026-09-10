// Aegis Ops Tactical Mock Dataset (Pan-India & Global Disaster Matrix)

export const INITIAL_INCIDENTS = [
  {
    id: "INC-9042",
    title: "Himalayan Forest Wildfire",
    type: "fire",
    severity: "CRITICAL",
    category: 5,
    location: "Garhwal Forest Range, Uttarakhand (North India)",
    lat: 30.3165,
    lng: 78.0322,
    radiusMeters: 1800,
    timestamp: "10:14:22 UTC",
    summary: "Fast-moving brush fire pushed by 35mph winds along Himalayan ridge line.",
    affectedPeople: 2400,
    unitsAssigned: ["Engine-04", "Engine-09", "IAF-Air-Rescue-1"],
    status: "ACTIVE_CONTAINMENT",
    threatLevel: 95
  },
  {
    id: "INC-8931",
    title: "Brahmaputra Flood Inundation",
    type: "flood",
    severity: "HIGH",
    category: 4,
    location: "Kaziranga Basin, Assam (East/Northeast India)",
    lat: 26.5775,
    lng: 93.1711,
    radiusMeters: 2200,
    timestamp: "10:02:15 UTC",
    summary: "Water levels reached +3.4m over crest. NDRF water rescue operations active.",
    affectedPeople: 18500,
    unitsAssigned: ["NDRF-Boat-01", "NDRF-Boat-03"],
    status: "ACTIVE_RESCUE",
    threatLevel: 82
  },
  {
    id: "INC-8812",
    title: "Expressway Pileup & Chemical Spill",
    type: "accident",
    severity: "HIGH",
    category: 3,
    location: "NH-44 Express Corridor, Nagpur, Maharashtra",
    lat: 21.1458,
    lng: 79.0882,
    radiusMeters: 800,
    timestamp: "09:48:00 UTC",
    summary: "Ammonia tanker rollover on NH-44 highway. Cordon perimeter locked.",
    affectedPeople: 650,
    unitsAssigned: ["Hazmat-01", "Engine-14"],
    status: "HAZMAT_ISOLATION",
    threatLevel: 76
  },
  {
    id: "INC-8740",
    title: "Severe Coastal Cyclone Warning",
    type: "storm",
    severity: "CRITICAL",
    category: 4,
    location: "Coromandel Coast, Tamil Nadu",
    lat: 13.0827,
    lng: 80.2707,
    radiusMeters: 5000,
    timestamp: "09:30:10 UTC",
    summary: "Category 4 tropical cyclone storm surge approaching coastline.",
    affectedPeople: 32000,
    unitsAssigned: ["CoastGuard-01", "NDRF-05"],
    status: "MONITORING",
    threatLevel: 92
  },
  {
    id: "INC-8610",
    title: "Major Fault Line Earthquake (6.4 M)",
    type: "earthquake",
    severity: "CRITICAL",
    category: 5,
    location: "Kutch Fault Sector, Bhuj, Gujarat",
    lat: 23.2420,
    lng: 69.6669,
    radiusMeters: 4000,
    timestamp: "08:50:00 UTC",
    summary: "6.4 magnitude seismic quake recorded. Structural triage teams mobilized.",
    affectedPeople: 14200,
    unitsAssigned: ["NDRF-Quake-Team", "AirForce-C130"],
    status: "DISASTER_TRIAGE",
    threatLevel: 96
  },
  {
    id: "INC-8520",
    title: "Volcanic Ash Plume Alert",
    type: "volcano",
    severity: "HIGH",
    category: 3,
    location: "Barren Island Volcanic Zone, Andaman Sea",
    lat: 12.2780,
    lng: 93.8580,
    radiusMeters: 3500,
    timestamp: "08:15:12 UTC",
    summary: "Active ash eruption rising 2.4 km into flight corridors. Maritime alert.",
    affectedPeople: 850,
    unitsAssigned: ["CoastGuard-Patrol"],
    status: "AIR_HAZARD",
    threatLevel: 80
  },
  {
    id: "INC-8430",
    title: "Western Ghats Landslide & Mudslide",
    type: "landslide",
    severity: "CRITICAL",
    category: 4,
    location: "Wayanad Hills Sector, Kerala",
    lat: 11.6854,
    lng: 76.1320,
    radiusMeters: 1500,
    timestamp: "07:40:00 UTC",
    summary: "Debris flow blocked mountain highway pass. Emergency canine search active.",
    affectedPeople: 1100,
    unitsAssigned: ["NDRF-K9-Unit", "Army-Engineers"],
    status: "ACTIVE_RESCUE",
    threatLevel: 89
  },
  {
    id: "INC-8340",
    title: "High-Altitude Glacier Avalanche",
    type: "blizzard",
    severity: "HIGH",
    category: 3,
    location: "Zojila Pass Ridge, Ladakh",
    lat: 34.2980,
    lng: 75.4740,
    radiusMeters: 2500,
    timestamp: "07:10:00 UTC",
    summary: "Snow avalanche trapped military convoy. Thermal drone search overhead.",
    affectedPeople: 320,
    unitsAssigned: ["IAF-Air-Rescue-2"],
    status: "SNOW_RESCUE",
    threatLevel: 84
  },
  {
    id: "INC-8250",
    title: "Supercell Thunderstorm & Lightning Surge",
    type: "thunderstorm",
    severity: "MEDIUM",
    category: 2,
    location: "Gangetic Plain Basin, West Bengal",
    lat: 22.5726,
    lng: 88.3639,
    radiusMeters: 3000,
    timestamp: "06:45:00 UTC",
    summary: "Severe lightning strikes damaged regional power sub-station. Grid offline.",
    affectedPeople: 8500,
    unitsAssigned: ["PowerGrid-Repair"],
    status: "GRID_RESTORATION",
    threatLevel: 68
  },
  {
    id: "INC-8160",
    title: "Tsunami Deep Trench Pre-Warning",
    type: "tsunami",
    severity: "CRITICAL",
    category: 5,
    location: "Nicobar Trench Perimeter, Indian Ocean",
    lat: 7.0000,
    lng: 93.8000,
    radiusMeters: 8000,
    timestamp: "06:05:00 UTC",
    summary: "Tide buoy #12 detected sudden sea level drop following underwater quake.",
    affectedPeople: 45000,
    unitsAssigned: ["Naval-Command", "CoastGuard-03"],
    status: "EVACUATION_ALERT",
    threatLevel: 98
  },
  {
    id: "INC-8070",
    title: "Extreme Heatwave & Drought Crisis (49°C)",
    type: "drought",
    severity: "HIGH",
    category: 3,
    location: "Thar Desert Zone, Jaisalmer, Rajasthan",
    lat: 26.9157,
    lng: 70.9083,
    radiusMeters: 6000,
    timestamp: "05:30:00 UTC",
    summary: "Ground temp reached 49°C. Emergency water tankers dispatched to 14 villages.",
    affectedPeople: 12000,
    unitsAssigned: ["Tanker-Convoy-01"],
    status: "WATER_SUPPLY",
    threatLevel: 75
  }
];

export const AFFECTED_ZONES = [
  {
    id: "ZONE-RED-01",
    name: "Himalayan Wildfire Danger Sector",
    color: "#ef4444",
    fillColor: "#ef4444",
    fillOpacity: 0.25,
    severity: "CRITICAL",
    coordinates: [
      [30.330, 78.010],
      [30.340, 78.050],
      [30.300, 78.060],
      [30.290, 78.020]
    ]
  },
  {
    id: "ZONE-AMBER-02",
    name: "Brahmaputra Flood Basin Sector",
    color: "#f59e0b",
    fillColor: "#f59e0b",
    fillOpacity: 0.22,
    severity: "HIGH",
    coordinates: [
      [26.590, 93.150],
      [26.600, 93.190],
      [26.550, 93.200],
      [26.540, 93.160]
    ]
  },
  {
    id: "ZONE-BLUE-03",
    name: "Coromandel Coastal Storm Perimeter",
    color: "#06b6d4",
    fillColor: "#06b6d4",
    fillOpacity: 0.20,
    severity: "MODERATE",
    coordinates: [
      [13.090, 80.250],
      [13.100, 80.290],
      [13.070, 80.300],
      [13.060, 80.260]
    ]
  }
];

export const INITIAL_HOSPITALS = [
  {
    id: "HOSP-01",
    name: "AIIMS National Apex Trauma Center",
    lat: 28.5672,
    lng: 77.2100,
    traumaTier: "National Level 1 Trauma",
    icuTotal: 100,
    icuOccupied: 88,
    erTotal: 50,
    erOccupied: 45,
    ambulancesAvailable: 12,
    helipad: "ACTIVE",
    status: "CRITICAL_CAPACITY"
  },
  {
    id: "HOSP-02",
    name: "KEM Hospital & Research Center",
    lat: 19.0024,
    lng: 72.8422,
    traumaTier: "Level 1 Regional Trauma",
    icuTotal: 65,
    icuOccupied: 52,
    erTotal: 35,
    erOccupied: 28,
    ambulancesAvailable: 8,
    helipad: "ACTIVE",
    status: "OPERATIONAL"
  },
  {
    id: "HOSP-03",
    name: "Narayana Health City Complex",
    lat: 12.8130,
    lng: 77.6970,
    traumaTier: "Level 1 Trauma",
    icuTotal: 60,
    icuOccupied: 40,
    erTotal: 30,
    erOccupied: 20,
    ambulancesAvailable: 9,
    helipad: "ACTIVE",
    status: "OPERATIONAL"
  },
  {
    id: "HOSP-04",
    name: "SSKM Hospital Emergency Hub",
    lat: 22.5392,
    lng: 88.3433,
    traumaTier: "Level 1 Regional Trauma",
    icuTotal: 75,
    icuOccupied: 61,
    erTotal: 40,
    erOccupied: 31,
    ambulancesAvailable: 7,
    helipad: "ACTIVE",
    status: "BUSY"
  }
];

export const INITIAL_SHELTERS = [
  {
    id: "SHL-01",
    name: "National Cyclone Relief Hub",
    lat: 19.8135,
    lng: 85.8312,
    capacity: 3500,
    occupied: 2400,
    suppliesPct: 92,
    powerStatus: "ONLINE",
    medicalBay: "ACTIVE",
    status: "OPERATIONAL"
  },
  {
    id: "SHL-02",
    name: "Brahmaputra Evacuation Base",
    lat: 26.1445,
    lng: 91.7362,
    capacity: 2500,
    occupied: 1870,
    suppliesPct: 88,
    powerStatus: "ONLINE",
    medicalBay: "ACTIVE",
    status: "HIGH_OCCUPANCY"
  },
  {
    id: "SHL-03",
    name: "Himalayan Ridge Relief Camp",
    lat: 30.3165,
    lng: 78.0322,
    capacity: 1200,
    occupied: 650,
    suppliesPct: 96,
    powerStatus: "ONLINE",
    medicalBay: "READY",
    status: "OPERATIONAL"
  },
  {
    id: "SHL-04",
    name: "Deccan Plateau Disaster Shelter",
    lat: 17.3850,
    lng: 78.4867,
    capacity: 2000,
    occupied: 1100,
    suppliesPct: 90,
    powerStatus: "ONLINE",
    medicalBay: "ACTIVE",
    status: "OPERATIONAL"
  }
];

export const INITIAL_FLEET = [
  { type: "NDRF Response Battalions", total: 40, deployed: 24, ready: 16, icon: "🛡️" },
  { type: "NDRF Hydro Rescue Boats", total: 30, deployed: 18, ready: 12, icon: "🚤" },
  { type: "IAF Air Rescue Squadrons", total: 15, deployed: 7, ready: 8, icon: "🚁" },
  { type: "Indian Coast Guard Patrols", total: 20, deployed: 10, ready: 10, icon: "⚓" },
  { type: "Tactical EMS Ambulances", total: 80, deployed: 45, ready: 35, icon: "🚑" }
];

export const INITIAL_TIMELINE = [
  {
    id: "EVT-109",
    time: "10:14:22 UTC",
    title: "NDRF Command Telemetry Active",
    type: "critical",
    description: "APEX Command Matrix monitoring Republic of India (North, East, West, South, Central).",
    sector: "Pan-India"
  },
  {
    id: "EVT-108",
    time: "10:08:45 UTC",
    title: "Garhwal Fire Escalation",
    type: "critical",
    description: "Command Center upgraded Himalayan ridge fire incident to DEFCON 2.",
    sector: "North Zone"
  },
  {
    id: "EVT-107",
    time: "10:02:15 UTC",
    title: "Brahmaputra River Crest Red Alert",
    type: "warning",
    description: "Sensor B-02 Kaziranga reports crest at +3.4m over danger mark.",
    sector: "East Zone"
  },
  {
    id: "EVT-106",
    time: "09:55:00 UTC",
    title: "Coromandel Cyclone Pre-Warning",
    type: "info",
    description: "IMD cyclone tracking locked on Tamil Nadu coast. Red alert issued.",
    sector: "South Zone"
  }
];

export const SIMULATED_DRONE_FEEDS = [
  {
    id: "CAM-01",
    name: "DRONE-ALPHA // Garhwal Himalayas (Uttarakhand)",
    target: "Wildfire Frontline Recon",
    coordinates: "30.3165° N, 78.0322° E",
    status: "LIVE STREAM",
    thermalTemp: "780°C Peak",
    windSpeed: "34 knots NW",
    image: "/satellite_wildfire.jpg"
  },
  {
    id: "CAM-02",
    name: "DRONE-BRAVO // Brahmaputra Basin (Assam)",
    target: "Flood Water Inundation",
    coordinates: "26.5775° N, 93.1711° E",
    status: "LIVE STREAM",
    thermalTemp: "26°C Water",
    windSpeed: "22 knots W",
    image: "/satellite_flood.jpg"
  },
  {
    id: "CAM-03",
    name: "CCTV-TOWER // NH-44 Express Corridor (Nagpur)",
    target: "Hazmat Containment Cordon",
    coordinates: "21.1458° N, 79.0882° E",
    status: "LIVE STREAM",
    thermalTemp: "31°C Ambient",
    windSpeed: "12 knots SW",
    image: "/satellite_hazmat.jpg"
  },
  {
    id: "CAM-04",
    name: "DRONE-CHARLIE // Barren Island Volcano (Andaman)",
    target: "Volcanic Ash & Thermal Eruption",
    coordinates: "12.2780° N, 93.8580° E",
    status: "LIVE STREAM",
    thermalTemp: "950°C Core",
    windSpeed: "18 knots E",
    image: "/satellite_volcano.jpg"
  },
  {
    id: "CAM-05",
    name: "DRONE-DELTA // Bhuj Earthquake Triage (Gujarat)",
    target: "Structural Collapse Recon",
    coordinates: "23.2420° N, 69.6669° E",
    status: "LIVE STREAM",
    thermalTemp: "29°C Ambient",
    windSpeed: "14 knots S",
    image: "/satellite_earthquake.jpg"
  },
  {
    id: "CAM-06",
    name: "DRONE-ECHO // Coromandel Coast (Tamil Nadu)",
    target: "Cyclone Storm Surge & Sea Wall Breach",
    coordinates: "13.0827° N, 80.2707° E",
    status: "LIVE STREAM",
    thermalTemp: "24°C Ambient",
    windSpeed: "58 knots ENE",
    image: "/satellite_cyclone.jpg"
  },
  {
    id: "CAM-07",
    name: "DRONE-FOXTROT // Wayanad Hills (Kerala)",
    target: "Mountain Mudslide Debris Path",
    coordinates: "11.6854° N, 76.1320° E",
    status: "LIVE STREAM",
    thermalTemp: "22°C Ground",
    windSpeed: "19 knots SW",
    image: "/satellite_landslide.jpg"
  },
  {
    id: "CAM-08",
    name: "DRONE-GOLF // Zojila High Pass (Ladakh)",
    target: "Snow Avalanche Highway Blockage",
    coordinates: "34.2951° N, 75.4712° E",
    status: "LIVE STREAM",
    thermalTemp: "-14°C Freeze",
    windSpeed: "42 knots N",
    image: "/satellite_avalanche.jpg"
  },
  {
    id: "CAM-09",
    name: "DRONE-HOTEL // Puducherry Coastline (Bay of Bengal)",
    target: "Tsunami Ocean Surge Inundation",
    coordinates: "11.9416° N, 79.8335° E",
    status: "LIVE STREAM",
    thermalTemp: "27°C Surge",
    windSpeed: "38 knots E",
    image: "/satellite_tsunami.jpg"
  },
  {
    id: "CAM-10",
    name: "DRONE-INDIA // Marathwada Basin (Maharashtra)",
    target: "Drought Reservoir Soil Crack Recon",
    coordinates: "19.8762° N, 75.3433° E",
    status: "LIVE STREAM",
    thermalTemp: "43°C Heatwave",
    windSpeed: "8 knots NE",
    image: "/satellite_drought.jpg"
  },
  {
    id: "CAM-11",
    name: "DRONE-JULIET // NCR Sector (Delhi)",
    target: "Supercell Thunderstorm Lightning Tracking",
    coordinates: "28.6139° N, 77.2090° E",
    status: "LIVE STREAM",
    thermalTemp: "19°C Chilled",
    windSpeed: "46 knots NW",
    image: "/satellite_thunderstorm.jpg"
  }
];

// CONTINUOUS WEB AUDIO SIREN ENGINE (Wails continuously until turned off)
let sirenCtx = null;
let sirenOsc = null;
let sirenGain = null;
let sirenTimer = null;

export function startContinuousSiren() {
  stopContinuousSiren();
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    sirenCtx = new AudioContext();
    if (sirenCtx.state === 'suspended') {
      sirenCtx.resume();
    }

    sirenOsc = sirenCtx.createOscillator();
    sirenGain = sirenCtx.createGain();

    sirenOsc.type = "sawtooth";
    sirenGain.gain.setValueAtTime(0.12, sirenCtx.currentTime);

    sirenOsc.connect(sirenGain);
    sirenGain.connect(sirenCtx.destination);

    sirenOsc.start();

    let highPitch = true;
    sirenTimer = setInterval(() => {
      if (!sirenCtx || !sirenOsc) return;
      const now = sirenCtx.currentTime;
      if (highPitch) {
        sirenOsc.frequency.exponentialRampToValueAtTime(960, now + 0.5);
      } else {
        sirenOsc.frequency.exponentialRampToValueAtTime(440, now + 0.5);
      }
      highPitch = !highPitch;
    }, 600);

  } catch (e) {
    console.warn("Audio Context continuous siren blocked/error:", e);
  }
}

export function stopContinuousSiren() {
  if (sirenTimer) {
    clearInterval(sirenTimer);
    sirenTimer = null;
  }
  if (sirenOsc) {
    try { sirenOsc.stop(); } catch (e) {}
    sirenOsc = null;
  }
  if (sirenCtx) {
    try { sirenCtx.close(); } catch (e) {}
    sirenCtx = null;
  }
}

export function playAlertSiren(type = "critical") {
  startContinuousSiren();
}
