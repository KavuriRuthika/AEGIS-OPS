import React, { useState } from 'react';
import { 
  Hospital, 
  Home, 
  Truck, 
  Activity, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Plus,
  Send,
  ShieldCheck,
  Helicopter,
  TrendingUp
} from 'lucide-react';

export default function ResourceTracker({ 
  hospitals, 
  shelters, 
  fleet, 
  onUpdateHospital, 
  onUpdateShelter, 
  onDeployFleet,
  onOpenHospitalSurge
}) {
  const [activeTab, setActiveTab] = useState('hospitals');

  const getOccupancyColor = (pct) => {
    if (pct >= 90) return 'bg-red-500 text-red-400 border-red-500';
    if (pct >= 75) return 'bg-amber-500 text-amber-400 border-amber-500';
    return 'bg-emerald-500 text-emerald-400 border-emerald-500';
  };

  return (
    <div className="hud-panel p-4 flex flex-col h-full">
      <div className="tactical-corner-bl"></div>
      <div className="tactical-corner-br"></div>

      {/* Resource Header & Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h2 className="font-hud text-lg font-bold text-slate-100 tracking-wider">
            RESOURCE & FACILITY TELEMETRY
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`px-3 py-1 rounded text-xs font-hud font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'hospitals'
                ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Hospital className="w-3.5 h-3.5" />
            HOSPITALS ({hospitals.length})
          </button>

          <button
            onClick={() => setActiveTab('shelters')}
            className={`px-3 py-1 rounded text-xs font-hud font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'shelters'
                ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            SHELTERS ({shelters.length})
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-3 py-1 rounded text-xs font-hud font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'fleet'
                ? 'bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            FLEET UNITS
          </button>
        </div>
      </div>

      {/* Tab 1: HOSPITALS */}
      {activeTab === 'hospitals' && (
        <div className="space-y-3">
          
          {/* AI Hospital Surge Banner */}
          <div className="p-2.5 rounded bg-red-950/60 border border-red-500/40 flex items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-slate-200 font-bold">AI SURGE PREDICTOR:</span>
              <span className="text-red-300">42 victims expected in 30m</span>
            </div>
            <button
              onClick={onOpenHospitalSurge}
              className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-hud font-bold text-[11px] border border-red-400 transition-colors"
            >
              PREDICT & BALANCER
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hospitals.map((hospital) => {
              const icuPct = Math.round((hospital.icuOccupied / hospital.icuTotal) * 100);
              const erPct = Math.round((hospital.erOccupied / hospital.erTotal) * 100);

              return (
                <div 
                  key={hospital.id} 
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-hud font-bold text-sm text-cyan-300 flex items-center gap-1.5">
                        <Hospital className="w-4 h-4 text-cyan-400" />
                        {hospital.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">{hospital.traumaTier}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-hud font-bold border ${
                      icuPct >= 90 ? 'bg-red-950 text-red-400 border-red-500/50' : 'bg-cyan-950 text-cyan-400 border-cyan-500/50'
                    }`}>
                      {hospital.status}
                    </span>
                  </div>

                  {/* ICU Meter */}
                  <div className="space-y-2 font-mono text-xs mt-3">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">ICU Bed Occupancy</span>
                        <span className="font-bold text-slate-200">{hospital.icuOccupied} / {hospital.icuTotal} ({icuPct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            icuPct >= 90 ? 'bg-red-500' : icuPct >= 75 ? 'bg-amber-500' : 'bg-cyan-500'
                          }`} 
                          style={{ width: `${icuPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* ER Meter */}
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">ER Capacity</span>
                        <span className="font-bold text-slate-200">{hospital.erOccupied} / {hospital.erTotal} ({erPct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-500" 
                          style={{ width: `${erPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Foot telemetry & admit button */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-emerald-400" />
                      Ambulances: <strong className="text-white">{hospital.ambulancesAvailable} Ready</strong>
                    </span>
                    <button
                      onClick={() => onUpdateHospital(hospital.id)}
                      className="px-2 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 font-hud font-bold border border-cyan-500/40"
                    >
                      + ADMIT PATIENT
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: SHELTERS */}
      {activeTab === 'shelters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {shelters.map((shelter) => {
            const occPct = Math.round((shelter.occupied / shelter.capacity) * 100);

            return (
              <div 
                key={shelter.id}
                className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-hud font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-emerald-400" />
                      {shelter.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">Med Bay: {shelter.medicalBay}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-hud font-bold border ${
                    occPct >= 90 ? 'bg-red-950 text-red-400 border-red-500/50' : 'bg-emerald-950 text-emerald-400 border-emerald-500/50'
                  }`}>
                    {shelter.status}
                  </span>
                </div>

                {/* Occupancy Meter */}
                <div className="space-y-2 font-mono text-xs mt-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Shelter Occupancy</span>
                      <span className="font-bold text-slate-200">{shelter.occupied} / {shelter.capacity} ({occPct}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          occPct >= 90 ? 'bg-red-500' : occPct >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} 
                        style={{ width: `${occPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Supplies Meter */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Ration & Water Inventory</span>
                      <span className="font-bold text-slate-200">{shelter.suppliesPct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          shelter.suppliesPct < 50 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'
                        }`} 
                        style={{ width: `${shelter.suppliesPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Foot actions */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    Power: <strong className="text-white">{shelter.powerStatus}</strong>
                  </span>
                  <button
                    onClick={() => onUpdateShelter(shelter.id)}
                    className="px-2 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-hud font-bold border border-emerald-500/40 flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" /> DISPATCH SUPPLIES
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: FLEET UNITS */}
      {activeTab === 'fleet' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fleet.map((unit, index) => {
            const deployedPct = Math.round((unit.deployed / unit.total) * 100);

            return (
              <div 
                key={index}
                className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xl">{unit.icon}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-400 font-mono text-[10px] font-bold">
                      {unit.ready} READY
                    </span>
                  </div>

                  <h3 className="font-hud font-bold text-sm text-slate-200">
                    {unit.type}
                  </h3>

                  <div className="mt-3 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Deployment Ratio</span>
                      <span className="text-slate-200 font-bold">{unit.deployed} / {unit.total}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-500" 
                        style={{ width: `${deployedPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeployFleet(unit.type)}
                  disabled={unit.ready === 0}
                  className={`mt-3 w-full py-1.5 px-2 rounded font-hud text-xs font-bold transition-all border ${
                    unit.ready > 0
                      ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                  }`}
                >
                  {unit.ready > 0 ? `DEPLOY UNIT (${unit.ready} AVAILABLE)` : 'FLEET FULLY DEPLOYED'}
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
