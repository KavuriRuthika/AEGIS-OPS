import React, { useState, useEffect } from 'react';
import HeaderBar from './components/HeaderBar';
import InteractiveMap from './components/InteractiveMap';
import AlertFeed from './components/AlertFeed';
import ResourceTracker from './components/ResourceTracker';
import LiveTimeline from './components/LiveTimeline';
import DroneFeedSimulator from './components/DroneFeedSimulator';
import IncidentModal from './components/IncidentModal';
import EASModal from './components/EASModal';
import DispatchModal from './components/DispatchModal';

// 10 Core AI Suite Components
import AICrisisCopilotModal from './components/AICrisisCopilotModal';
import MultiSourceFusionModal from './components/MultiSourceFusionModal';
import SatelliteDroneIntelModal from './components/SatelliteDroneIntelModal';
import CrisisPredictionModal from './components/CrisisPredictionModal';
import ExplainableAIModal from './components/ExplainableAIModal';
import DynamicReallocationModal from './components/DynamicReallocationModal';
import HospitalSurgeModal from './components/HospitalSurgeModal';
import AIEvacuationPlannerModal from './components/AIEvacuationPlannerModal';
import TargetedBroadcastModal from './components/TargetedBroadcastModal';
import WhatIfSimulatorModal from './components/WhatIfSimulatorModal';

import { 
  INITIAL_INCIDENTS, 
  AFFECTED_ZONES, 
  INITIAL_HOSPITALS, 
  INITIAL_SHELTERS, 
  INITIAL_FLEET, 
  INITIAL_TIMELINE,
  playAlertSiren
} from './data/mockData';

export default function App() {
  // Global Application State
  const [defcon, setDefcon] = useState(2);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [zones, setZones] = useState(AFFECTED_ZONES);
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS);
  const [shelters, setShelters] = useState(INITIAL_SHELTERS);
  const [fleet, setFleet] = useState(INITIAL_FLEET);
  const [timelineEvents, setTimelineEvents] = useState(INITIAL_TIMELINE);

  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedDroneSector, setSelectedDroneSector] = useState('Sector 4');
  const [autoSimulate, setAutoSimulate] = useState(true);

  // Dynamic Map Overlay for Satellite CV
  const [customMapOverlay, setCustomMapOverlay] = useState(null);

  // Base Modals state
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false);
  const [isEasOpen, setIsEasOpen] = useState(false);
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [dispatchTargetIncident, setDispatchTargetIncident] = useState(null);

  // AI Suite Modals state (All 10 Features)
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isFusionOpen, setIsFusionOpen] = useState(false);
  const [isSatelliteOpen, setIsSatelliteOpen] = useState(false);
  const [isPredictionOpen, setIsPredictionOpen] = useState(false);
  const [predictionTargetIncident, setPredictionTargetIncident] = useState(null);
  const [isXaiOpen, setIsXaiOpen] = useState(false);
  const [xaiTargetIncident, setXaiTargetIncident] = useState(null);
  const [isReallocationOpen, setIsReallocationOpen] = useState(false);
  const [isHospitalSurgeOpen, setIsHospitalSurgeOpen] = useState(false);
  const [isEvacuationOpen, setIsEvacuationOpen] = useState(false);
  const [isTargetedBroadcastOpen, setIsTargetedBroadcastOpen] = useState(false);
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = "info") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Real-time Event Auto-Simulation Loop (Every 20s)
  useEffect(() => {
    if (!autoSimulate) return;
    const interval = setInterval(() => {
      const simTypes = [
        {
          title: "Hydro-Sensor Warning Update",
          type: "warning",
          description: "Water telemetry sensor #04 in Lower Basin detected +0.2m tide rise.",
          sector: "Sector 2"
        },
        {
          title: "Tactical EMS Patrol Shift",
          type: "dispatch",
          description: "2 Ambulances re-routed to Standby status near Metro General Trauma Center.",
          sector: "Sector 1"
        },
        {
          title: "Weather Drone Wind Warning",
          type: "critical",
          description: "Gusts increased to 38 mph in North Ridge Hills. Fire containment perimeter adjusted.",
          sector: "Sector 4"
        }
      ];

      const chosen = simTypes[Math.floor(Math.random() * simTypes.length)];
      const newEvt = {
        id: `EVT-${Math.floor(200 + Math.random() * 800)}`,
        time: new Date().toISOString().substring(11, 19) + ' UTC',
        title: chosen.title,
        type: chosen.type,
        description: chosen.description,
        sector: chosen.sector
      };

      setTimelineEvents(prev => [newEvt, ...prev.slice(0, 19)]);
      if (soundEnabled && chosen.type === "critical") {
        playAlertSiren("high");
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [autoSimulate, soundEnabled]);

  // Handlers
  const handleCreateIncident = (newIncident) => {
    setIncidents(prev => [newIncident, ...prev]);
    setSelectedIncident(newIncident);
    
    const evt = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      time: newIncident.timestamp,
      title: `NEW EMERGENCY: ${newIncident.title}`,
      type: "critical",
      description: `Reported in ${newIncident.location}. Severity: ${newIncident.severity}. Initial units requested.`,
      sector: newIncident.location
    };
    setTimelineEvents(prev => [evt, ...prev]);
    if (soundEnabled) playAlertSiren("critical");
    showToast(`Emergency Logged: ${newIncident.title}`, "critical");
  };

  const handleResolveIncident = (incidentId) => {
    const inc = incidents.find(i => i.id === incidentId);
    setIncidents(prev => prev.filter(i => i.id !== incidentId));
    if (selectedIncident?.id === incidentId) setSelectedIncident(null);

    const evt = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      time: new Date().toISOString().substring(11, 19) + ' UTC',
      title: `INCIDENT RESOLVED: ${inc ? inc.title : incidentId}`,
      type: "info",
      description: "Scene cleared and contained by response teams.",
      sector: inc ? inc.location : "Sector All"
    };
    setTimelineEvents(prev => [evt, ...prev]);
    showToast(`Incident Resolved & Archived: ${incidentId}`, "success");
  };

  const handleOpenDispatchModal = (incident) => {
    setDispatchTargetIncident(incident);
    setIsDispatchOpen(true);
  };

  const handleConfirmDispatch = (incidentId, fleetType, hospitalName, shelterName) => {
    setFleet(prev => prev.map(f => {
      if (f.type === fleetType && f.ready > 0) {
        return { ...f, ready: f.ready - 1, deployed: f.deployed + 1 };
      }
      return f;
    }));

    setIncidents(prev => prev.map(i => {
      if (i.id === incidentId) {
        return {
          ...i,
          unitsAssigned: [...i.unitsAssigned, fleetType.split(" ")[0]]
        };
      }
      return i;
    }));

    const evt = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      time: new Date().toISOString().substring(11, 19) + ' UTC',
      title: `UNIT DISPATCHED: ${fleetType}`,
      type: "dispatch",
      description: `Dispatched to incident ${incidentId}. Medical Triage: ${hospitalName}. Shelter: ${shelterName}.`,
      sector: "Sector Command"
    };
    setTimelineEvents(prev => [evt, ...prev]);
    showToast(`Authorized & Dispatched ${fleetType} to ${incidentId}`, "success");
  };

  const handleUpdateHospitalICU = (hospitalId) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === hospitalId && h.icuOccupied < h.icuTotal) {
        return { ...h, icuOccupied: h.icuOccupied + 1 };
      }
      return h;
    }));
    showToast(`Admitted 1 Emergency Patient to ICU`, "info");
  };

  const handleUpdateShelterSupplies = (shelterId) => {
    setShelters(prev => prev.map(s => {
      if (s.id === shelterId) {
        return { ...s, suppliesPct: Math.min(100, s.suppliesPct + 15) };
      }
      return s;
    }));
    showToast(`Dispatched Supply Convoy to Shelter`, "success");
  };

  const handleDeployFleetUnit = (fleetType) => {
    setFleet(prev => prev.map(f => {
      if (f.type === fleetType && f.ready > 0) {
        return { ...f, ready: f.ready - 1, deployed: f.deployed + 1 };
      }
      return f;
    }));
    showToast(`Unit Deployed: ${fleetType}`, "info");
  };

  const handleTriggerEasBroadcast = (broadcastData) => {
    const evt = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      time: new Date().toISOString().substring(11, 19) + ' UTC',
      title: `PUBLIC EAS BROADCAST TRANSMITTED`,
      type: "critical",
      description: `ALERT: ${broadcastData.title} — ${broadcastData.message}`,
      sector: broadcastData.sector
    };
    setTimelineEvents(prev => [evt, ...prev]);
    showToast(`EAS Siren Broadcast Transmitted to ${broadcastData.sector}`, "critical");
  };

  const handleExportCSVReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "AEGIS OPS EMERGENCY DASHBOARD CRISIS REPORT\n";
    csvContent += `Generated: ${new Date().toUTCString()}\n`;
    csvContent += `DEFCON Level: DEFCON ${defcon}\n\n`;

    csvContent += "ACTIVE INCIDENTS\n";
    csvContent += "ID,Title,Type,Severity,Location,Affected_People,Status\n";
    incidents.forEach(i => {
      csvContent += `"${i.id}","${i.title}","${i.type}","${i.severity}","${i.location}",${i.affectedPeople},"${i.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AEGIS_Crisis_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Crisis CSV Report Downloaded Successfully", "success");
  };

  // Compute overall telemetry metrics
  const totalCritical = incidents.filter(i => i.severity === 'CRITICAL').length;
  const icuAvailableCount = hospitals.reduce((acc, h) => acc + (h.icuTotal - h.icuOccupied), 0);
  const shelterSpotsCount = shelters.reduce((acc, s) => acc + (s.capacity - s.occupied), 0);

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 flex flex-col font-sans relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed top-20 right-4 z-[3000] px-4 py-2.5 rounded-lg border font-mono text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md animate-bounce ${
          toastMessage.type === 'critical' 
            ? 'bg-red-950/90 border-red-500 text-red-200' 
            : toastMessage.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
            : 'bg-cyan-950/90 border-cyan-500 text-cyan-200'
        }`}>
          <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Header Bar with AI Intelligence Suite Toolbar */}
      <HeaderBar
        defcon={defcon}
        setDefcon={setDefcon}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenNewIncident={() => setIsNewIncidentOpen(true)}
        onOpenEAS={() => setIsTargetedBroadcastOpen(true)}
        onExportReport={handleExportCSVReport}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenFusion={() => setIsFusionOpen(true)}
        onOpenSatellite={() => setIsSatelliteOpen(true)}
        onOpenEvacuation={() => setIsEvacuationOpen(true)}
        onOpenWhatIf={() => setIsWhatIfOpen(true)}
      />

      {/* DEFCON 1 Extreme Threat Banner Overlay */}
      {defcon === 1 && (
        <div className="bg-red-600/90 text-white font-hud text-xs font-extrabold tracking-widest py-1 px-4 text-center border-b border-red-400 animate-pulse flex items-center justify-center gap-2">
          <span>⚠️ DEFCON 1 CRITICAL THREAT ACTIVE — ALL FIRST RESPONDERS & AIR UNITS ON MAXIMUM ALERT ⚠️</span>
        </div>
      )}

      {/* Main Command Center Grid Layout */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Interactive City Map & Incident Alert Feed (7 cols on lg) */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Interactive Tactical Map Component */}
          <div className="h-[540px] w-full">
            <InteractiveMap
              incidents={incidents}
              hospitals={hospitals}
              shelters={shelters}
              zones={zones}
              selectedIncident={selectedIncident}
              onSelectIncident={(inc) => setSelectedIncident(inc)}
              onDispatchUnit={handleOpenDispatchModal}
              onSelectDroneSector={(loc) => setSelectedDroneSector(loc)}
              customOverlay={customMapOverlay}
            />
          </div>

          {/* Incident Alert Feed */}
          <div className="flex-1">
            <AlertFeed
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={(inc) => setSelectedIncident(inc)}
              onDispatchUnit={handleOpenDispatchModal}
              onResolveIncident={handleResolveIncident}
              onOpenXAI={(inc) => {
                setXaiTargetIncident(inc);
                setIsXaiOpen(true);
              }}
              onOpenPrediction={(inc) => {
                setPredictionTargetIncident(inc);
                setIsPredictionOpen(true);
              }}
              onOpenReallocation={() => setIsReallocationOpen(true)}
            />
          </div>

        </section>

        {/* Right Column: Telemetry, Resources, Drone CCTV & Live Timeline (5 cols on lg) */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Resource & Facility Availability Tracker */}
          <div className="min-h-[340px]">
            <ResourceTracker
              hospitals={hospitals}
              shelters={shelters}
              fleet={fleet}
              onUpdateHospital={handleUpdateHospitalICU}
              onUpdateShelter={handleUpdateShelterSupplies}
              onDeployFleet={handleDeployFleetUnit}
              onOpenHospitalSurge={() => setIsHospitalSurgeOpen(true)}
            />
          </div>

          {/* Recon Drone Surveillance & CCTV Feed */}
          <div className="h-[280px]">
            <DroneFeedSimulator selectedSector={selectedDroneSector} />
          </div>

          {/* Real-time Telemetry Incident Timeline */}
          <div className="flex-1">
            <LiveTimeline
              timelineEvents={timelineEvents}
              autoSimulate={autoSimulate}
              setAutoSimulate={setAutoSimulate}
              incidentsCount={incidents.length}
              criticalCount={totalCritical}
              icuAvailable={icuAvailableCount}
              shelterSpots={shelterSpotsCount}
            />
          </div>

        </section>

      </main>

      {/* Footer System Status Bar */}
      <footer className="w-full bg-[#080c14] border-t border-slate-800 py-2 px-4 font-mono text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-hud font-bold">AEGIS AI DECISION SUPPORT SYS</span>
          <span>• MULTI-SOURCE FUSION: ACTIVE</span>
          <span>• PREDICTIVE MODEL: ONLINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span>SYSTEM LOAD: 16.4%</span>
          <span className="text-emerald-400 font-bold">● ALL 10 AI SUBSYSTEMS ONLINE</span>
        </div>
      </footer>

      {/* Base Modals */}
      <IncidentModal
        isOpen={isNewIncidentOpen}
        onClose={() => setIsNewIncidentOpen(false)}
        onSubmitIncident={handleCreateIncident}
      />

      <EASModal
        isOpen={isEasOpen}
        onClose={() => setIsEasOpen(false)}
        onTriggerBroadcast={handleTriggerEasBroadcast}
      />

      <DispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        incident={dispatchTargetIncident}
        fleet={fleet}
        hospitals={hospitals}
        shelters={shelters}
        onConfirmDispatch={handleConfirmDispatch}
      />

      {/* 10 AI Suite Modals */}
      <AICrisisCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onExecuteAction={(actionText) => {
          showToast(`Executed Action: ${actionText}`, "success");
        }}
      />

      <MultiSourceFusionModal
        isOpen={isFusionOpen}
        onClose={() => setIsFusionOpen(false)}
        onFuseIncident={(fusedData) => {
          showToast(`Fused ${fusedData.clusterName} with ${fusedData.confidencePct}% Confidence!`, "success");
        }}
      />

      <SatelliteDroneIntelModal
        isOpen={isSatelliteOpen}
        onClose={() => setIsSatelliteOpen(false)}
        onInjectMapOverlay={(scanData) => {
          setCustomMapOverlay(scanData);
          showToast(`Injected Satellite CV Overlays onto Crisis Map!`, "success");
        }}
      />

      <CrisisPredictionModal
        isOpen={isPredictionOpen}
        onClose={() => setIsPredictionOpen(false)}
        incident={predictionTargetIncident || incidents[0]}
        onExecutePreventative={(stepData) => {
          showToast(`Executed Preventative Directives for ${stepData.time}!`, "success");
        }}
      />

      <ExplainableAIModal
        isOpen={isXaiOpen}
        onClose={() => setIsXaiOpen(false)}
        incident={xaiTargetIncident || incidents[0]}
      />

      <DynamicReallocationModal
        isOpen={isReallocationOpen}
        onClose={() => setIsReallocationOpen(false)}
        onConfirmReallocation={() => {
          showToast(`Re-allocated Ambulance A1 to Hospital Flood Zone!`, "success");
        }}
      />

      <HospitalSurgeModal
        isOpen={isHospitalSurgeOpen}
        onClose={() => setIsHospitalSurgeOpen(false)}
        hospitals={hospitals}
        onRedirectPatients={() => {
          showToast(`Redirected 12 patients to Narayana Health Complex!`, "success");
        }}
      />

      <AIEvacuationPlannerModal
        isOpen={isEvacuationOpen}
        onClose={() => setIsEvacuationOpen(false)}
        onExecutePlan={(planData) => {
          showToast(`AI Evacuation Plan Transmitted for ${planData.zone}!`, "success");
        }}
      />

      <TargetedBroadcastModal
        isOpen={isTargetedBroadcastOpen}
        onClose={() => setIsTargetedBroadcastOpen(false)}
        onSendBroadcast={(broadcastInfo) => {
          handleTriggerEasBroadcast(broadcastInfo);
        }}
      />

      <WhatIfSimulatorModal
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        onApplyPrePositioning={(simResult) => {
          showToast(`Pre-positioned rescue assets based on simulation!`, "success");
        }}
      />

    </div>
  );
}
