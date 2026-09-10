import React, { useState } from 'react';
import { Compass, Navigation, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { generateEvacuationData } from '../data/aiEngine';

export default function AIEvacuationPlannerModal({ isOpen, onClose, onExecutePlan }) {
  const [data, setData] = useState(generateEvacuationData());
  const [executed, setExecuted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-4xl bg-[#090d16] border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 p-4 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  AI STRATEGIC EVACUATION PLANNER
                </h2>
                <span className="badge bg-cyan-950 text-cyan-300 border-cyan-500/40 text-[10px]">
                  AUTOMATED CORRIDOR OPTIMIZATION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Target Zone: {data.zone} (Total Population: {data.populationTotal.toLocaleString()})
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
          
          {/* Evacuation Priority Summary */}
          <div className="hud-panel hud-panel-critical p-3.5 bg-slate-950/90 rounded-lg border-red-500/40 grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-bold">TOTAL POPULATION:</span>
              <span className="text-cyan-400 font-extrabold text-sm">{data.populationTotal.toLocaleString()} Residents</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-bold">EVACUATE FIRST (HIGH RISK):</span>
              <span className="text-red-400 font-extrabold text-sm">{data.evacuateFirst.toLocaleString()} High-Risk</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-bold">RESCUE ASSETS NEEDED:</span>
              <span className="text-amber-400 font-extrabold text-sm">{data.requirements.rescueTeams} Boats • {data.requirements.ambulances} EMS</span>
            </div>
          </div>

          {/* Shelters Allocation & Route Safety Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Shelters Matching */}
            <div className="hud-panel p-3.5 bg-slate-950/90 rounded-lg border-slate-800 space-y-2">
              <h3 className="font-hud text-xs font-bold text-cyan-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                SHELTER CAPACITY ASSIGNMENTS:
              </h3>
              {data.shelterAssignments.map((sh, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-slate-200 font-bold block">{sh.name}</span>
                    <span className="text-cyan-400 text-[11px]">Allocated: {sh.allocated} residents</span>
                  </div>
                  <span className="badge badge-success text-[10px]">{sh.status}</span>
                </div>
              ))}
            </div>

            {/* Recommended Evacuation Routes */}
            <div className="hud-panel p-3.5 bg-slate-950/90 rounded-lg border-slate-800 space-y-2">
              <h3 className="font-hud text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                REAL-TIME ROUTE SAFETY MATRIX:
              </h3>
              {data.routes.map((rt, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span>{rt.icon}</span>
                    <div>
                      <span className="text-slate-200 font-bold block">{rt.name}</span>
                      <span className="text-slate-400 text-[11px]">{rt.note}</span>
                    </div>
                  </div>
                  <span className={`badge ${rt.status === 'SAFE' ? 'badge-success' : rt.status === 'FLOODED' ? 'badge-critical' : 'badge-warning'}`}>
                    {rt.status}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Action Trigger */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setExecuted(true);
                onExecutePlan && onExecutePlan(data);
                setTimeout(() => onClose(), 800);
              }}
              className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-hud font-bold text-xs flex items-center gap-2 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>{executed ? "EVACUATION PLAN TRANSMITTED!" : "EXECUTE AI EVACUATION PLAN"}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
