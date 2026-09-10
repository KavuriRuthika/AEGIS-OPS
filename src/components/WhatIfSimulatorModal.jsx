import React, { useState } from 'react';
import { Sliders, Play, TrendingUp, AlertTriangle, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { simulateWhatIf } from '../data/aiEngine';

export default function WhatIfSimulatorModal({ isOpen, onClose, onApplyPrePositioning }) {
  const [rainfallPct, setRainfallPct] = useState(20);
  const [riverLevel, setRiverLevel] = useState(1.2);
  const [windSpeed, setWindSpeed] = useState(15);
  const [simData, setSimData] = useState(simulateWhatIf(20, 1.2));

  if (!isOpen) return null;

  const handleSimulate = () => {
    const res = simulateWhatIf(rainfallPct, riverLevel);
    setSimData(res);
  };

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-3xl bg-[#090d16] border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 p-4 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Sliders className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  CRISIS "WHAT-IF" SCENARIO SIMULATOR
                </h2>
                <span className="badge bg-cyan-950 text-cyan-300 border-cyan-500/40 text-[10px]">
                  PREDICTIVE ENVIRONMENTAL SIMULATION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Adjust environmental parameters to simulate crisis escalation & resource bottlenecks
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          
          {/* Sliders Control Panel */}
          <div className="hud-panel p-4 bg-slate-950/90 rounded-lg border-cyan-500/30 space-y-4 font-mono text-xs">
            <h3 className="font-hud font-bold text-cyan-300 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              SIMULATION PARAMETERS:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-400 block font-bold mb-1">
                  RAINFALL INCREASE: <span className="text-amber-400">+{rainfallPct}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={rainfallPct} 
                  onChange={(e) => setRainfallPct(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">
                  RIVER TIDE RISE: <span className="text-cyan-400">+{riverLevel}m</span>
                </label>
                <input 
                  type="range" 
                  min="0.0" 
                  max="5.0" 
                  step="0.1"
                  value={riverLevel} 
                  onChange={(e) => setRiverLevel(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">
                  WIND SPEED GUSTS: <span className="text-purple-400">+{windSpeed} mph</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="60" 
                  value={windSpeed} 
                  onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleSimulate}
              className="w-full py-2 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-hud font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all"
            >
              <Play className="w-4 h-4 text-cyan-400" />
              <span>RUN REAL-TIME SIMULATION</span>
            </button>
          </div>

          {/* Delta Comparison Matrix */}
          <div className="hud-panel p-4 bg-slate-950/90 rounded-lg border-slate-800 space-y-3 font-mono text-xs">
            <h3 className="font-hud font-bold text-slate-300 text-xs uppercase tracking-wider">
              IMPACT COMPARISON (CURRENT vs SIMULATED AFTER +{rainfallPct}% RAINFALL):
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block font-bold">AFFECTED POPULATION</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-400">{simData.current.pop}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="text-red-400 font-extrabold text-sm">{simData.after.pop} ↑</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block font-bold">BLOCKED ROADS</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-400">{simData.current.blockedRoads}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="text-amber-400 font-extrabold text-sm">{simData.after.blockedRoads} ↑</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block font-bold">REQUIRED EMS</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-400">{simData.current.ambulances}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="text-cyan-400 font-extrabold text-sm">{simData.after.ambulances} ↑</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block font-bold">SHELTER DEMAND</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-400">{simData.current.shelterDemand}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="text-purple-400 font-extrabold text-sm">{simData.after.shelterDemand} ↑</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Pre-Positioning Directive */}
          <div className="p-3.5 rounded bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-3 font-mono text-xs">
            <div className="space-y-1 text-cyan-200">
              <strong className="font-hud font-bold text-cyan-300 block">PROACTIVE AI RECOMMENDATION:</strong>
              <p>{simData.recommendation}</p>
            </div>
            <button
              onClick={() => {
                onApplyPrePositioning && onApplyPrePositioning(simData);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-hud font-bold text-xs border border-cyan-400 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all"
            >
              PRE-POSITION ASSETS
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
