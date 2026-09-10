// Aegis Ops AI Crisis Engine — Core Intelligence Helper Functions

export const SATELLITE_SAMPLE_IMAGES = [
  {
    id: "SAT-FLOOD-01",
    name: "Aerial Drone Scan — Brahmaputra Flood Sector",
    type: "flood",
    url: "/satellite_flood.jpg",
    detections: [
      { type: "Flooded Zone", count: "3.4 sq km", severity: "CRITICAL", coords: [[26.58, 93.16], [26.59, 93.18], [26.56, 93.19], [26.55, 93.17]] },
      { type: "Damaged Road", count: "2 primary highways blocked", severity: "HIGH" },
      { type: "Buildings Affected", count: "142 structures submerged", severity: "HIGH" },
      { type: "Stranded Citizens", count: "~450 estimated along riverbanks", severity: "CRITICAL" }
    ],
    riskScore: 92
  },
  {
    id: "SAT-WILDFIRE-02",
    name: "Thermal Satellite Scan — Garhwal Wildfire Range",
    type: "fire",
    url: "/satellite_wildfire.jpg",
    detections: [
      { type: "Active Fire Front", count: "1.8 km perimeter", severity: "CRITICAL", coords: [[30.32, 78.02], [30.34, 78.04], [30.31, 78.06], [30.29, 78.03]] },
      { type: "Smoke Plume Spread", count: "5.2 km NW drift", severity: "MEDIUM" },
      { type: "Blocked Routes", count: "Highland pass impassable", severity: "HIGH" },
      { type: "Residences in Path", count: "85 forest hamlets", severity: "CRITICAL" }
    ],
    riskScore: 95
  },
  {
    id: "SAT-HAZMAT-03",
    name: "Recon Drone — NH-44 Hazmat Chemical Leak",
    type: "accident",
    url: "/satellite_hazmat.jpg",
    detections: [
      { type: "Chemical Vapor Cloud", count: "400m radius", severity: "HIGH" },
      { type: "Corridor Traffic Jam", count: "3.1 km queue", severity: "MEDIUM" },
      { type: "Damaged Infrastructure", count: "Overpass barrier breach", severity: "MEDIUM" }
    ],
    riskScore: 78
  },
  {
    id: "SAT-VOLCANO-04",
    name: "Thermal Satellite — Barren Island Eruption",
    type: "volcano",
    url: "/satellite_volcano.jpg",
    detections: [
      { type: "Active Ash Plume", count: "2.4 km altitude", severity: "CRITICAL", coords: [[12.27, 93.85], [12.29, 93.87], [12.26, 93.88]] },
      { type: "Lava Flow Channel", count: "800m seaward expansion", severity: "HIGH" },
      { type: "Flight Corridor Hazard", count: "Red Aviation Warning", severity: "CRITICAL" }
    ],
    riskScore: 88
  },
  {
    id: "SAT-QUAKE-05",
    name: "Structural Triage — Bhuj Earthquake Ruin Sector",
    type: "earthquake",
    url: "/satellite_earthquake.jpg",
    detections: [
      { type: "Collapsed Structures", count: "34 buildings damaged", severity: "CRITICAL", coords: [[23.24, 69.66], [23.25, 69.68], [23.23, 69.69]] },
      { type: "Surface Fissures", count: "1.2 km fracture line", severity: "HIGH" },
      { type: "Evacuation Chokepoint", count: "Overpass structural crack", severity: "HIGH" }
    ],
    riskScore: 94
  },
  {
    id: "SAT-CYCLONE-06",
    name: "Radar Scan — Coromandel Cyclone Surge",
    type: "storm",
    url: "/satellite_cyclone.jpg",
    detections: [
      { type: "Storm Surge Inundation", count: "4.8 sq km coastal flood", severity: "CRITICAL", coords: [[13.08, 80.27], [13.09, 80.29], [13.07, 80.30]] },
      { type: "High Wind Damage Zone", count: "38 knots onshore wind", severity: "HIGH" },
      { type: "Coastal Road Breach", count: "East Coast Road blocked", severity: "HIGH" }
    ],
    riskScore: 91
  },
  {
    id: "SAT-LANDSLIDE-07",
    name: "Drone Recon — Wayanad Mountain Mudslide",
    type: "landslide",
    url: "/satellite_landslide.jpg",
    detections: [
      { type: "Debris Flow Path", count: "1.4 km mudslide run", severity: "CRITICAL", coords: [[11.68, 76.13], [11.69, 76.15], [11.67, 76.16]] },
      { type: "Submerged Highway Section", count: "Pass completely blocked", severity: "CRITICAL" },
      { type: "Stranded Settlements", count: "140 residents isolated", severity: "HIGH" }
    ],
    riskScore: 89
  },
  {
    id: "SAT-AVALANCHE-08",
    name: "Thermal Drone — Zojila High-Altitude Avalanche",
    type: "blizzard",
    url: "/satellite_avalanche.jpg",
    detections: [
      { type: "Snow Slide Perimeter", count: "2.1 km snowpack collapse", severity: "HIGH", coords: [[34.29, 75.47], [34.30, 75.49], [34.28, 75.50]] },
      { type: "Trapped Vehicles", count: "Convoy stranded", severity: "CRITICAL" }
    ],
    riskScore: 85
  },
  {
    id: "SAT-TSUNAMI-09",
    name: "Coastal Radar — Bay of Bengal Tsunami Wave",
    type: "tsunami",
    url: "/satellite_tsunami.jpg",
    detections: [
      { type: "Violent Surge Wave", count: "6.2m wave crest", severity: "CRITICAL", coords: [[11.93, 79.83], [11.95, 79.85], [11.92, 79.86]] },
      { type: "Port Inundation", count: "Container harbor flooded", severity: "CRITICAL" },
      { type: "Coastal Evacuation Zone", count: "12,000 residents fleeing", severity: "CRITICAL" }
    ],
    riskScore: 97
  },
  {
    id: "SAT-DROUGHT-10",
    name: "Multispectral — Marathwada Reservoir Drought",
    type: "drought",
    url: "/satellite_drought.jpg",
    detections: [
      { type: "Parched Soil Area", count: "18.5 sq km dried basin", severity: "HIGH", coords: [[19.87, 75.34], [19.89, 75.36], [19.86, 75.37]] },
      { type: "Water Level Loss", count: "89% volume depletion", severity: "CRITICAL" },
      { type: "Crop Failure Risk", count: "42 agricultural sectors affected", severity: "HIGH" }
    ],
    riskScore: 82
  },
  {
    id: "SAT-THUNDER-11",
    name: "Storm Recon — Northern Plains Supercell Lightning",
    type: "thunderstorm",
    url: "/satellite_thunderstorm.jpg",
    detections: [
      { type: "Supercell Vortex", count: "45 km cloud diameter", severity: "HIGH", coords: [[28.61, 77.20], [28.63, 77.23], [28.59, 77.25]] },
      { type: "Lightning Strike Rate", count: "140 strikes/min", severity: "CRITICAL" },
      { type: "Flash Flood Warning", count: "Severe urban runoff", severity: "HIGH" }
    ],
    riskScore: 87
  }
];

export const MULTI_SOURCE_FEEDS = [
  { source: "IoT Hydro-Sensor B-04", icon: "📡", telemetry: "Water level +3.4m over safety threshold", weight: 30, status: "VERIFIED" },
  { source: "Citizen Reports", icon: "👥", telemetry: "17 geotagged flood alerts in 12 mins", weight: 25, status: "HIGH_DENSITY" },
  { source: "IMD Weather Radar", icon: "🌧️", telemetry: "Heavy rain precipitation (48mm/hr continuous)", weight: 20, status: "ACTIVE" },
  { source: "Satellite SAR Recon", icon: "🛰️", telemetry: "Water body expansion detected over 2.8 km²", weight: 15, status: "CONFIRMED" },
  { source: "Emergency Call Center", icon: "📞", telemetry: "8 emergency 112 calls from Zone 3", weight: 10, status: "CRITICAL" }
];

export function calculateFusedConfidence(feeds = MULTI_SOURCE_FEEDS) {
  const total = feeds.reduce((sum, f) => sum + f.weight, 0);
  return {
    confidencePct: total,
    severity: total > 85 ? "CRITICAL" : total > 60 ? "HIGH" : "MEDIUM",
    clusterName: "Unified Brahmaputra Flood Inundation Cluster #904"
  };
}

export function getAICopilotAnalysis(query = "", state = {}) {
  const q = query.toLowerCase();
  
  if (q.includes("dangerous") || q.includes("critical") || q.includes("most")) {
    return {
      title: "CRITICAL: Flood Zone 3 (Brahmaputra Basin)",
      affectedCount: "1,850 people potentially affected",
      metrics: [
        { label: "Water Level", val: "Rising rapidly (+3.4m crest)" },
        { label: "Road Access", val: "2 primary escape routes blocked" },
        { label: "Hospital Capacity", val: "City General @ 82% load" }
      ],
      actions: [
        "Start immediate evacuation in Zone 3 (Brahmaputra Sector)",
        "Dispatch Hydro Rescue Team NDRF Boat-01",
        "Reserve 25 emergency trauma beds at AIIMS Apex Center",
        "Activate Relief Shelter S2 (Guwahati Base)",
        "Send Telugu/Hindi/English emergency warning broadcast"
      ]
    };
  } else if (q.includes("hospital") || q.includes("bed") || q.includes("capacity")) {
    return {
      title: "HOSPITAL SURGE & BOTTLENECK ANALYSIS",
      affectedCount: "3 Major Regional Hospitals Monitored",
      metrics: [
        { label: "AIIMS Apex Center", val: "88% ICU Occupied (12 beds left)" },
        { label: "KEM Hospital", val: "80% ICU Occupied (13 beds left)" },
        { label: "Narayana Complex", val: "66% ICU Occupied (20 beds left)" }
      ],
      actions: [
        "Redirect non-trauma arrivals to Narayana Complex",
        "Deploy 4 additional Tactical EMS Ambulances to AIIMS",
        "Pre-stage 15 emergency ventilator units at Apex Trauma Care"
      ]
    };
  } else {
    return {
      title: "AEGIS SYSTEM-WIDE CRISIS TELEMETRY",
      affectedCount: "53,050 total residents monitored across 4 sectors",
      metrics: [
        { label: "Highest Risk", val: "Wildfire & Coastal Cyclone (DEFCON 2)" },
        { label: "Fleet Readiness", val: "62% deployed, 38% on standby" },
        { label: "Shelter Spots", val: "3,080 beds available" }
      ],
      actions: [
        "Maintain heightened DEFCON surveillance",
        "Monitor coastal storm surge wind speeds (+35mph)",
        "Rebalance ready ambulances to high-density zones"
      ]
    };
  }
}

export function getXAIScoreBreakdown(incident) {
  const isFlood = incident?.type === "flood";
  const isFire = incident?.type === "fire";

  return {
    incidentId: incident?.id || "INC-9042",
    title: incident?.title || "Himalayan Forest Wildfire",
    totalScore: incident?.threatLevel || incident?.riskScore || 94,
    factors: [
      { name: "Population Affected", score: 30, desc: "High residential density within 2 km radius" },
      { name: isFlood ? "Water Elevation Rate" : isFire ? "Wind Speed & Flame Spread" : "Chemical Toxicity", score: 25, desc: isFlood ? "Water rising +2.8m above crest" : "Winds pushing fire front at 35mph" },
      { name: "Hospital Proximity & Load", score: 15, desc: "Nearest level 1 hospital operating at 88% capacity" },
      { name: "Road & Escape Route Access", score: 10, desc: "Primary evacuation corridor restricted" },
      { name: "Escalation Probability", score: 14, desc: "Weather forecast predicts worsening conditions in 30m" }
    ],
    reasoning: `This incident is prioritized with high severity because ${
      isFlood
        ? "water levels are rising rapidly in a densely populated basin with limited evacuation infrastructure."
        : "high winds are driving rapid flame expansion toward nearby residential sectors."
    }`
  };
}

export function predict60MinuteTimeline(incident) {
  return [
    {
      time: "CURRENT",
      waterLevel: "4.2m",
      roadStatus: "Clear (Slow traffic)",
      riskLevel: "MODERATE",
      impact: "Monitoring initial telemetry feeds."
    },
    {
      time: "+20 MIN",
      waterLevel: "4.8m (+0.6m)",
      roadStatus: "NH16 Underpass Blocked ❌",
      riskLevel: "HIGH",
      impact: "Water inundates low-lying access points."
    },
    {
      time: "+40 MIN",
      waterLevel: "5.3m (+1.1m)",
      roadStatus: "Zone 3 Ingress Routes Flooded ❌",
      riskLevel: "CRITICAL",
      impact: "Zone 3 cutoff from land transit. Air/Boat rescue required."
    },
    {
      time: "+60 MIN",
      waterLevel: "5.9m (+1.7m)",
      roadStatus: "Full Perimeter Submerged",
      riskLevel: "EXTREME",
      impact: "~1,850 residents require emergency evacuation to Shelter S2."
    }
  ];
}

export function generateEvacuationData(zoneName = "Zone 3 - Low-Lying Delta Sector") {
  return {
    zone: zoneName,
    populationTotal: 2450,
    evacuateFirst: 1100, // high risk
    shelterAssignments: [
      { name: "National Cyclone Relief Hub (Shelter S1)", allocated: 600, status: "READY" },
      { name: "Brahmaputra Evacuation Base (Shelter S2)", allocated: 500, status: "HIGH_OCCUPANCY" }
    ],
    routes: [
      { name: "Route A — Western Highway Bypass", status: "SAFE", icon: "✅", note: "Clear traffic flow" },
      { name: "Route B — NH16 Low-Lying Underpass", status: "FLOODED", icon: "❌", note: "Water +1.2m deep" },
      { name: "Route C — East Sector Service Road", status: "CONGESTED", icon: "⚠️", note: "Heavy slowdown" }
    ],
    requirements: {
      ambulances: 6,
      rescueTeams: 4,
      buses: 12
    }
  };
}

export function generateTargetedBroadcasts(incidentTitle = "Critical Inundation Warning", radiusKm = 2.8) {
  return {
    radius: radiusKm,
    targetCount: 14200,
    languages: {
      en: {
        code: "🇬🇧 English",
        text: `CRITICAL FLOOD WARNING: Move to higher ground immediately within ${radiusKm}km. Avoid NH16 underpass. Seek shelter at Base S2.`
      },
      te: {
        code: "🇮🇳 తెలుగు (Telugu)",
        text: `అత్యవసర వరద హెచ్చరిక: ${radiusKm} కి.మీ పరిధిలోని ప్రజలు వెంటనే ఎత్తైన ప్రాంతాలకు వెళ్లండి. NH16 అండర్‌పాస్‌ను నివారించండి.`
      },
      hi: {
        code: "🇮🇳 हिन्दी (Hindi)",
        text: `गंभीर बाढ़ की चेतावनी: ${radiusKm} किमी के दायरे में तुरंत ऊंचे स्थानों पर जाएं। NH16 अंडरपास से बचें।`
      }
    }
  };
}

export function simulateWhatIf(rainfallPct = 20, riverLevelRise = 1.2) {
  const multiplier = 1 + (rainfallPct / 100) * 0.8 + (riverLevelRise / 5) * 0.5;
  const currentPop = 450;
  const simulatedPop = Math.round(currentPop * multiplier * 2.8);
  const currentRoads = 2;
  const simulatedRoads = Math.round(currentRoads + rainfallPct * 0.25);
  const currentAmbulances = 4;
  const simulatedAmbulances = Math.round(currentAmbulances + rainfallPct * 0.35);
  const currentShelterDemand = 500;
  const simulatedShelterDemand = Math.round(currentShelterDemand * multiplier * 2.5);

  return {
    current: {
      pop: currentPop,
      blockedRoads: currentRoads,
      ambulances: currentAmbulances,
      shelterDemand: currentShelterDemand
    },
    after: {
      pop: simulatedPop,
      blockedRoads: simulatedRoads,
      ambulances: simulatedAmbulances,
      shelterDemand: simulatedShelterDemand
    },
    recommendation: "Activate Relief Shelter S3 immediately, pre-position 4 hydro rescue teams near lower river basin, and transmit multi-lingual evacuation alerts."
  };
}
