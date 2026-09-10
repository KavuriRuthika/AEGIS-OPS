import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Bot, 
  Layers, 
  Scan, 
  Compass, 
  Sliders, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  Megaphone, 
  Download, 
  Activity,
  Clock,
  Sparkles
} from 'lucide-react';
import { playAlertSiren, startContinuousSiren, stopContinuousSiren } from '../data/mockData';

export default function HeaderBar({ 
  defcon, 
  setDefcon, 
  soundEnabled, 
  setSoundEnabled, 
  onOpenNewIncident, 
  onOpenEAS, 
  onExportReport,
  onOpenCopilot,
  onOpenFusion,
  onOpenSatellite,
  onOpenEvacuation,
  onOpenWhatIf
}) {
  const [time, setTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getDefconColor = (level) => {
    switch (level) {
      case 1: return "bg-red-600 text-white border-red-400 animate-pulse";
      case 2: return "bg-orange-600 text-white border-orange-400";
      case 3: return "bg-amber-500 text-black border-amber-300";
      case 4: return "bg-blue-600 text-white border-blue-400";
      default: return "bg-emerald-600 text-white border-emerald-400";
    }
  };

  const handleSirenToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState) {
      startContinuousSiren();
    } else {
      stopContinuousSiren();
    }
  };

  return (
    <header className="w-full bg-[#0b0f19]/95 border-b border-cyan-500/30 backdrop-blur-md px-4 py-2.5 sticky top-0 z-50 flex flex-col gap-2">
      
      {/* Top Main Navigation Row */}
      <div className="max-w-[1920px] w-full mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Tactical Badge */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <ShieldAlert className="w-6 h-6 animate-pulse-fast" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-hud text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400">
                AEGIS OPS
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                v5.2 PAN-DISASTER COMMAND
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              ALL NATURAL DISASTERS REAL-TIME MONITORING
            </p>
          </div>
        </div>

        {/* DEFCON Threat Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
          <span className="text-xs font-hud text-slate-400 px-2 font-bold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" /> THREAT:
          </span>
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => {
                setDefcon(level);
                if (soundEnabled && level <= 2) {
                  startContinuousSiren();
                }
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all border ${
                defcon === level 
                  ? getDefconColor(level)
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
              }`}
              title={`Switch to DEFCON ${level}`}
            >
              DEFCON {level}
            </button>
          ))}
        </div>

        {/* Live Timestamp & Controls */}
        <div className="flex items-center gap-2">
          {/* UTC Clock */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/90 border border-slate-800 font-mono text-xs text-cyan-400">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>{time}</span>
          </div>

          {/* Audio Continuous Siren Toggle Button */}
          <button
            onClick={handleSirenToggle}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-mono font-bold ${
              soundEnabled
                ? "bg-red-950/80 border-red-500 text-red-400 hover:bg-red-900 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse"
                : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
            }`}
            title="Toggle Continuous Emergency Audio Siren"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400 animate-spin" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? "🔊 SIREN ACTIVE (ON)" : "SIREN OFF"}</span>
          </button>

          {/* New Incident Trigger */}
          <button
            onClick={onOpenNewIncident}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold tracking-wider flex items-center gap-1.5 border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">REPORT EMERGENCY</span>
          </button>

          {/* EAS Broadcast Trigger */}
          <button
            onClick={onOpenEAS}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-hud text-xs font-bold tracking-wider flex items-center gap-1.5 border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
          >
            <Megaphone className="w-4 h-4" />
            <span className="hidden sm:inline">EAS BROADCAST</span>
          </button>

          {/* Export Report */}
          <button
            onClick={onExportReport}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            title="Export CSV Log"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* AI INTELLIGENCE SUITE CONTROL BAR */}
      <div className="max-w-[1920px] w-full mx-auto flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-hud font-bold text-cyan-400 flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> AI SUITE:
          </span>

          {/* Copilot */}
          <button
            onClick={onOpenCopilot}
            className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-hud font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.15)] shrink-0"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI COPILOT</span>
          </button>

          {/* Multi-Source Fusion */}
          <button
            onClick={onOpenFusion}
            className="px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 text-xs font-hud font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(168,85,247,0.15)] shrink-0"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>AI FUSION MATRIX</span>
          </button>

          {/* Satellite Drone Intel */}
          <button
            onClick={onOpenSatellite}
            className="px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-hud font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(59,130,246,0.15)] shrink-0"
          >
            <Scan className="w-3.5 h-3.5 text-blue-400" />
            <span>SATELLITE / DRONE CV</span>
          </button>

          {/* AI Evacuation Planner */}
          <button
            onClick={onOpenEvacuation}
            className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-hud font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)] shrink-0"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>EVACUATION PLANNER</span>
          </button>

          {/* What-If Simulator */}
          <button
            onClick={onOpenWhatIf}
            className="px-2.5 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-500/40 text-xs font-hud font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(245,158,11,0.15)] shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>WHAT-IF SIMULATOR</span>
          </button>
        </div>
      </div>

    </header>
  );
}
